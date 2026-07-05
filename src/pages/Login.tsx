import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { Mail, Lock, User, Sparkles, Scale, Chrome } from "lucide-react";

export const Login: React.FC = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // If user is already logged in, redirect them to dashboard
  React.useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSuccess(false);

    try {
      if (isRegistering) {
        if (!email.trim() || !password.trim()) {
          setError("Please complete all fields!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! Syncing profile dashboard now.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful! Welcome back to LawBuddy.");
      }
      navigate("/profile");
    } catch (err: any) {
      console.error("Authentication Error:", err);
      setError(err.message || "An authentication error occurred.");
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/profile");
    } catch (err: any) {
      console.error("Google Authentication Error:", err);
      setError(err.message || "Could not sign in with Google.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please provide your email address in the field first.");
      return;
    }
    setError("");
    setResetSuccess(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not send password reset email.");
    }
  };

  return (
    <div id="login-page-container" className="max-w-md mx-auto px-4 py-16">
      
      <div className="bg-[#121826] border-2 border-[#D4AF37]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none" />

        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center mx-auto mb-4">
            <Scale className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-poppins text-2xl font-black text-white">
            {isRegistering ? "Create LawBuddy Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegistering ? "Join thousands of legal scholars in India" : "Sign in to resume studying your LLB notes"}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Success Reset password */}
        {resetSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium">
            ✓ Password reset email sent! Check your inbox.
          </div>
        )}

        {/* EMAIL FORM */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          
          {isRegistering && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input 
                  id="login-name-input"
                  type="text" 
                  placeholder="Your Name" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input 
                id="login-email-input"
                type="email" 
                placeholder="you@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Password</label>
              {!isRegistering && (
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-[10px] text-[#D4AF37] font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input 
                id="login-password-input"
                type="password" 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <button 
            id="login-submit-btn"
            type="submit" 
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
          >
            {isRegistering ? "Register Account" : "Sign In with Email"}
          </button>

        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#1E293B]" />
          <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-bold uppercase">or continue with</span>
          <div className="flex-grow border-t border-[#1E293B]" />
        </div>

        {/* GOOGLE POPUP LOGIN */}
        <button
          onClick={handleGoogleAuth}
          className="w-full py-2.5 bg-[#0B0F19] border border-[#1E293B] hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2.5 transition-all"
        >
          <Chrome className="w-4 h-4 text-[#D4AF37]" />
          <span>Authenticate with Google Securely</span>
        </button>

        {/* Toggle Account Type links */}
        <div className="text-center text-xs text-slate-400">
          {isRegistering ? (
            <span>Already have an account? <button onClick={() => setIsRegistering(false)} className="text-[#D4AF37] font-bold hover:underline">Sign In</button></span>
          ) : (
            <span>Don't have an account? <button onClick={() => setIsRegistering(true)} className="text-[#D4AF37] font-bold hover:underline">Register</button></span>
          )}
        </div>

      </div>

    </div>
  );
};
