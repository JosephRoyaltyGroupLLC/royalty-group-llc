"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserData = async (userId: string) => {
    setLoadingData(true);
    try {
      // Fetch maintenance requests
      const mQuery = query(
        collection(db, "maintenance_requests"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const mSnapshot = await getDocs(mQuery);
      const requests = mSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMaintenanceRequests(requests);

      // Fetch announcements
      const aQuery = query(
        collection(db, "announcements"),
        orderBy("date", "desc")
      );
      const aSnapshot = await getDocs(aQuery);
      const news = aSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnnouncements(news);
    } catch (err) {
      console.error("Error fetching portal data:", err);
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
      <div className="flex-grow flex items-center justify-center">
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
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-primary">Welcome, {user.displayName || "Resident"}</h2>
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 text-left font-medium transition-colors border-l-4 ${activeTab === "overview" ? "border-secondary bg-blue-50 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  Dashboard Overview
                </button>
                <button 
                  onClick={() => setActiveTab("maintenance")}
                  className={`px-6 py-4 text-left font-medium transition-colors border-l-4 ${activeTab === "maintenance" ? "border-secondary bg-blue-50 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  Maintenance
                </button>
                <button 
                  onClick={() => setActiveTab("documents")}
                  className={`px-6 py-4 text-left font-medium transition-colors border-l-4 ${activeTab === "documents" ? "border-secondary bg-blue-50 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  Documents
                </button>
                <button 
                  onClick={() => setActiveTab("announcements")}
                  className={`px-6 py-4 text-left font-medium transition-colors border-l-4 ${activeTab === "announcements" ? "border-secondary bg-blue-50 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  Announcements
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {loadingData ? (
              <div className="bg-white p-12 rounded-xl shadow-md flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-secondary">
                      <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
                      <div className="space-y-3">
                        <Link href="/portal/maintenance/new" className="block p-3 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-sm transition-all">
                          <span className="font-semibold text-gray-800">Request Maintenance</span>
                          <p className="text-sm text-gray-500">Submit a new repair ticket</p>
                        </Link>
                        <button onClick={() => setActiveTab("documents")} className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-sm transition-all">
                          <span className="font-semibold text-gray-800">View Documents</span>
                          <p className="text-sm text-gray-500">Access community guidelines</p>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary">
                      <h3 className="text-xl font-bold text-primary mb-4">Recent Announcements</h3>
                      {announcements.length > 0 ? (
                        <div className="space-y-4">
                          {announcements.slice(0, 2).map((announcement) => (
                            <div key={announcement.id} className="border-b pb-3 last:border-0">
                              <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
                              <p className="text-sm text-gray-500 mb-1">
                                {announcement.date?.toDate ? announcement.date.toDate().toLocaleDateString() : new Date(announcement.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                            </div>
                          ))}
                          <button onClick={() => setActiveTab("announcements")} className="text-sm text-secondary font-medium hover:underline">
                            View All Announcements
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No recent announcements.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-primary">Maintenance Requests</h3>
                      <Link 
                        href="/portal/maintenance/new" 
                        className="px-4 py-2 bg-secondary text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        New Request
                      </Link>
                    </div>
                    
                    {maintenanceRequests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-700 text-sm">
                              <th className="p-3 border-b">Date</th>
                              <th className="p-3 border-b">Issue</th>
                              <th className="p-3 border-b">Priority</th>
                              <th className="p-3 border-b">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {maintenanceRequests.map((req) => (
                              <tr key={req.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-sm text-gray-600">
                                  {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : "Just now"}
                                </td>
                                <td className="p-3">
                                  <p className="font-medium text-gray-800">{req.title}</p>
                                </td>
                                <td className="p-3">
                                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    req.priority === "Emergency" ? "bg-red-100 text-red-700" :
                                    req.priority === "Urgent" ? "bg-orange-100 text-orange-700" :
                                    "bg-blue-100 text-blue-700"
                                  }`}>
                                    {req.priority}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    req.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                    req.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                    "bg-green-100 text-green-700"
                                  }`}>
                                    {req.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">You have no maintenance requests.</p>
                        <Link 
                          href="/portal/maintenance/new" 
                          className="px-4 py-2 border border-secondary text-secondary font-medium rounded-md hover:bg-secondary hover:text-white transition-colors"
                        >
                          Submit a Request
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-primary mb-6">Community Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Placeholder Documents */}
                      <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex items-start space-x-4">
                        <div className="bg-blue-100 text-primary p-3 rounded-lg">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Community Guidelines</h4>
                          <p className="text-sm text-gray-500 mb-2">Rules and regulations for residents.</p>
                          <a href="#" className="text-sm text-secondary hover:underline font-medium">Download PDF</a>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex items-start space-x-4">
                        <div className="bg-blue-100 text-primary p-3 rounded-lg">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Move-Out Checklist</h4>
                          <p className="text-sm text-gray-500 mb-2">Steps to follow when moving out.</p>
                          <a href="#" className="text-sm text-secondary hover:underline font-medium">Download PDF</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Announcements Tab */}
                {activeTab === "announcements" && (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-primary mb-6">Community Announcements</h3>
                    {announcements.length > 0 ? (
                      <div className="space-y-6">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-bold text-gray-800">{announcement.title}</h4>
                              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
                                {announcement.date?.toDate ? announcement.date.toDate().toLocaleDateString() : new Date(announcement.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                            {announcement.author && (
                              <p className="text-sm text-gray-500 mt-4 text-right">- Posted by {announcement.author}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">There are no community announcements at this time.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
