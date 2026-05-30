"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            We're here to answer any questions you have about our independent living homes. Reach out to our team today.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Office Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Headquarters</h4>
                      <p className="text-gray-600">Oceanside, CA 92054</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">info@royaltygroupllc.net</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Call Us</h4>
                      <p className="text-gray-600">Royalty Group LLC: (760) 433-8844</p>
                      <p className="text-gray-600">Joseph Surgeon: (760) 330-7447</p>
                    </div>
                  </div>

                  <div id="business-hours" className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-secondary border-b border-white/20 pb-2">Emergency Contacts</h2>
                <p className="mb-4 text-sm text-gray-300">If you are a current resident experiencing a maintenance emergency after hours, please use the resident portal or contact the emergency maintenance line provided in your welcome packet.</p>
                <p className="text-sm font-bold">For medical emergencies, please dial 911 immediately.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Contact Form</h2>
              
              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center h-full flex flex-col justify-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. A member of our team will get back to you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-primary font-medium hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input required type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input required type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary">
                      <option>General Inquiry</option>
                      <option>Housing Application Status</option>
                      <option>Schedule a Tour</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows={5} className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="w-full py-3 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Integration placeholder */}
      <section className="h-96 w-full bg-gray-300 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            <p className="font-bold">Google Maps Integration</p>
            <p className="text-sm">Interactive Map of Oceanside, CA</p>
          </div>
        </div>
      </section>
    </div>
  );
}
