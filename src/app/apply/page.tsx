"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

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
      <div className="flex-grow flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8 bg-white p-12 rounded-xl shadow-2xl border-t-8 border-secondary">
          <svg className="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-extrabold text-primary">Application Submitted!</h2>
          <p className="text-lg text-gray-600">
            Thank you for applying to Royalty Group Homes. Our team will review your application and contact you shortly.
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Go to Resident Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Apply For Housing</h1>
          <p className="text-xl text-gray-300">
            Start your journey with Royalty Group LLC today.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-8">
          
          {/* Side Info */}
          <div className="lg:col-span-1 space-y-8">
            <div id="required-documents" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Required Documents</h2>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Government-issued ID</li>
                <li>• Proof of income or benefits</li>
                <li>• Medical clearance (if applicable)</li>
                <li>• Emergency contact details</li>
              </ul>
            </div>

            <div id="application-process" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Application Process</h2>
              <ol className="text-gray-600 space-y-3 text-sm list-decimal list-inside">
                <li>Submit the online application.</li>
                <li>Our team reviews your submission (2-3 business days).</li>
                <li>Phone interview and document verification.</li>
                <li>Room assignment and move-in scheduling.</li>
              </ol>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div id="online-application" className="bg-white p-8 rounded-xl shadow-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-primary text-center">Online Application</h2>
                <div className="mt-4 flex justify-between items-center text-sm font-medium text-gray-500">
                  <span className={step >= 1 ? "text-secondary" : ""}>1. Personal Info</span>
                  <span className={step >= 2 ? "text-secondary" : ""}>2. Housing Preferences</span>
                  <span className={step >= 3 ? "text-secondary" : ""}>3. Emergency Contact</span>
                </div>
                {/* Progress Bar */}
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                    </div>
                  </div>
                )}

                {/* STEP 2: Housing Preferences */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Room Preference</label>
                      <select name="roomPreference" value={formData.roomPreference} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border">
                        <option value="shared">Shared Room</option>
                        <option value="private">Private Room</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Desired Move-in Date</label>
                      <input required type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Requirements or Accommodations</label>
                      <textarea rows={4} name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Please detail any mobility, medical, or other specific needs..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                    </div>
                  </div>
                )}

                {/* STEP 3: Emergency Contact */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                      <input required type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                      <input required type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                  {step > 1 ? (
                    <button type="button" onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button type="button" onClick={handleNext} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-light focus:outline-none transition-colors">
                      Next Step
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none transition-colors disabled:opacity-70">
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
