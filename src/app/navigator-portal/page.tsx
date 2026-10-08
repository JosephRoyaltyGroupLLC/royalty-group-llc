"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Map, Users, Clock, CheckCircle2, UserCircle2, LogOut, ShieldAlert, FilePlus } from "lucide-react";

export default function NavigatorPortal() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch referrals
        try {
          const q = query(collection(db, "navigator_referrals"), where("navigatorId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);
          const referralData: any[] = [];
          querySnapshot.forEach((doc) => {
            referralData.push({ id: doc.id, ...doc.data() });
          });
          setReferrals(referralData);
        } catch (error) {
          console.error("Error fetching referrals", error);
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

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center border-t-4 border-primary">
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-secondary shadow" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-secondary shadow">
                <Map size={32} />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-extrabold text-primary uppercase tracking-wider mb-1">Housing Navigator</h2>
              <p className="text-gray-600 font-light">{user.displayName} &bull; <span className="font-bold">{user.email}</span></p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-6 md:mt-0 px-6 py-3 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors uppercase tracking-wider flex items-center gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-4 gap-4">
              <h3 className="text-2xl font-extrabold text-primary uppercase tracking-wider flex items-center gap-3">
                <Users className="text-secondary w-6 h-6" /> Client Referrals
              </h3>
              <Link href="/navigator-portal/new-referral" className="px-6 py-3 bg-secondary text-primary text-sm font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light transition-colors flex items-center gap-2">
                <FilePlus size={16} />
                New Request
              </Link>
            </div>
            
            {referrals.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex-grow flex flex-col items-center justify-center">
                <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm text-gray-500 font-light mb-6">You haven't submitted any housing requests for your clients yet.</p>
                <Link href="/navigator-portal/new-referral" className="text-secondary font-bold hover:text-primary transition-colors uppercase tracking-wider text-sm">
                  Start First Referral
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200 flex-grow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {referrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{ref.clientFirstName} {ref.clientLastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{new Date(ref.submittedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs font-bold uppercase tracking-wider rounded shadow-sm ${
                            ref.status === "Approved" ? "bg-green-100 text-green-800" :
                            ref.status === "Denied" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {ref.status || "Pending Review"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary h-fit">
            <h3 className="text-2xl font-extrabold text-primary mb-6 uppercase tracking-wider border-b border-gray-100 pb-4 flex items-center gap-3">
              <UserCircle2 className="text-secondary w-6 h-6" /> Details
            </h3>
            <ul className="space-y-6 text-gray-600">
              <li className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Status</span>
                <span className="bg-green-100 border border-green-200 text-green-800 w-fit px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <CheckCircle2 size={12} /> Active Provider
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Joined</span>
                <span className="font-bold text-primary flex items-center gap-2">
                  <Clock size={16} className="text-secondary" /> {new Date(user.metadata.creationTime).toLocaleDateString()}
                </span>
              </li>
              <li className="flex flex-col pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldAlert size={14} className="text-red-500" /> Need Help?
                </span>
                <span className="text-sm font-light leading-relaxed">Contact our facility managers for urgent placement requests.</span>
                <a href="mailto:info@royaltygroupllc.net" className="mt-3 text-sm font-bold text-secondary uppercase tracking-wider hover:text-primary transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
