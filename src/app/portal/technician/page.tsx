"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, FileText, CheckCircle, Clock, XCircle, LogOut } from "lucide-react";

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
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center border-b-4 border-secondary">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-secondary" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-2 border-secondary">
                {user.displayName?.charAt(0) || "T"}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-primary">Technician Portal</h2>
              <p className="text-gray-600">{user.displayName || user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/portal/technician/quotes/new" className="bg-white p-6 rounded-xl shadow-md border-t-4 border-secondary hover:shadow-lg transition-all flex items-center group">
            <div className="bg-blue-50 p-4 rounded-full mr-4 group-hover:bg-blue-100 transition-colors">
              <PlusCircle className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">New Quote</h3>
              <p className="text-sm text-gray-500">Submit a new estimate</p>
            </div>
          </Link>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 flex items-center">
            <div className="bg-green-50 p-4 rounded-full mr-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Approved</h3>
              <p className="text-sm text-gray-500">{quotes.filter(q => q.status === 'approved').length} quotes</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 flex items-center">
            <div className="bg-yellow-50 p-4 rounded-full mr-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Pending</h3>
              <p className="text-sm text-gray-500">{quotes.filter(q => q.status === 'pending').length} quotes</p>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              My Quotes
            </h3>
          </div>
          
          {loadingData ? (
             <div className="flex justify-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
             </div>
          ) : quotes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-sm">
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b">Property Address</th>
                    <th className="p-3 border-b">Total Items</th>
                    <th className="p-3 border-b">Total Price</th>
                    <th className="p-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => {
                    const totalItems = quote.lineItems?.length || 0;
                    const totalPrice = quote.lineItems?.reduce((sum: number, item: any) => sum + (Number(item.technicianPrice) || 0), 0) || 0;
                    
                    return (
                      <tr key={quote.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-sm text-gray-600">
                          {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleDateString() : new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-gray-800">{quote.address}</p>
                        </td>
                        <td className="p-3 text-gray-600">
                          {totalItems} items
                        </td>
                        <td className="p-3 font-medium text-gray-800">
                          ${totalPrice.toFixed(2)}
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            quote.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            quote.status === "approved" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {quote.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {quote.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {quote.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4 text-lg">You haven't submitted any quotes yet.</p>
              <Link 
                href="/portal/technician/quotes/new" 
                className="inline-flex items-center px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-opacity-90 transition-colors shadow-sm"
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
