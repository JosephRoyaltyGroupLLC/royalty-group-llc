"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewMaintenanceRequest() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Routine",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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
    setError("");

    try {
      await addDoc(collection(db, "maintenance_requests"), {
        userId: user.uid,
        userEmail: user.email,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      router.push("/portal");
    } catch (err: any) {
      console.error("Error submitting maintenance request:", err);
      setError("Failed to submit request. Please try again later.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-grow bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/portal" className="text-primary hover:underline flex items-center">
            &larr; Back to Portal
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
          <h2 className="text-2xl font-bold text-primary mb-6">Submit Maintenance Request</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Summary
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Leaking kitchen sink"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary transition-colors"
              >
                <option value="Routine">Routine (Non-emergency)</option>
                <option value="Urgent">Urgent (Requires prompt attention)</option>
                <option value="Emergency">Emergency (Immediate risk to property or safety)</option>
              </select>
              {formData.priority === "Emergency" && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  If this is a life-threatening emergency, please call 911 immediately.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the issue in detail, including location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary transition-colors"
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
                  submitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
