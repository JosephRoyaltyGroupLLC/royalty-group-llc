"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wrench, FileText, Bell, LayoutDashboard, LogOut, ChevronRight, User } from "lucide-react";

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
          <div className="flex items-center space-x-6">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-2 border-secondary shadow" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary text-secondary flex items-center justify-center text-3xl font-extrabold border-2 border-secondary shadow">
                {user.displayName?.charAt(0) || <User size={32} />}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-extrabold text-primary uppercase tracking-wider mb-1">Welcome, {user.displayName || "Resident"}</h2>
              <p className="text-gray-600 font-light">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-6 md:mt-0 px-6 py-3 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 flex items-center gap-3 text-left font-bold uppercase tracking-wider transition-colors border-l-4 text-sm ${activeTab === "overview" ? "border-secondary bg-primary/5 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  <LayoutDashboard size={18} className={activeTab === "overview" ? "text-secondary" : "text-gray-400"} />
                  Dashboard Overview
                </button>
                <button 
                  onClick={() => setActiveTab("maintenance")}
                  className={`px-6 py-4 flex items-center gap-3 text-left font-bold uppercase tracking-wider transition-colors border-l-4 text-sm ${activeTab === "maintenance" ? "border-secondary bg-primary/5 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  <Wrench size={18} className={activeTab === "maintenance" ? "text-secondary" : "text-gray-400"} />
                  Maintenance
                </button>
                <button 
                  onClick={() => setActiveTab("documents")}
                  className={`px-6 py-4 flex items-center gap-3 text-left font-bold uppercase tracking-wider transition-colors border-l-4 text-sm ${activeTab === "documents" ? "border-secondary bg-primary/5 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  <FileText size={18} className={activeTab === "documents" ? "text-secondary" : "text-gray-400"} />
                  Documents
                </button>
                <button 
                  onClick={() => setActiveTab("announcements")}
                  className={`px-6 py-4 flex items-center gap-3 text-left font-bold uppercase tracking-wider transition-colors border-l-4 text-sm ${activeTab === "announcements" ? "border-secondary bg-primary/5 text-primary" : "border-transparent text-gray-600 hover:bg-gray-50"}`}
                >
                  <Bell size={18} className={activeTab === "announcements" ? "text-secondary" : "text-gray-400"} />
                  Announcements
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {loadingData ? (
              <div className="bg-white p-16 rounded-xl shadow-lg flex justify-center border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-secondary"></div>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary flex flex-col h-full">
                      <h3 className="text-xl font-extrabold text-primary mb-6 uppercase tracking-wider">Quick Links</h3>
                      <div className="space-y-4 flex-grow">
                        <Link href="/portal/maintenance/new" className="group block p-4 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-primary block mb-1">Request Maintenance</span>
                              <p className="text-sm text-gray-500 font-light">Submit a new repair ticket</p>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-secondary transition-colors" />
                          </div>
                        </Link>
                        <button onClick={() => setActiveTab("documents")} className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-md transition-all group">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-primary block mb-1">View Documents</span>
                              <p className="text-sm text-gray-500 font-light">Access community guidelines</p>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-secondary transition-colors" />
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-extrabold text-primary uppercase tracking-wider">Recent Announcements</h3>
                        <Bell className="text-secondary w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        {announcements.length > 0 ? (
                          <div className="space-y-6">
                            {announcements.slice(0, 2).map((announcement) => (
                              <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <h4 className="font-bold text-gray-900 mb-1">{announcement.title}</h4>
                                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                                  {announcement.date?.toDate ? announcement.date.toDate().toLocaleDateString() : new Date(announcement.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2 font-light">{announcement.content}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 font-light italic text-center py-8">No recent announcements.</p>
                        )}
                      </div>
                      {announcements.length > 0 && (
                        <button onClick={() => setActiveTab("announcements")} className="mt-6 text-sm text-secondary font-bold uppercase tracking-wider hover:text-primary transition-colors inline-flex items-center gap-1">
                          View All <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                  <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                      <h3 className="text-2xl font-extrabold text-primary uppercase tracking-wider">Maintenance Requests</h3>
                      <Link 
                        href="/portal/maintenance/new" 
                        className="px-6 py-3 bg-primary text-secondary font-bold uppercase tracking-wider rounded hover:bg-[#00152e] transition-colors shadow flex items-center gap-2 text-sm"
                      >
                        <Wrench size={16} />
                        New Request
                      </Link>
                    </div>
                    
                    {maintenanceRequests.length > 0 ? (
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider font-bold">
                              <th className="p-4 border-b">Date</th>
                              <th className="p-4 border-b">Issue</th>
                              <th className="p-4 border-b">Priority</th>
                              <th className="p-4 border-b">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {maintenanceRequests.map((req) => (
                              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-sm text-gray-600 font-medium">
                                  {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : "Just now"}
                                </td>
                                <td className="p-4">
                                  <p className="font-bold text-gray-900">{req.title}</p>
                                </td>
                                <td className="p-4">
                                  <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide shadow-sm ${
                                    req.priority === "Emergency" ? "bg-red-100 text-red-800" :
                                    req.priority === "Urgent" ? "bg-orange-100 text-orange-800" :
                                    "bg-blue-100 text-blue-800"
                                  }`}>
                                    {req.priority}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide shadow-sm ${
                                    req.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                    req.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                    "bg-green-100 text-green-800"
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
                      <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-6 font-light">You have no maintenance requests at this time.</p>
                        <Link 
                          href="/portal/maintenance/new" 
                          className="inline-block px-6 py-3 border-2 border-primary text-primary font-bold uppercase tracking-wider rounded hover:bg-primary hover:text-white transition-colors text-sm shadow-sm"
                        >
                          Submit a Request
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
                    <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider">Community Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all flex items-start space-x-5 group">
                        <div className="bg-primary/5 text-primary p-4 rounded-lg group-hover:bg-primary group-hover:text-secondary transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Community Guidelines</h4>
                          <p className="text-sm text-gray-500 mb-4 font-light">Rules and regulations for residents.</p>
                          <a href="#" className="text-sm text-secondary hover:text-primary font-bold uppercase tracking-wider transition-colors">Download PDF</a>
                        </div>
                      </div>
                      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all flex items-start space-x-5 group">
                        <div className="bg-primary/5 text-primary p-4 rounded-lg group-hover:bg-primary group-hover:text-secondary transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Move-Out Checklist</h4>
                          <p className="text-sm text-gray-500 mb-4 font-light">Steps to follow when moving out.</p>
                          <a href="#" className="text-sm text-secondary hover:text-primary font-bold uppercase tracking-wider transition-colors">Download PDF</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Announcements Tab */}
                {activeTab === "announcements" && (
                  <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
                    <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider">Community Announcements</h3>
                    {announcements.length > 0 ? (
                      <div className="space-y-6">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                              <h4 className="text-xl font-bold text-gray-900">{announcement.title}</h4>
                              <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-white px-3 py-1 rounded shadow-sm border border-gray-100 w-fit">
                                {announcement.date?.toDate ? announcement.date.toDate().toLocaleDateString() : new Date(announcement.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap font-light leading-relaxed">{announcement.content}</p>
                            {announcement.author && (
                              <div className="mt-6 pt-4 border-t border-gray-200 text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Posted by <span className="text-primary">{announcement.author}</span></p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-light">There are no community announcements at this time.</p>
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
