"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Building, MapPin, Handshake, LogOut, Settings, CreditCard, ChevronRight, MessageSquare, AlertTriangle } from "lucide-react";

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

  const handleManageBilling = async () => {
    if (!partnerData?.stripeCustomerId) {
      alert("No active billing profile found.");
      return;
    }
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: partnerData.stripeCustomerId,
          returnUrl: `${window.location.origin}/partner`
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to open billing portal");
      }
    } catch (error) {
      console.error(error);
      alert("Error opening billing portal");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
      </div>
    );
  }

  if (!user || !partnerData) return null;

  const isActive = partnerData.subscriptionStatus === "active" || partnerData.subscriptionStatus === "trialing";

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center border-t-4 border-primary">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-secondary shadow">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-primary uppercase tracking-wider mb-1">Partner Dashboard</h2>
              <p className="text-gray-600 font-light">Welcome back, <span className="font-bold text-gray-900">{partnerData.firstName} {partnerData.lastName}</span></p>
            </div>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            {isActive && partnerData.stripeCustomerId && (
              <button 
                onClick={handleManageBilling}
                className="px-6 py-3 border-2 border-secondary text-secondary font-bold uppercase tracking-wider rounded text-sm hover:bg-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <CreditCard size={16} />
                Manage Billing
              </button>
            )}
            <button 
              onClick={handleSignOut}
              className="px-6 py-3 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Subscription Notice */}
        {!isActive && (
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-red-500 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-extrabold text-red-800 uppercase tracking-wider mb-1">Subscription Inactive</h3>
                <p className="text-red-700 font-light">Your properties are currently hidden from the public. Please subscribe to list your properties and receive leads.</p>
              </div>
            </div>
            <button onClick={handleSubscribe} className="w-full md:w-auto px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-md">
              Start $9.99/mo Subscription
            </button>
          </div>
        )}

        {isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Properties Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-extrabold text-primary uppercase tracking-wider flex items-center gap-3">
                  <Building className="text-secondary w-6 h-6" /> My Properties
                </h3>
                <Link href="/partner/properties/new" className="px-5 py-2 bg-secondary text-primary text-xs font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light transition-colors">
                  + Add Property
                </Link>
              </div>
              
              {properties.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex-grow flex flex-col items-center justify-center">
                  <Building className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4 font-light">You haven't listed any properties yet.</p>
                  <Link href="/partner/properties/new" className="text-secondary font-bold hover:text-primary transition-colors uppercase tracking-wider text-sm flex items-center gap-1">
                    List your first property <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {properties.map(prop => (
                    <div key={prop.id} className="flex gap-5 border border-gray-100 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all group">
                      <div className="w-24 h-24 bg-gray-200 rounded shrink-0 overflow-hidden shadow-inner border border-gray-200">
                        {prop.image && <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-extrabold text-lg text-primary">{prop.name}</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mt-1"><MapPin size={12} className="text-secondary" /> {prop.location}</p>
                        <p className="text-sm font-extrabold text-secondary mt-2">{prop.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Referrals/Leads Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary flex flex-col">
              <h3 className="text-2xl font-extrabold text-primary mb-6 border-b border-gray-100 pb-4 flex items-center gap-3 uppercase tracking-wider">
                <MessageSquare className="text-secondary w-6 h-6" /> Property Inquiries
              </h3>
              
              {referrals.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex-grow flex flex-col items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-light">No inquiries yet. Keep your listings updated to attract more residents!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {referrals.map(ref => (
                    <div key={ref.id} className="border border-gray-100 rounded-lg p-6 bg-gray-50 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-extrabold text-primary text-lg">{ref.firstName} {ref.lastName}</h4>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                          {ref.createdAt?.seconds ? new Date(ref.createdAt.seconds * 1000).toLocaleDateString() : "New"}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-700 font-medium"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-20 inline-block">Property</span> {ref.propertyName}</p>
                        <p className="text-sm text-gray-700 font-medium"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-20 inline-block">Email</span> {ref.email}</p>
                        <p className="text-sm text-gray-700 font-medium"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-20 inline-block">Phone</span> {ref.phone}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 font-light italic leading-relaxed">"{ref.message}"</p>
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
