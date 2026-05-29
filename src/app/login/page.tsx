"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [portalType, setPortalType] = useState<"resident" | "navigator" | "admin">("resident");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      
      if (portalType === "admin") {
        // Enforce domain restriction for Admin portal
        if (!result.user.email?.endsWith("@royaltygroupllc.net")) {
          // Sign them out immediately if they don't belong
          await auth.signOut();
          setError("Access Denied. Admin portal requires a @royaltygroupllc.net email address.");
          return;
        }
        router.push("/admin");
      } else if (portalType === "resident") {
        router.push("/portal");
      } else {
        router.push("/navigator-portal");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-primary">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col space-y-2 bg-gray-100 p-2 rounded-lg sm:flex-row sm:space-y-0 sm:space-x-1">
            <button
              onClick={() => setPortalType("resident")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                portalType === "resident" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Resident
            </button>
            <button
              onClick={() => setPortalType("navigator")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                portalType === "navigator" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Navigator
            </button>
            <button
              onClick={() => setPortalType("admin")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                portalType === "admin" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-secondary group-hover:text-secondary-light" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <Link href="/" className="font-medium text-secondary hover:text-primary transition-colors">
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
