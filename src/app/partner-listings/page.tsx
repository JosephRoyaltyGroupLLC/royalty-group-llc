"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

export default function PartnerListingsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snap = await getDocs(collection(db, "partner_properties"));
        const data: any[] = [];
        snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
        setProperties(data);
      } catch (error) {
        console.error("Error fetching partner properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "partner_referrals"), {
        partnerId: selectedProperty.partnerId,
        propertyId: selectedProperty.id,
        propertyName: selectedProperty.name,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        setSelectedProperty(null);
        setSuccess(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to send inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Community Partner Listings</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore housing options offered by our trusted community partners across California.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Partner Properties Yet</h3>
            <p className="text-gray-500 mb-6">Check back soon for more housing options.</p>
            <Link href="/partner/register" className="px-6 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-opacity-90">
              Become a Partner
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-primary shadow">
                    Partner Property
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.name}</h3>
                  <p className="text-secondary font-semibold text-lg mb-4">{property.price}</p>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{property.description}</p>
                  
                  <div className="mb-6 space-y-2">
                    <p className="text-sm text-gray-700"><strong>Type:</strong> {property.type}</p>
                    <p className="text-sm text-gray-700"><strong>Location:</strong> {property.location}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProperty(property)}
                    className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-opacity-90 transition-colors mt-auto"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">Inquire about {selectedProperty.name}</h3>
              <button onClick={() => setSelectedProperty(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            
            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">The property partner will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="I am interested in..." className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary"></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-3 bg-secondary text-white font-bold rounded hover:bg-opacity-90 disabled:opacity-70 mt-4">
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
