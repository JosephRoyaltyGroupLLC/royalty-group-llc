"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { CheckCircle2, ChevronRight, FileText, ClipboardCheck, AlertTriangle } from "lucide-react";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form Data State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    roomPreference: "shared",
    moveInDate: "",
    specialRequirements: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add application to Firestore
      await addDoc(collection(db, "applications"), {
        ...formData,
        userId: auth.currentUser?.uid || "anonymous",
        status: "Pending",
        submittedAt: new Date().toISOString(),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex-grow flex items-center justify-center bg-muted py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8 bg-white p-12 rounded-xl shadow-2xl border-t-8 border-secondary">
          <CheckCircle2 className="mx-auto h-24 w-24 text-secondary" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary uppercase tracking-wide">Application Submitted!</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Thank you for applying to Royalty Group Homes. Our team will review your application and contact you shortly.
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="mt-8 inline-flex items-center justify-center px-10 py-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded text-primary bg-secondary hover:bg-secondary-light transition-colors shadow-md"
          >
            Go to Resident Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted pb-24">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-[#002147]/85" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <FileText className="w-16 h-16 text-secondary mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-md uppercase">
            Apply For <span className="text-secondary">Housing</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-sm font-light leading-relaxed">
            Start your journey with Royalty Group LLC today.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-3 gap-12">
          
          {/* Side Info */}
          <div className="lg:col-span-1 space-y-8">
            <div id="required-documents" className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
              <h2 className="text-xl font-extrabold text-primary mb-6 uppercase tracking-wider flex items-center gap-3">
                <ClipboardCheck className="text-secondary w-5 h-5" /> Required Documents
              </h2>
              <ul className="text-gray-600 space-y-4 text-sm font-light">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Government-issued ID</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Proof of income or benefits</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Medical clearance (if applicable)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" /> Emergency contact details</li>
              </ul>
            </div>

            <div id="application-process" className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
              <h2 className="text-xl font-extrabold text-primary mb-6 uppercase tracking-wider flex items-center gap-3">
                <AlertTriangle className="text-secondary w-5 h-5" /> Application Process
              </h2>
              <ol className="text-gray-600 space-y-4 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                  <span className="mt-0.5">Submit the online application.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                  <span className="mt-0.5">Our team reviews your submission (2-3 business days).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                  <span className="mt-0.5">Phone interview and document verification.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
                  <span className="mt-0.5">Room assignment and move-in scheduling.</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div id="online-application" className="bg-white p-10 rounded-xl shadow-xl border border-gray-100">
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-primary uppercase tracking-wider mb-8">Online Application</h2>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs font-bold uppercase tracking-wider text-gray-400 gap-2 sm:gap-0">
                  <span className={step >= 1 ? "text-secondary" : ""}>1. Personal Info</span>
                  <span className={step >= 2 ? "text-secondary" : ""}>2. Preferences</span>
                  <span className={step >= 3 ? "text-secondary" : ""}>3. Emergency Contact</span>
                </div>
                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-100 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-secondary h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* STEP 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Phone Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Date of Birth</label>
                      <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                    </div>
                  </div>
                )}

                {/* STEP 2: Housing Preferences */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Room Preference</label>
                      <select name="roomPreference" value={formData.roomPreference} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300 bg-white">
                        <option value="shared">Shared Room</option>
                        <option value="private">Private Room</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Desired Move-in Date</label>
                      <input required type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Special Requirements or Accommodations</label>
                      <textarea rows={5} name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Please detail any mobility, medical, or other specific needs..." className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300 resize-none" />
                    </div>
                  </div>
                )}

                {/* STEP 3: Emergency Contact */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Emergency Contact Name</label>
                      <input required type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Emergency Contact Phone</label>
                      <input required type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} className="block w-full rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all p-3 border border-gray-300" />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
                  {step > 1 ? (
                    <button type="button" onClick={handleBack} className="px-8 py-3 border-2 border-gray-200 rounded text-sm font-bold uppercase tracking-wider text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none transition-colors">
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button type="button" onClick={handleNext} className="px-8 py-3 border border-transparent rounded text-sm font-bold uppercase tracking-wider text-primary bg-secondary hover:bg-secondary-light focus:outline-none transition-colors shadow flex items-center gap-2">
                      Next Step <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 border border-transparent rounded text-sm font-bold uppercase tracking-wider text-white bg-primary hover:bg-[#00152e] focus:outline-none transition-colors disabled:opacity-70 shadow">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
