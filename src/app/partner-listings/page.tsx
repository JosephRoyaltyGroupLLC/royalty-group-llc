"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { CheckCircle2, Handshake, MapPin } from "lucide-react";

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
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pb-24 relative">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <Handshake className="w-16 h-16 text-secondary mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md uppercase">
            Partner <span className="text-secondary">Listings</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed max-w-2xl">
            Explore housing options offered by our trusted community partners across California.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {properties.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl shadow-lg border-t-4 border-secondary">
            <h3 className="text-3xl font-extrabold text-primary mb-4 uppercase tracking-wider">No Partner Properties Yet</h3>
            <p className="text-gray-500 mb-8 text-lg font-light">Check back soon for more housing options from our network.</p>
            <Link href="/partner/register" className="px-8 py-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors">
              Become a Partner
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-secondary text-primary px-4 py-2 rounded text-xs font-bold shadow uppercase tracking-wider">
                    Partner Property
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-2">{property.name}</h3>
                  <div className="flex items-center text-gray-500 mb-6 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    {property.location}
                  </div>
                  <p className="text-xl font-bold text-primary mb-4 border-b border-gray-100 pb-4">{property.price}</p>
                  <p className="text-gray-600 mb-6 flex-grow font-light leading-relaxed line-clamp-3">{property.description}</p>
                  
                  <div className="mb-8 space-y-3 p-4 bg-muted rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary" /> <span className="font-bold text-primary">Type:</span> {property.type}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProperty(property)}
                    className="w-full py-4 bg-primary text-white font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors mt-auto"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-t-4 border-secondary">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-muted/50">
              <h3 className="text-xl font-bold text-primary uppercase tracking-wide">Inquire about {selectedProperty.name}</h3>
              <button onClick={() => setSelectedProperty(null)} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light">&times;</button>
            </div>
            
            <div className="p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-primary mb-2 uppercase tracking-wide">Message Sent!</h4>
                  <p className="text-gray-600 font-light">The property partner will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">First Name</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Last Name</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="I am interested in..." className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-4 bg-secondary text-primary font-bold uppercase tracking-wider rounded shadow hover:bg-secondary-light disabled:opacity-70 mt-6 transition-colors">
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
