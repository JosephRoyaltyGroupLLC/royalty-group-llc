"use client";

import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Upload, MessageSquare, Save, X } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  technicianPrice: string;
  photos: string[]; // URLs
  photoFiles: File[]; // Files to be uploaded
  comments: any[];
  newComment: string;
}

export default function NewQuote() {
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [overallComments, setOverallComments] = useState<any[]>([]);
  const [newOverallComment, setNewOverallComment] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", technicianPrice: "", photos: [], photoFiles: [], comments: [], newComment: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: "", technicianPrice: "", photos: [], photoFiles: [], comments: [], newComment: "" }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length === 1) return;
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handlePhotoSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setLineItems(lineItems.map(item => {
        if (item.id === id) {
          return { ...item, photoFiles: [...item.photoFiles, ...filesArray] };
        }
        return item;
      }));
    }
  };

  const removeSelectedPhoto = (itemId: string, index: number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === itemId) {
        const newFiles = [...item.photoFiles];
        newFiles.splice(index, 1);
        return { ...item, photoFiles: newFiles };
      }
      return item;
    }));
  };

  const uploadPhotos = async (files: File[], prefix: string): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const storageRef = ref(storage, `quotes/${prefix}_${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError("Please enter the property address.");
      return;
    }
    if (lineItems.some(item => !item.description || !item.technicianPrice)) {
      setError("Please fill in description and price for all line items.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Create a unique prefix for this quote's photos
      const quotePrefix = `q_${Date.now()}`;
      
      // Process all line items and upload their photos
      const processedLineItems = await Promise.all(lineItems.map(async (item) => {
        let uploadedUrls: string[] = [];
        if (item.photoFiles.length > 0) {
          uploadedUrls = await uploadPhotos(item.photoFiles, quotePrefix);
        }
        
        const finalComments = [...item.comments];
        if (item.newComment.trim()) {
          finalComments.push({
            author: user.displayName || user.email,
            text: item.newComment.trim(),
            timestamp: new Date().toISOString(),
            isAdmin: false
          });
        }

        return {
          id: item.id,
          description: item.description,
          technicianPrice: parseFloat(item.technicianPrice),
          adminMarkup: 0,
          photos: uploadedUrls,
          comments: finalComments
        };
      }));

      const finalOverallComments = [...overallComments];
      if (newOverallComment.trim()) {
        finalOverallComments.push({
          author: user.displayName || user.email,
          text: newOverallComment.trim(),
          timestamp: new Date().toISOString(),
          isAdmin: false
        });
      }

      // Save to Firestore
      await addDoc(collection(db, "quotes"), {
        technicianId: user.uid,
        technicianName: user.displayName || user.email,
        address,
        status: "pending",
        createdAt: serverTimestamp(),
        overallComments: finalOverallComments,
        lineItems: processedLineItems
      });

      router.push("/portal/technician");
    } catch (err: any) {
      console.error("Error submitting quote:", err);
      setError(err.message || "An error occurred while submitting the quote.");
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link href="/portal/technician" className="text-secondary hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header & Basic Info */}
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
            <h1 className="text-3xl font-bold text-primary mb-6">Create New Quote</h1>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Address / Location of Work
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                  placeholder="e.g., 645 Parker St, Oceanside, CA"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Line Items</h2>
              <button
                type="button"
                onClick={addLineItem}
                className="flex items-center text-secondary hover:text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-md"
              >
                <Plus className="w-5 h-5 mr-1" /> Add Line Item
              </button>
            </div>

            {lineItems.map((item, index) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-700">Item {index + 1}</h3>
                  {lineItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                      rows={3}
                      placeholder="Describe the work to be performed..."
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={item.technicianPrice}
                      onChange={(e) => updateLineItem(item.id, "technicianPrice", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Upload className="w-4 h-4 mr-2" /> Upload Photos
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors text-sm font-medium">
                      Select Photos
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handlePhotoSelect(item.id, e)}
                      />
                    </label>
                    <span className="text-sm text-gray-500">
                      {item.photoFiles.length} photo(s) selected
                    </span>
                  </div>
                  
                  {/* Image Previews */}
                  {item.photoFiles.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.photoFiles.map((file, fileIdx) => (
                        <div key={fileIdx} className="relative group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${fileIdx}`} 
                            className="w-20 h-20 object-cover rounded-md border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelectedPhoto(item.id, fileIdx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Line Item Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Comments on this item
                  </label>
                  <input
                    type="text"
                    value={item.newComment}
                    onChange={(e) => updateLineItem(item.id, "newComment", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary text-sm"
                    placeholder="Add a note or context for the admin about this specific item..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Overall Comments */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-300">
            <label className="block text-lg font-bold text-gray-800 mb-2">Overall Quote Comments</label>
            <textarea
              value={newOverallComment}
              onChange={(e) => setNewOverallComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
              rows={3}
              placeholder="Any general notes about this quote or the property..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-8 py-4 bg-secondary text-white text-lg font-bold rounded-md hover:bg-opacity-90 transition-all shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  Submitting Quote...
                </>
              ) : (
                <>
                  <Save className="w-6 h-6 mr-2" />
                  Submit Quote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
