"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, UserPlus, AlertCircle, Home } from "lucide-react";

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
    <div className="flex-grow flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl relative z-10 border-t-8 border-primary">
        <div className="text-center">
          <Link href="/" className="inline-flex justify-center items-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary hover:bg-primary hover:text-white transition-colors">
            <Home size={32} />
          </Link>
          <h2 className="text-3xl font-extrabold text-primary uppercase tracking-wide">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-light">
            {isLogin ? "Sign in to access your dashboard and tools." : "Sign up to get started with Royalty Group LLC."}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded-xl sm:flex-row sm:space-y-0 sm:space-x-1 border border-gray-100">
            <button
              onClick={() => setPortalType("resident")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                portalType === "resident" 
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Resident
            </button>
            <button
              onClick={() => setPortalType("navigator")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                portalType === "navigator" 
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Navigator
            </button>
            <button
              onClick={() => setPortalType("partner")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                portalType === "partner" 
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Partner
            </button>
            <button
              onClick={() => setPortalType("admin")}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                portalType === "admin" 
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleEmailAuth}>
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" 
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" 
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-md text-white bg-primary hover:bg-[#00152e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md disabled:opacity-70 mt-2"
            >
              {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
              {loading ? "Processing..." : (isLogin ? "Sign In Securely" : "Create Account")}
            </button>
          </form>

          <div className="text-center text-sm pt-2">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); }} 
              className="text-secondary hover:text-primary transition-colors font-bold uppercase tracking-wider text-xs"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                <span className="px-4 bg-white text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-3 py-4 px-4 border-2 border-gray-200 text-sm font-bold uppercase tracking-wider rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
