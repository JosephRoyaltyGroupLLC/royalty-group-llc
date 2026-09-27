"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center border-t-4 border-primary">
          <div>
            <h2 className="text-3xl font-bold text-primary">Master Admin Portal</h2>
            <p className="text-gray-600">Logged in as: <span className="font-semibold text-secondary">{user.email}</span></p>
          </div>
          <button 
            onClick={handleSignOut}
            className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Secure Sign Out
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md flex overflow-x-auto">
          <button onClick={() => setActiveTab("applications")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === "applications" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Applications</button>
          <button onClick={() => setActiveTab("maintenance")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === "maintenance" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Maintenance Requests</button>
          <button onClick={() => setActiveTab("announcements")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === "announcements" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Announcements</button>
          <button onClick={() => setActiveTab("messages")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === "messages" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Messages</button>
          <button onClick={() => setActiveTab("quotes")} className={`flex-1 py-4 px-6 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === "quotes" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"}`}>Technician Quotes</button>
        </div>

        {/* Tab Content */}
        {activeTab === "applications" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-primary">Applications & Referrals</h3>
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-700">View Archived</span>
                <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} className="rounded text-secondary focus:ring-secondary w-4 h-4 cursor-pointer" />
              </label>
            </div>
            
            {Object.keys(appsByStatus).length === 0 ? (
              <p className="text-gray-500">No {showArchived ? "archived" : "active"} applications found.</p>
            ) : (
              <div className="space-y-8">
                {(Object.entries(appsByStatus) as [string, any[]][]).map(([status, apps]) => (
                  <div key={status} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-bold text-gray-800 flex items-center">
                        {status} 
                        <span className="ml-3 text-xs bg-primary text-white px-2 py-0.5 rounded-full">{apps.length}</span>
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                className="hover:bg-blue-50 cursor-pointer transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{name || "Unknown"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${app._collection === 'applications' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    {app._type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date.toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button 
                                    onClick={(e) => toggleArchive(app._collection, app.id, !!app.archived, e)}
                                    className={`px-3 py-1.5 rounded text-xs font-bold ${app.archived ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"} transition-colors`}
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
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Maintenance Requests</h3>
            {maintenanceRequests.length === 0 ? (
              <p className="text-gray-500 text-sm">No maintenance requests found.</p>
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
            <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
              <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Post Announcement</h3>
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" required value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea required rows={5} value={newAnnouncement.content} onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary"></textarea>
                </div>
                <button type="submit" disabled={submittingAnn} className="w-full px-4 py-2 bg-secondary text-white font-bold rounded hover:bg-opacity-90 disabled:bg-gray-400">
                  {submittingAnn ? "Posting..." : "Post Announcement"}
                </button>
              </form>
            </div>
            <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Recent Announcements</h3>
              {announcements.length === 0 ? (
                <p className="text-gray-500 text-sm">No announcements found.</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="border border-gray-200 rounded p-4 relative group">
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                      <h4 className="font-bold text-gray-800 text-lg">{ann.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{ann.date?.seconds ? new Date(ann.date.seconds * 1000).toLocaleString() : "Just now"} by {ann.author}</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{ann.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Contact Form Messages</h3>
            {contactMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages found.</p>
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
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Technician Quotes</h3>
            {quotes.length === 0 ? (
              <p className="text-gray-500 text-sm">No quotes found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleDateString() : new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {quote.technicianName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quote.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            quote.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            quote.status === "approved" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {quote.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/quotes/${quote.id}`} className="text-secondary hover:text-blue-900 font-bold">
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
            className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div 
            className="w-full max-w-lg bg-white h-full shadow-2xl relative transform transition-transform overflow-y-auto flex flex-col border-l border-gray-200 animate-slide-in-right"
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-primary">{selectedRecord._type} Details</h3>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="text-gray-400 hover:text-gray-800 text-3xl font-light leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-6 flex-grow overflow-y-auto">
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
    <div className={`${hideBorder ? "" : "border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          {!hideBorder && <span className="text-xs font-bold text-secondary uppercase tracking-wider">{type}</span>}
          <h4 className={`font-bold text-gray-900 mt-1 ${hideBorder ? "text-2xl" : "text-lg"}`}>
            {isMaintenance ? request.title : name}
          </h4>
          <p className="text-xs text-gray-500 mt-1">Submitted: {date.toLocaleString()}</p>
          {isMaintenance && <p className="text-sm text-gray-700 mt-2"><strong>From:</strong> {request.userEmail}</p>}
        </div>
        <div className="flex flex-col items-end">
          <label className="text-xs font-semibold text-gray-600 mb-1">Status</label>
          <select 
            value={request.status || (isMaintenance ? "Pending" : "Pending Review")}
            onChange={(e) => onUpdateStatus(collectionName, request.id, e.target.value)}
            className="text-sm border-gray-300 rounded shadow-sm focus:ring-secondary focus:border-secondary font-medium"
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

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-4 grid grid-cols-2 gap-y-3 gap-x-4 border border-gray-100">
        {isMaintenance && (
          <div className="col-span-2 whitespace-pre-wrap">{request.description}</div>
        )}
        
        {isApplication && (
          <>
            {request.email && <div><strong className="block text-xs text-gray-500 uppercase">Email</strong> {request.email}</div>}
            {request.phone && <div><strong className="block text-xs text-gray-500 uppercase">Phone</strong> {request.phone}</div>}
            {request.dob && <div><strong className="block text-xs text-gray-500 uppercase">DOB</strong> {request.dob}</div>}
            {request.roomPreference && <div><strong className="block text-xs text-gray-500 uppercase">Room Pref</strong> {request.roomPreference}</div>}
            {request.moveInDate && <div><strong className="block text-xs text-gray-500 uppercase">Move-in Date</strong> {request.moveInDate}</div>}
            {request.emergencyContactName && <div className="col-span-2 mt-2 pt-2 border-t border-gray-200"><strong className="block text-xs text-gray-500 uppercase">Emergency Contact</strong> {request.emergencyContactName} ({request.emergencyContactPhone})</div>}
            {request.specialRequirements && <div className="col-span-2 mt-2 pt-2 border-t border-gray-200"><strong className="block text-xs text-gray-500 uppercase">Special Requirements</strong> <span className="whitespace-pre-wrap">{request.specialRequirements}</span></div>}
          </>
        )}

        {isNavigator && (
          <>
            {request.clientIncome && <div><strong className="block text-xs text-gray-500 uppercase">Income</strong> {request.clientIncome}</div>}
            {request.roomPreference && <div><strong className="block text-xs text-gray-500 uppercase">Room Pref</strong> {request.roomPreference}</div>}
            {request.clientHasPayee && <div><strong className="block text-xs text-gray-500 uppercase">Payee</strong> Yes ({request.payeeRentPercentage})</div>}
            {request.navigatorName && <div className="col-span-2 mt-2 pt-2 border-t border-gray-200"><strong className="block text-xs text-gray-500 uppercase">Navigator</strong> {request.navigatorName} ({request.navigatorEmail})</div>}
          </>
        )}

        {isMessage && (
          <>
            {request.email && <div><strong className="block text-xs text-gray-500 uppercase">Email</strong> {request.email}</div>}
            {request.message && <div className="col-span-2 mt-2 pt-2 border-t border-gray-200"><strong className="block text-xs text-gray-500 uppercase">Message</strong> <span className="whitespace-pre-wrap block mt-1">{request.message}</span></div>}
          </>
        )}
      </div>

      {/* Comment Section */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h5 className="text-sm font-bold text-gray-800 mb-3">Admin Comments / Updates</h5>
        
        {/* Existing Comments */}
        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
          {(request.comments || []).map((comment: any, idx: number) => (
            <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-primary">{comment.author}</span>
                <span className="text-[10px] text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          ))}
          {(!request.comments || request.comments.length === 0) && (
            <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded text-center">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add a status update or note..." 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-grow text-sm border-gray-300 rounded shadow-sm focus:ring-secondary focus:border-secondary px-3 py-2"
          />
          <button 
            type="submit"
            disabled={!commentText.trim()}
            className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded shadow hover:bg-secondary-light disabled:opacity-50 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
