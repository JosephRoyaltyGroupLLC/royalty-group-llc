"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function NewNavigatorReferral() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientDob: "",
    clientSsiSsdi: false,
    clientIncome: "",
    roomPreference: "shared",
    specialRequirements: "",
    navigatorNotes: "",
    clientHasPayee: false,
    payeeDuration: "",
    payeeRentPercentage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "navigator_referrals"), {
        ...formData,
        navigatorId: auth.currentUser?.uid || "anonymous",
        navigatorName: auth.currentUser?.displayName || "Unknown",
        navigatorEmail: auth.currentUser?.email || "Unknown",
        status: "Pending Review",
        submittedAt: new Date().toISOString(),
      });
      router.push("/navigator-portal");
    } catch (error) {
      console.error("Error submitting referral:", error);
      alert("There was an error submitting the request. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-primary mb-2">New Housing Request</h2>
          <p className="text-gray-600 mb-8 pb-6 border-b border-gray-100">
            Submit a request on behalf of your client. Our intake team will review this request and contact you directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Client Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client First Name</label>
                <input required type="text" name="clientFirstName" value={formData.clientFirstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Last Name</label>
                <input required type="text" name="clientLastName" value={formData.clientLastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Date of Birth</label>
                <input required type="date" name="clientDob" value={formData.clientDob} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Income Estimate</label>
                <input required type="text" name="clientIncome" placeholder="$2,500" value={formData.clientIncome} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input type="checkbox" name="clientSsiSsdi" checked={formData.clientSsiSsdi} onChange={handleChange} className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-700">
                Client receives SSI, SSDI, or other secured income covering rent + $300 excess
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" name="clientHasPayee" checked={formData.clientHasPayee} onChange={handleChange} className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-700">
                Client has a Payee
              </label>
            </div>

            {formData.clientHasPayee && (
              <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700">How long will the payee provide rent payments?</label>
                  <input type="text" name="payeeDuration" placeholder="e.g., 12 months, indefinitely" value={formData.payeeDuration} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Percentage of rent covered by payee</label>
                  <input type="text" name="payeeRentPercentage" placeholder="e.g., 100%, 50%" value={formData.payeeRentPercentage} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border" />
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-800 pt-6 border-t border-gray-100">Housing Preferences</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Room Preference</label>
              <select name="roomPreference" value={formData.roomPreference} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border">
                <option value="shared">Shared Room</option>
                <option value="private">Private Room</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Accommodations (Accessibility, Medical, etc.)</label>
              <textarea rows={3} name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Navigator Notes</label>
              <textarea rows={3} name="navigatorNotes" value={formData.navigatorNotes} onChange={handleChange} placeholder="Any specific background or notes for the intake team..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"></textarea>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 gap-4">
              <button type="button" onClick={() => router.push("/navigator-portal")} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none transition-colors disabled:opacity-70">
                {isSubmitting ? "Submitting..." : "Submit Housing Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
