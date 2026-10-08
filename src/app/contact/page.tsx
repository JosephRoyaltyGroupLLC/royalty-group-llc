"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MapPin, Mail, Phone, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        status: "Unread",
        createdAt: serverTimestamp()
      });
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus("idle");
      alert("Failed to submit message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted pb-24">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md uppercase">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed max-w-2xl">
            We're here to answer any questions you have about our services across all of our divisions. Reach out to our team today.
          </p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-primary">
                <h2 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider">Office Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-4 rounded-full mr-5">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Headquarters</h4>
                      <p className="text-gray-600 font-light">Oceanside, CA 92054</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-4 rounded-full mr-5">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Email Us</h4>
                      <p className="text-gray-600 font-light">info@royaltygroupllc.net</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-4 rounded-full mr-5">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Call Us</h4>
                      <p className="text-gray-600 font-light">Royalty Group LLC: (760) 248-8331</p>
                      <p className="text-gray-600 font-light">Joseph Surgeon: (760) 330-7447</p>
                    </div>
                  </div>

                  <div id="business-hours" className="flex items-start">
                    <div className="bg-secondary/10 p-4 rounded-full mr-5">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">Business Hours</h4>
                      <p className="text-gray-600 font-light">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600 font-light">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-10 rounded-xl shadow-xl border-l-4 border-secondary flex gap-6 items-start">
                <AlertTriangle className="w-12 h-12 text-secondary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-extrabold mb-4 uppercase tracking-wider text-secondary">Emergency Contacts</h2>
                  <p className="mb-4 text-gray-300 font-light leading-relaxed">If you are a current resident experiencing a maintenance emergency after hours, please use the resident portal or contact the emergency maintenance line provided in your welcome packet.</p>
                  <p className="font-bold uppercase tracking-wide text-sm">For medical emergencies, please dial 911 immediately.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-secondary">
              <h2 className="text-2xl font-extrabold text-primary mb-8 uppercase tracking-wider border-b border-gray-100 pb-4">Send us a Message</h2>
              
              {status === "success" ? (
                <div className="bg-green-50 border-2 border-green-200 text-green-800 p-10 rounded-xl text-center h-full flex flex-col justify-center items-center">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                  <h3 className="text-2xl font-extrabold mb-3 uppercase tracking-wide">Message Sent!</h3>
                  <p className="font-light">Thank you for reaching out. A member of our team will get back to you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 text-secondary font-bold uppercase tracking-wider hover:text-secondary-light transition-colors">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Service / Division of Interest</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all bg-white">
                      <option>General Inquiry</option>
                      <option>Royalty Group Homes (Housing & Properties)</option>
                      <option>Royalty Group Contracting</option>
                      <option>Royalty Group Cleaning</option>
                      <option>Royalty Group Maintenance</option>
                      <option>Royalty Group AI</option>
                      <option>Royalty Group Information Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="w-full py-4 px-4 bg-primary text-secondary font-bold uppercase tracking-wider rounded shadow hover:bg-[#00152e] transition-colors disabled:opacity-70 mt-4"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
