"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [portalType, setPortalType] = useState<"resident" | "navigator" | "partner" | "admin">("resident");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRouting = async (userEmail: string | null) => {
    if (portalType === "admin") {
      // Enforce domain restriction for Admin portal
      if (!userEmail?.endsWith("@royaltygroupllc.net")) {
        // Sign them out immediately if they don't belong
        await auth.signOut();
        throw new Error("Access Denied. Admin portal requires a @royaltygroupllc.net email address.");
      }
      router.push("/admin");
    } else if (portalType === "partner") {
      router.push("/partner");
    } else if (portalType === "resident") {
      router.push("/portal");
    } else {
      router.push("/navigator-portal");
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await handleRouting(result.user.email);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await handleRouting(result.user.email);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("Access Denied")) {
        setError(err.message);
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account already exists with this email.");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(isLogin ? "Failed to sign in. Please check your credentials." : "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await handleRouting(result.user.email);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("Access Denied")) {
         setError(err.message);
      } else {
         setError("Failed to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-primary">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to access your dashboard." : "Sign up to get started."}
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
              onClick={() => setPortalType("partner")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                portalType === "partner" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Partner
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
          
          <form className="space-y-4" onSubmit={handleEmailAuth}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" 
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-secondary focus:border-secondary" 
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="text-center text-sm">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); }} 
              className="text-secondary hover:text-secondary-dark transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </span>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <Link href="/" className="font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
