"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-secondary" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-2 border-secondary">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-primary">Housing Navigator: {user.displayName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">Client Referrals</h3>
              <Link href="/navigator-portal/new-referral" className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded hover:bg-secondary-light transition-colors">
                + New Housing Request
              </Link>
            </div>
            
            {referrals.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-sm text-gray-500">You haven't submitted any housing requests for your clients yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrals.map((ref) => (
                      <tr key={ref.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ref.clientFirstName} {ref.clientLastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(ref.submittedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
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

          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-primary">
            <h3 className="text-xl font-bold text-primary mb-4">Navigator Details</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex flex-col border-b pb-2">
                <span className="font-medium text-gray-800 text-sm">Account Status</span>
                <span className="mt-1 bg-green-100 text-green-800 w-fit px-2 py-0.5 rounded text-xs font-semibold">Active Provider</span>
              </li>
              <li className="flex flex-col border-b pb-2">
                <span className="font-medium text-gray-800 text-sm">Joined</span>
                <span className="mt-1 text-sm">{new Date(user.metadata.creationTime).toLocaleDateString()}</span>
              </li>
              <li className="flex flex-col pt-2">
                <span className="font-medium text-gray-800 text-sm">Need Help?</span>
                <span className="mt-1 text-sm">Contact our facility managers for urgent placement requests.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
