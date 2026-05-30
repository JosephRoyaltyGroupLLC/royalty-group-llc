"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

export default function NewPartnerProperty() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    type: "Shared & Private",
    price: "",
    location: "",
    amenities: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "partners", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.subscriptionStatus === "active" || data.subscriptionStatus === "trialing") {
            setUser(currentUser);
          } else {
            router.push("/partner");
          }
        } else {
          router.push("/partner");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const amenitiesArray = formData.amenities.split(",").map(a => a.trim()).filter(a => a);
      
      await addDoc(collection(db, "partner_properties"), {
        partnerId: user.uid,
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        type: formData.type,
        price: formData.price,
        location: formData.location,
        amenities: amenitiesArray,
        description: formData.description,
        image: formData.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
        createdAt: serverTimestamp()
      });

      router.push("/partner");
    } catch (error) {
      console.error(error);
      alert("Failed to add property.");
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-4">List a New Property</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. 123 Main St House" className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary">
                <option value="Shared & Private">Shared & Private</option>
                <option value="Shared Only">Shared Only</option>
                <option value="Private Only">Private Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Info</label>
              <input required type="text" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. $1,100 Shared / $1,800 Private" className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="123 Main St, City, CA 90000" className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            <p className="text-xs text-gray-500 mt-1">Leave blank to use a default placeholder image.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (Comma separated)</label>
            <input required type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="High-Speed Wi-Fi, Large Backyard, On-site Laundry" className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the property, community rules, etc." className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary"></textarea>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
            <button type="button" onClick={() => router.push("/partner")} className="px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={submitting} className="px-6 py-2 bg-secondary text-white font-bold rounded hover:bg-opacity-90 disabled:opacity-70">
              {submitting ? "Saving..." : "List Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
