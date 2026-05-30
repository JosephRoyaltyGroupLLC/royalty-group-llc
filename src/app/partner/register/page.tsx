"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // 2. Save Partner Info in Firestore
      await setDoc(doc(db, "partners", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
        subscriptionStatus: "inactive",
        createdAt: serverTimestamp()
      });

      // 3. Initiate Stripe Checkout for 30-Day Free Trial
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          returnUrl: `${window.location.origin}/partner`
        })
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to initiate checkout");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to register account.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Partner Registration</h1>
          <p className="text-gray-600">List your properties with Royalty Group LLC. $9.99/mo after a 30-day free trial.</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" name="password" minLength={6} value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-secondary text-white font-bold rounded hover:bg-opacity-90 transition-colors disabled:opacity-70 mt-6"
          >
            {loading ? "Creating Account..." : "Start 30-Day Free Trial"}
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">You will be redirected to Stripe securely to enter payment details. You will not be charged until the end of your 30-day trial.</p>
        </form>
      </div>
    </div>
  );
}
