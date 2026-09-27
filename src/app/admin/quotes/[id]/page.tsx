"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, XCircle, FileDown, MessageSquare } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminQuoteDetail() {
  const [user, setUser] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newOverallComment, setNewOverallComment] = useState("");

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email?.endsWith("@royaltygroupllc.net")) {
        setUser(currentUser);
        if (id) fetchQuote();
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [id, router]);

  const fetchQuote = async () => {
    try {
      const docRef = doc(db, "quotes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuote({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("No such quote!");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkupChange = (itemId: string, newMarkup: string) => {
    const updatedLineItems = quote.lineItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, adminMarkup: parseFloat(newMarkup) || 0 };
      }
      return item;
    });
    setQuote({ ...quote, lineItems: updatedLineItems });
  };

  const handleItemCommentChange = (itemId: string, commentText: string) => {
    const updatedLineItems = quote.lineItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, draftComment: commentText };
      }
      return item;
    });
    setQuote({ ...quote, lineItems: updatedLineItems });
  };

  const saveItemComment = async (itemId: string) => {
    const item = quote.lineItems.find((i: any) => i.id === itemId);
    if (!item || !item.draftComment?.trim()) return;

    const newComment = {
      author: user.displayName || "Admin",
      text: item.draftComment.trim(),
      timestamp: new Date().toISOString(),
      isAdmin: true
    };

    const updatedLineItems = quote.lineItems.map((i: any) => {
      if (i.id === itemId) {
        return {
          ...i,
          comments: [...(i.comments || []), newComment],
          draftComment: ""
        };
      }
      return i;
    });

    const updatedQuote = { ...quote, lineItems: updatedLineItems };
    setQuote(updatedQuote);
    await saveQuoteToDb(updatedQuote);
  };

  const saveOverallComment = async () => {
    if (!newOverallComment.trim()) return;

    const newComment = {
      author: user.displayName || "Admin",
      text: newOverallComment.trim(),
      timestamp: new Date().toISOString(),
      isAdmin: true
    };

    const updatedQuote = {
      ...quote,
      overallComments: [...(quote.overallComments || []), newComment]
    };

    setQuote(updatedQuote);
    setNewOverallComment("");
    await saveQuoteToDb(updatedQuote);
  };

  const saveQuoteToDb = async (quoteDataToSave: any) => {
    setSaving(true);
    try {
      const docRef = doc(db, "quotes", id);
      await updateDoc(docRef, {
        lineItems: quoteDataToSave.lineItems,
        overallComments: quoteDataToSave.overallComments,
        status: quoteDataToSave.status
      });
    } catch (err) {
      console.error("Error saving quote:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    await saveQuoteToDb(quote);
    alert("Draft saved!");
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (confirm(`Are you sure you want to mark this quote as ${newStatus.toUpperCase()}?`)) {
      const updatedQuote = { ...quote, status: newStatus };
      setQuote(updatedQuote);
      await saveQuoteToDb(updatedQuote);
    }
  };

  const generatePDF = () => {
    if (!quote) return;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102); // Primary color
    doc.text("Royalty Group LLC", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Approved Work Quote", 14, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`Property Address: ${quote.address}`, 14, 40);
    doc.text(`Quote ID: ${quote.id.substring(0, 8).toUpperCase()}`, 14, 45);
    const dateStr = quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString();
    doc.text(`Date: ${dateStr}`, 14, 50);

    // Table Data
    const tableColumn = ["Item", "Description", "Price"];
    const tableRows: any[] = [];
    
    let totalCost = 0;

    quote.lineItems.forEach((item: any, index: number) => {
      const finalPrice = Number(item.technicianPrice) + Number(item.adminMarkup || 0);
      totalCost += finalPrice;
      const itemData = [
        (index + 1).toString(),
        item.description,
        `$${finalPrice.toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102] },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY || 60;
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total Estimate: $${totalCost.toFixed(2)}`, 14, finalY + 15);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your business.", 14, finalY + 30);

    doc.save(`Quote_${quote.address.substring(0, 15)}_${quote.id.substring(0, 6)}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quote) {
    return <div className="p-8 text-center text-red-500">Quote not found.</div>;
  }

  const techTotal = quote.lineItems?.reduce((sum: number, item: any) => sum + Number(item.technicianPrice || 0), 0) || 0;
  const markupTotal = quote.lineItems?.reduce((sum: number, item: any) => sum + Number(item.adminMarkup || 0), 0) || 0;
  const finalTotal = techTotal + markupTotal;

  return (
    <div className="flex-grow bg-muted py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link href="/admin" className="text-secondary hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Admin Dashboard
          </Link>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 flex items-center font-medium transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Draft"}
            </button>
            
            {quote.status === "approved" && (
              <button 
                onClick={generatePDF}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 flex items-center font-medium transition-colors"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Generate PDF
              </button>
            )}
          </div>
        </div>

        {/* Header Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{quote.address}</h1>
            <p className="text-gray-500">Technician: <span className="font-semibold text-gray-700">{quote.technicianName}</span></p>
            <p className="text-gray-500 text-sm mt-1">Submitted: {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleString() : ""}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-3 ${
                quote.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                quote.status === "approved" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }`}>
              {quote.status}
            </div>
            <div className="text-2xl font-black text-primary">${finalTotal.toFixed(2)}</div>
            <p className="text-xs text-gray-500 font-medium">Final Price</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Line Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Line Items & Markup</h2>
              
              <div className="space-y-6">
                {quote.lineItems?.map((item: any, index: number) => {
                  const techP = Number(item.technicianPrice || 0);
                  const adminM = Number(item.adminMarkup || 0);
                  
                  return (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
                      <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Item {index + 1}
                      </div>
                      
                      <div className="pr-12 mb-4">
                        <p className="font-semibold text-gray-800 whitespace-pre-wrap">{item.description}</p>
                      </div>

                      {/* Pricing Row */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 bg-white p-3 rounded border border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Tech Cost</p>
                          <p className="font-semibold text-gray-700">${techP.toFixed(2)}</p>
                        </div>
                        <div className="text-gray-400 font-bold">+</div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Admin Markup ($)</p>
                          <input 
                            type="number" 
                            step="0.01" 
                            min="0"
                            value={item.adminMarkup || ""}
                            onChange={(e) => handleMarkupChange(item.id, e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded focus:border-secondary focus:ring-1 focus:ring-secondary text-sm"
                          />
                        </div>
                        <div className="text-gray-400 font-bold">=</div>
                        <div>
                          <p className="text-xs text-primary font-bold uppercase mb-1">Final Price</p>
                          <p className="font-bold text-primary text-lg">${(techP + adminM).toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Photos */}
                      {item.photos && item.photos.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Photos ({item.photos.length})</p>
                          <div className="flex flex-wrap gap-2">
                            {item.photos.map((url: string, i: number) => (
                              <a key={i} href={url} target="_blank" rel="noreferrer" className="block w-20 h-20 border border-gray-300 rounded overflow-hidden hover:opacity-80 transition-opacity">
                                <img src={url} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Comments Thread */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center">
                          <MessageSquare className="w-3 h-3 mr-1" /> Item Discussion
                        </p>
                        
                        <div className="space-y-2 mb-3">
                          {item.comments?.map((c: any, i: number) => (
                            <div key={i} className={`p-2 rounded text-sm ${c.isAdmin ? 'bg-blue-100 border border-blue-200 ml-4' : 'bg-white border border-gray-200 mr-4'}`}>
                              <div className="flex justify-between items-center mb-1">
                                <span className={`font-bold text-xs ${c.isAdmin ? 'text-primary' : 'text-gray-700'}`}>{c.author}</span>
                                <span className="text-[10px] text-gray-400">{new Date(c.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="text-gray-800">{c.text}</p>
                            </div>
                          ))}
                          {(!item.comments || item.comments.length === 0) && (
                            <p className="text-xs text-gray-400 italic">No comments yet.</p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Reply to this item..."
                            value={item.draftComment || ""}
                            onChange={(e) => handleItemCommentChange(item.id, e.target.value)}
                            className="flex-grow text-sm px-3 py-1.5 border border-gray-300 rounded focus:ring-secondary focus:border-secondary"
                          />
                          <button 
                            onClick={() => saveItemComment(item.id)}
                            disabled={!item.draftComment?.trim()}
                            className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 disabled:opacity-50"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Overall Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Action Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-secondary">
              <h3 className="font-bold text-gray-800 mb-4">Admin Actions</h3>
              
              <div className="flex flex-col space-y-3 mb-6">
                {quote.status !== "approved" && (
                  <button 
                    onClick={() => handleUpdateStatus("approved")}
                    className="w-full flex justify-center items-center px-4 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition-colors shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Approve Quote
                  </button>
                )}
                {quote.status !== "rejected" && (
                  <button 
                    onClick={() => handleUpdateStatus("rejected")}
                    className="w-full flex justify-center items-center px-4 py-2 border border-red-500 text-red-500 rounded font-bold hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Reject Quote
                  </button>
                )}
                {quote.status !== "pending" && (
                  <button 
                    onClick={() => handleUpdateStatus("pending")}
                    className="w-full flex justify-center items-center px-4 py-2 border border-yellow-500 text-yellow-600 rounded font-bold hover:bg-yellow-50 transition-colors"
                  >
                    Move to Pending
                  </button>
                )}
              </div>

              <div className="bg-gray-50 rounded p-4 border border-gray-200">
                <h4 className="font-bold text-gray-700 text-sm uppercase mb-2 border-b pb-1">Price Summary</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Tech Cost:</span>
                  <span className="font-semibold text-gray-800">${techTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Total Markup:</span>
                  <span className="font-semibold text-green-600">+${markupTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
                  <span className="text-primary">Final Price:</span>
                  <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Overall Comments Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Overall Comments</h3>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
                {quote.overallComments?.map((c: any, i: number) => (
                  <div key={i} className={`p-3 rounded text-sm ${c.isAdmin ? 'bg-blue-50 border border-blue-100 ml-4' : 'bg-gray-50 border border-gray-200 mr-4'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold text-xs ${c.isAdmin ? 'text-primary' : 'text-gray-700'}`}>{c.author}</span>
                      <span className="text-[10px] text-gray-500">{new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-800">{c.text}</p>
                  </div>
                ))}
                {(!quote.overallComments || quote.overallComments.length === 0) && (
                  <p className="text-sm text-gray-500 italic text-center py-4">No overall comments.</p>
                )}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <textarea 
                  rows={2}
                  placeholder="Add a general note..."
                  value={newOverallComment}
                  onChange={(e) => setNewOverallComment(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary mb-2"
                />
                <button 
                  onClick={saveOverallComment}
                  disabled={!newOverallComment.trim()}
                  className="w-full px-4 py-2 bg-secondary text-white text-sm font-bold rounded hover:bg-opacity-90 disabled:bg-gray-400 transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
