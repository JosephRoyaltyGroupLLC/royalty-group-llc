"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Shield, AlertTriangle, MessageSquare, ClipboardList, Send, FileText, CheckCircle2 } from "lucide-react";

export default function AdminPortal() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("applications");
  
  // Data states
  const [navigatorRequests, setNavigatorRequests] = useState<any[]>([]);
  const [residentApplications, setResidentApplications] = useState<any[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  
  // App UI states
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [selectedRecordCollection, setSelectedRecordCollection] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [submittingAnn, setSubmittingAnn] = useState(false);
  
  const router = useRouter();

  const fetchAllData = async () => {
    try {
      // Fetch Navigator Requests
      const navSnapshot = await getDocs(collection(db, "navigator_referrals"));
      const navData: any[] = [];
      navSnapshot.forEach((doc) => {
        navData.push({ id: doc.id, ...doc.data() });
      });
      setNavigatorRequests(navData);

      // Fetch Resident Applications (assuming "applications" collection)
      const appSnapshot = await getDocs(collection(db, "applications"));
      const appData: any[] = [];
      appSnapshot.forEach((doc) => {
        appData.push({ id: doc.id, ...doc.data() });
      });
      setResidentApplications(appData);

      // Fetch Maintenance Requests
      const maintSnapshot = await getDocs(collection(db, "maintenance_requests"));
      const maintData: any[] = [];
      maintSnapshot.forEach((doc) => {
        maintData.push({ id: doc.id, ...doc.data() });
      });
      maintData.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setMaintenanceRequests(maintData);

      // Fetch Announcements
      const annSnapshot = await getDocs(collection(db, "announcements"));
      const annData: any[] = [];
      annSnapshot.forEach((doc) => {
        annData.push({ id: doc.id, ...doc.data() });
      });
      annData.sort((a, b) => {
        const timeA = a.date?.seconds || a.createdAt?.seconds || 0;
        const timeB = b.date?.seconds || b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setAnnouncements(annData);

      // Fetch Contact Messages
      const msgSnapshot = await getDocs(collection(db, "contact_messages"));
      const msgData: any[] = [];
      msgSnapshot.forEach((doc) => {
        msgData.push({ id: doc.id, ...doc.data() });
      });
      msgData.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setContactMessages(msgData);

      // Fetch Quotes
      const quoteSnapshot = await getDocs(collection(db, "quotes"));
      const quoteData: any[] = [];
      quoteSnapshot.forEach((doc) => {
        quoteData.push({ id: doc.id, ...doc.data() });
      });
      quoteData.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setQuotes(quoteData);

    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Double check domain here as well just in case
        if (!currentUser.email?.endsWith("@royaltygroupllc.net")) {
          await signOut(auth);
          router.push("/login");
          return;
        }
        setUser(currentUser);
        await fetchAllData();
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

  const updateStatus = async (collectionName: string, id: string, newStatus: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { status: newStatus });
      // Refresh data locally
      await fetchAllData();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const addComment = async (collectionName: string, id: string, currentComments: any[], newCommentText: string) => {
    if (!newCommentText.trim()) return;
    
    try {
      const newComment = {
        text: newCommentText,
        author: user.displayName || "Admin",
        timestamp: new Date().toISOString()
      };
      
      const updatedComments = currentComments ? [...currentComments, newComment] : [newComment];
      
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { comments: updatedComments });
      // Refresh data
      await fetchAllData();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  const toggleArchive = async (collectionName: string, id: string, currentStatus: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { archived: !currentStatus });
      await fetchAllData();
    } catch (error) {
      console.error("Error toggling archive:", error);
      alert("Failed to update archive status.");
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    setSubmittingAnn(true);
    try {
      await addDoc(collection(db, "announcements"), {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        author: user.displayName || "Admin",
        date: serverTimestamp(),
        createdAt: serverTimestamp()
      });
      setNewAnnouncement({ title: "", content: "" });
      await fetchAllData();
    } catch (error) {
      console.error("Error adding announcement:", error);
      alert("Failed to post announcement.");
    } finally {
      setSubmittingAnn(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteDoc(doc(db, "announcements", id));
      await fetchAllData();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  // Combine and format apps
  const combinedApps = [
    ...navigatorRequests.map(r => ({...r, _collection: "navigator_referrals", _type: "Navigator Referral"})),
    ...residentApplications.map(r => ({...r, _collection: "applications", _type: "Resident Application"}))
  ];

  const filteredApps = combinedApps.filter(app => showArchived ? app.archived : !app.archived);

  // Group by status
  const appsByStatus = filteredApps.reduce((acc, app) => {
    const status = app.status || "Pending Review";
    if (!acc[status]) acc[status] = [];
    acc[status].push(app);
    return acc;
  }, {} as Record<string, any[]>);

  const selectedRecord = combinedApps.find(app => app.id === selectedRecordId && app._collection === selectedRecordCollection);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center border-t-4 border-primary">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-primary uppercase tracking-wider mb-1">Master Admin Portal</h2>
              <p className="text-gray-600 font-light">Logged in as: <span className="font-bold text-secondary">{user.email}</span></p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-6 md:mt-0 px-6 py-3 bg-gray-100 border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 uppercase tracking-wider"
          >
            <LogOut size={16} />
            Secure Sign Out
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg flex overflow-x-auto border border-gray-100 p-1">
          <button onClick={() => setActiveTab("applications")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors rounded-lg ${activeTab === "applications" ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Applications</button>
          <button onClick={() => setActiveTab("maintenance")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors rounded-lg ${activeTab === "maintenance" ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Maintenance</button>
          <button onClick={() => setActiveTab("announcements")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors rounded-lg ${activeTab === "announcements" ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Announcements</button>
          <button onClick={() => setActiveTab("messages")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors rounded-lg ${activeTab === "messages" ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Messages</button>
          <button onClick={() => setActiveTab("quotes")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors rounded-lg ${activeTab === "quotes" ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>Tech Quotes</button>
        </div>

        {/* Tab Content */}
        {activeTab === "applications" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-extrabold text-primary uppercase tracking-wider flex items-center gap-3">
                <ClipboardList className="text-secondary w-6 h-6" /> Applications & Referrals
              </h3>
              <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">View Archived</span>
                <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} className="rounded text-secondary focus:ring-secondary w-5 h-5 cursor-pointer" />
              </label>
            </div>
            
            {Object.keys(appsByStatus).length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-light">No {showArchived ? "archived" : "active"} applications found.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {(Object.entries(appsByStatus) as [string, any[]][]).map(([status, apps]) => (
                  <div key={status} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h4 className="font-extrabold text-primary uppercase tracking-wider flex items-center">
                        {status} 
                        <span className="ml-4 text-xs bg-secondary text-primary px-3 py-1 rounded shadow-sm">{apps.length}</span>
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {apps.map(app => {
                            const name = `${app.clientFirstName || app.firstName || ""} ${app.clientLastName || app.lastName || ""}`.trim();
                            const date = app.submittedAt ? new Date(app.submittedAt) : app.createdAt?.seconds ? new Date(app.createdAt.seconds * 1000) : new Date();
                            
                            return (
                              <tr 
                                key={app.id} 
                                onClick={() => { setSelectedRecordId(app.id); setSelectedRecordCollection(app._collection); setIsDrawerOpen(true); }}
                                className="hover:bg-primary/5 cursor-pointer transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{name || "Unknown"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${app._collection === 'applications' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    {app._type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{date.toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button 
                                    onClick={(e) => toggleArchive(app._collection, app.id, !!app.archived, e)}
                                    className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${app.archived ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"} transition-colors`}
                                  >
                                    {app.archived ? "Unarchive" : "Archive"}
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
            <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider border-b border-gray-100 pb-4 flex items-center gap-3">
              <AlertTriangle className="text-secondary w-6 h-6" /> Maintenance Requests
            </h3>
            {maintenanceRequests.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-light">No maintenance requests found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {maintenanceRequests.map((req) => (
                  <RequestCard key={req.id} request={req} collectionName="maintenance_requests" onUpdateStatus={updateStatus} onAddComment={addComment} type={`Maintenance: ${req.priority}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1 bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary h-fit">
              <h3 className="text-xl font-extrabold text-primary mb-6 uppercase tracking-wider border-b border-gray-100 pb-4 flex items-center gap-3">
                <Send className="text-secondary w-5 h-5" /> Post Announcement
              </h3>
              <form onSubmit={handleAddAnnouncement} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Title</label>
                  <input type="text" required value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Content</label>
                  <textarea required rows={5} value={newAnnouncement.content} onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"></textarea>
                </div>
                <button type="submit" disabled={submittingAnn} className="w-full px-4 py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] disabled:opacity-70 transition-colors">
                  {submittingAnn ? "Posting..." : "Post Announcement"}
                </button>
              </form>
            </div>
            <div className="xl:col-span-2 bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
              <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider border-b border-gray-100 pb-4">Recent Announcements</h3>
              {announcements.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-light">No announcements found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="bg-gray-50 rounded-lg p-6 relative group border border-gray-200 hover:shadow-md transition-all">
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} className="absolute top-6 right-6 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                      <h4 className="font-extrabold text-primary text-xl mb-1">{ann.title}</h4>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">
                        {ann.date?.seconds ? new Date(ann.date.seconds * 1000).toLocaleDateString() : "Just now"} by {ann.author}
                      </p>
                      <p className="text-gray-700 whitespace-pre-wrap font-light leading-relaxed">{ann.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
            <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider border-b border-gray-100 pb-4 flex items-center gap-3">
              <MessageSquare className="text-secondary w-6 h-6" /> Contact Form Messages
            </h3>
            {contactMessages.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-light">No messages found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {contactMessages.map((msg) => (
                  <RequestCard key={msg.id} request={msg} collectionName="contact_messages" onUpdateStatus={updateStatus} onAddComment={addComment} type={`Message: ${msg.subject}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "quotes" && (
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
            <h3 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider border-b border-gray-100 pb-4 flex items-center gap-3">
              <FileText className="text-secondary w-6 h-6" /> Technician Quotes
            </h3>
            {quotes.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-light">No quotes found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Technician</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                          {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleDateString() : new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">
                          {quote.technicianName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {quote.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 inline-flex text-xs font-bold uppercase tracking-wider rounded shadow-sm ${
                            quote.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            quote.status === "approved" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/quotes/${quote.id}`} className="inline-block px-4 py-2 bg-secondary text-primary font-bold uppercase tracking-wider text-xs rounded shadow hover:bg-secondary-light transition-colors">
                            View & Markup
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-out Drawer Overlay */}
      {isDrawerOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div 
            className="w-full max-w-lg bg-white h-full shadow-2xl relative transform transition-transform overflow-y-auto flex flex-col border-l-4 border-secondary animate-slide-in-right"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-muted/50">
              <h3 className="text-xl font-extrabold text-primary uppercase tracking-wider">{selectedRecord._type} Details</h3>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="text-gray-400 hover:text-gray-800 text-3xl font-light leading-none transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-8 flex-grow overflow-y-auto bg-white">
               <RequestCard 
                  request={selectedRecord} 
                  collectionName={selectedRecord._collection} 
                  onUpdateStatus={updateStatus} 
                  onAddComment={addComment} 
                  type={selectedRecord._type} 
                  hideBorder={true}
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent for rendering individual requests
function RequestCard({ request, collectionName, onUpdateStatus, onAddComment, type, hideBorder = false }: any) {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(collectionName, request.id, request.comments || [], commentText);
    setCommentText("");
  };

  const isMaintenance = collectionName === "maintenance_requests";
  const isApplication = collectionName === "applications";
  const isNavigator = collectionName === "navigator_referrals";
  const isMessage = collectionName === "contact_messages";

  const name = isMaintenance ? request.userEmail : isMessage ? `${request.firstName} ${request.lastName}` : `${request.clientFirstName || request.firstName || ""} ${request.clientLastName || request.lastName || ""}`.trim();
  const date = request.submittedAt ? new Date(request.submittedAt) : request.createdAt?.seconds ? new Date(request.createdAt.seconds * 1000) : new Date();

  return (
    <div className={`${hideBorder ? "" : "border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          {!hideBorder && <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded mb-3 inline-block">{type}</span>}
          <h4 className={`font-extrabold text-primary mt-1 ${hideBorder ? "text-3xl mb-2" : "text-xl mb-1"}`}>
            {isMaintenance ? request.title : name}
          </h4>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted: {date.toLocaleDateString()}</p>
          {isMaintenance && <p className="text-sm text-gray-700 mt-3 font-medium">From: <span className="font-bold">{request.userEmail}</span></p>}
        </div>
        <div className="flex flex-col items-end gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
          <select 
            value={request.status || (isMaintenance ? "Pending" : "Pending Review")}
            onChange={(e) => onUpdateStatus(collectionName, request.id, e.target.value)}
            className="text-sm border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary font-bold uppercase tracking-wider text-primary p-2 bg-gray-50"
          >
            {isMaintenance ? (
              <>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </>
            ) : (
              <>
                <option value="Pending Review">Pending Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Waitlisted">Waitlisted</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg text-sm text-gray-700 mb-6 grid grid-cols-2 gap-y-4 gap-x-6 border border-gray-100">
        {isMaintenance && (
          <div className="col-span-2 whitespace-pre-wrap font-light leading-relaxed">{request.description}</div>
        )}
        
        {isApplication && (
          <>
            {request.email && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Email</strong> <span className="font-light">{request.email}</span></div>}
            {request.phone && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Phone</strong> <span className="font-light">{request.phone}</span></div>}
            {request.dob && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">DOB</strong> <span className="font-light">{request.dob}</span></div>}
            {request.roomPreference && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Room Pref</strong> <span className="font-light capitalize">{request.roomPreference}</span></div>}
            {request.moveInDate && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Move-in Date</strong> <span className="font-light">{request.moveInDate}</span></div>}
            {request.emergencyContactName && <div className="col-span-2 mt-2 pt-4 border-t border-gray-200"><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Emergency Contact</strong> <span className="font-light">{request.emergencyContactName} ({request.emergencyContactPhone})</span></div>}
            {request.specialRequirements && <div className="col-span-2 mt-2 pt-4 border-t border-gray-200"><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Special Requirements</strong> <span className="whitespace-pre-wrap font-light block mt-1 leading-relaxed">{request.specialRequirements}</span></div>}
          </>
        )}

        {isNavigator && (
          <>
            {request.clientIncome && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Income</strong> <span className="font-light">{request.clientIncome}</span></div>}
            {request.roomPreference && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Room Pref</strong> <span className="font-light capitalize">{request.roomPreference}</span></div>}
            {request.clientHasPayee && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Payee</strong> <span className="font-light">Yes ({request.payeeRentPercentage})</span></div>}
            {request.navigatorName && <div className="col-span-2 mt-2 pt-4 border-t border-gray-200"><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Navigator</strong> <span className="font-light">{request.navigatorName} ({request.navigatorEmail})</span></div>}
          </>
        )}

        {isMessage && (
          <>
            {request.email && <div><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Email</strong> <span className="font-light">{request.email}</span></div>}
            {request.message && <div className="col-span-2 mt-2 pt-4 border-t border-gray-200"><strong className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Message</strong> <span className="whitespace-pre-wrap block font-light leading-relaxed">{request.message}</span></div>}
          </>
        )}
      </div>

      {/* Comment Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h5 className="text-sm font-extrabold text-primary mb-4 uppercase tracking-wider">Admin Comments & Updates</h5>
        
        {/* Existing Comments */}
        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
          {(request.comments || []).map((comment: any, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{comment.author}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700 font-light leading-relaxed">{comment.text}</p>
            </div>
          ))}
          {(!request.comments || request.comments.length === 0) && (
            <p className="text-sm font-light text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center border border-gray-100">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex gap-3">
          <input 
            type="text" 
            placeholder="Add a status update or note..." 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-grow text-sm border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary px-4 py-3 bg-gray-50 transition-all"
          />
          <button 
            type="submit"
            disabled={!commentText.trim()}
            className="px-6 py-3 bg-secondary text-primary text-xs font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light disabled:opacity-50 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
