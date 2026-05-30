"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function PartnerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [partnerData, setPartnerData] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch partner profile
        const docRef = doc(db, "partners", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const pData = docSnap.data();
          setPartnerData(pData);
          setUser(currentUser);

          // If subscription is active, fetch their properties and referrals
          if (pData.subscriptionStatus === "active" || pData.subscriptionStatus === "trialing") {
            // Fetch properties
            const propsQuery = query(collection(db, "partner_properties"), where("partnerId", "==", currentUser.uid));
            const propsSnap = await getDocs(propsQuery);
            const propsData: any[] = [];
            propsSnap.forEach(d => propsData.push({ id: d.id, ...d.data() }));
            setProperties(propsData);

            // Fetch referrals
            const refsQuery = query(collection(db, "partner_referrals"), where("partnerId", "==", currentUser.uid));
            const refsSnap = await getDocs(refsQuery);
            const refsData: any[] = [];
            refsSnap.forEach(d => refsData.push({ id: d.id, ...d.data() }));
            refsData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setReferrals(refsData);
          }
        } else {
          // Not a partner, sign out
          await signOut(auth);
          router.push("/partner/register");
          return;
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleSubscribe = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          returnUrl: `${window.location.origin}/partner`
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout");
      }
    } catch (error) {
      console.error(error);
      alert("Error starting checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !partnerData) return null;

  const isActive = partnerData.subscriptionStatus === "active" || partnerData.subscriptionStatus === "trialing";

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center border-t-4 border-primary">
          <div>
            <h2 className="text-3xl font-bold text-primary">Partner Dashboard</h2>
            <p className="text-gray-600">Welcome back, {partnerData.firstName} {partnerData.lastName}</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Subscription Notice */}
        {!isActive && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-red-700">Subscription Inactive</h3>
              <p className="text-red-600 mt-1">Your properties are currently hidden from the public. Please subscribe to list your properties and receive leads.</p>
            </div>
            <button onClick={handleSubscribe} className="mt-4 md:mt-0 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow">
              Start $9.99/mo Subscription
            </button>
          </div>
        )}

        {isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Properties Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h3 className="text-xl font-bold text-primary">My Properties</h3>
                <Link href="/partner/properties/new" className="px-4 py-2 bg-secondary text-white text-sm font-bold rounded hover:bg-opacity-90">
                  + Add Property
                </Link>
              </div>
              
              {properties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't listed any properties yet.</p>
                  <Link href="/partner/properties/new" className="text-secondary font-bold hover:underline">List your first property</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map(prop => (
                    <div key={prop.id} className="flex gap-4 border border-gray-200 p-4 rounded hover:shadow-sm transition-shadow">
                      <div className="w-24 h-24 bg-gray-200 rounded shrink-0 overflow-hidden">
                        {prop.image && <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{prop.name}</h4>
                        <p className="text-sm text-gray-600">{prop.location}</p>
                        <p className="text-sm font-semibold text-secondary mt-1">{prop.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Referrals/Leads Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Property Inquiries & Leads</h3>
              
              {referrals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No inquiries yet. Keep your listings updated to attract more residents!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {referrals.map(ref => (
                    <div key={ref.id} className="border border-gray-200 rounded p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{ref.firstName} {ref.lastName}</h4>
                        <span className="text-xs text-gray-500">{ref.createdAt?.seconds ? new Date(ref.createdAt.seconds * 1000).toLocaleDateString() : "New"}</span>
                      </div>
                      <p className="text-sm text-gray-700"><strong>Property:</strong> {ref.propertyName}</p>
                      <p className="text-sm text-gray-700"><strong>Email:</strong> {ref.email}</p>
                      <p className="text-sm text-gray-700"><strong>Phone:</strong> {ref.phone}</p>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">"{ref.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
