"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function PartnerRegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if partner document already exists to avoid overwriting
      const docRef = doc(db, "partners", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // 2. Save new Partner Info in Firestore
        const names = user.displayName?.split(" ") || ["", ""];
        await setDoc(docRef, {
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: user.email,
          companyName: companyName,
          subscriptionStatus: "inactive",
          createdAt: serverTimestamp()
        });
      }

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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" 
              placeholder="e.g. Acme Properties LLC"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors mt-6"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-secondary group-hover:text-secondary-light" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </span>
            {loading ? "Creating Account..." : "Register with Google & Start Trial"}
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">You will authenticate with Google, then be redirected to Stripe securely to enter payment details. You will not be charged until the end of your 30-day trial.</p>
        </form>
      </div>
    </div>
  );
}
