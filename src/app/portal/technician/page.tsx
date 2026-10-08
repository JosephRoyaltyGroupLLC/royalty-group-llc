"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, FileText, CheckCircle, Clock, XCircle, LogOut, PenTool, LayoutDashboard, Wrench } from "lucide-react";

export default function TechnicianDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchQuotes(currentUser.uid);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchQuotes = async (userId: string) => {
    setLoadingData(true);
    try {
      const q = query(
        collection(db, "quotes"),
        where("technicianId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const fetchedQuotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(fetchedQuotes);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoadingData(false);
    }
  };

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
              <div className="w-16 h-16 rounded-full bg-primary text-secondary flex items-center justify-center text-3xl font-extrabold border-2 border-secondary shadow">
                <Wrench size={30} />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-extrabold text-primary uppercase tracking-wider mb-1">Technician Portal</h2>
              <p className="text-gray-600 font-light">{user.displayName || user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/portal/technician/quotes/new" className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-secondary hover:shadow-xl transition-all flex items-center group cursor-pointer">
            <div className="bg-secondary/10 p-5 rounded-full mr-5 group-hover:bg-secondary group-hover:text-primary transition-colors text-secondary">
              <PlusCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-primary text-lg uppercase tracking-wider">New Quote</h3>
              <p className="text-sm text-gray-500 font-light">Submit a new estimate</p>
            </div>
          </Link>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 flex items-center">
            <div className="bg-green-50 p-5 rounded-full mr-5">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-primary text-lg uppercase tracking-wider">Approved</h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{quotes.filter(q => q.status === 'approved').length} quotes</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 flex items-center">
            <div className="bg-yellow-50 p-5 rounded-full mr-5">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-primary text-lg uppercase tracking-wider">Pending</h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{quotes.filter(q => q.status === 'pending').length} quotes</p>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-extrabold text-primary flex items-center gap-3 uppercase tracking-wider">
              <FileText className="w-6 h-6 text-secondary" />
              My Quotes
            </h3>
          </div>
          
          {loadingData ? (
             <div className="flex justify-center py-16">
               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-secondary"></div>
             </div>
          ) : quotes.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4">Date</th>
                    <th className="p-4">Property Address</th>
                    <th className="p-4">Total Items</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quotes.map((quote) => {
                    const totalItems = quote.lineItems?.length || 0;
                    const totalPrice = quote.lineItems?.reduce((sum: number, item: any) => sum + (Number(item.technicianPrice) || 0), 0) || 0;
                    
                    return (
                      <tr key={quote.id} className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 text-sm text-gray-600 font-medium">
                          {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleDateString() : new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-gray-900">{quote.address}</p>
                        </td>
                        <td className="p-4 text-gray-600 font-light">
                          {totalItems} items
                        </td>
                        <td className="p-4 font-bold text-primary">
                          ${totalPrice.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${
                            quote.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            quote.status === "approved" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {quote.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {quote.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {quote.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                            {quote.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <PenTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6 font-light">You haven't submitted any quotes yet.</p>
              <Link 
                href="/portal/technician/quotes/new" 
                className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Your First Quote
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
