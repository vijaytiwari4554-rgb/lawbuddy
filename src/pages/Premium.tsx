import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Award, CheckCircle, HelpCircle, ShieldCheck, 
  CreditCard, Sparkles, User, ShoppingBag 
} from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const Premium: React.FC = () => {
  const { userProfile, currentUser } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'lifetime' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const plans = [
    {
      id: 'basic' as const,
      name: "Basic Access Plan",
      price: "₹299",
      period: "per month",
      desc: "Perfect for active students reviewing current semester modules.",
      benefits: [
        "Unrestricted access to all LLB Semester Notes",
        "Interactive PDF Viewer previews & bookmarks",
        "Limited LawBuddy AI Gemini Prompts (100 / mo)",
        "Download up to 10 PDF manuals offline monthly"
      ],
      popular: false
    },
    {
      id: 'pro' as const,
      name: "Professional Scholar Plan",
      price: "₹599",
      period: "per month",
      desc: "Excellent for intense Judiciary Services and core PG exam aspirants.",
      benefits: [
        "Everything in Basic Access Plan",
        "Infinite PDF Downloads offline direct",
        "Infinite LawBuddy AI Gemini Prompts",
        "Full-Length Prelims Mock Test access",
        "Comparative BNS legislations comparative matrices"
      ],
      popular: true
    },
    {
      id: 'lifetime' as const,
      name: "Lifetime Sovereignty Plan",
      price: "₹1,999",
      period: "one-time payment",
      desc: "Ultimate membership. Best for practicing lawyers and lifelong legal scholars.",
      benefits: [
        "Full lifetime access. Never renew.",
        "Everything in Pro Scholar Plan",
        "First priority Beta features",
        "Complete Legal Dossiers downloads",
        "Official printed completion certificates templates"
      ],
      popular: false
    }
  ];

  const handleCheckoutSimulation = (planId: 'basic' | 'pro' | 'lifetime') => {
    if (!currentUser) {
      alert("Please login first to purchase a LawBuddy premium subscription!");
      return;
    }
    setSelectedPlan(planId);
    setPaymentDone(false);
  };

  const executeMockPayment = async () => {
    if (!selectedPlan || !currentUser) return;
    setIsProcessing(true);

    // Simulate Razorpay Gateway API response latency
    setTimeout(async () => {
      try {
        // Update user premium status in Firestore
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          premiumStatus: selectedPlan
        });
        
        setIsProcessing(false);
        setPaymentDone(true);
        // Refresh page after a brief moment to update state
        setTimeout(() => {
          setSelectedPlan(null);
          setPaymentDone(false);
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error upgrading premium status:", error);
        setIsProcessing(false);
        alert("Payment succeeded but syncing profile failed. Contact support@lawbuddy.in");
      }
    }, 2000);
  };

  return (
    <div id="premium-membership-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Premium Membership Gate</span>
        </div>
        <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
          LawBuddy <span className="gold-gradient-text">Premium Club</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Unlock infinite knowledge boundaries. Upgrade your account today to access complete printable case dossier summaries and offline syllabus PDFs.
        </p>
      </div>

      {/* PRICING PLANS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => {
          const isUserPlan = userProfile?.premiumStatus === plan.id;
          return (
            <div 
              key={plan.id}
              className={`p-6 sm:p-8 bg-[#121826] border rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                plan.popular 
                  ? "border-[#D4AF37] shadow-[0_4px_30px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/30" 
                  : "border-[#1E293B]"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-[#D4AF37] text-[#0B0F19] text-[9px] font-black uppercase rounded-full tracking-wider">
                  Popular choice
                </span>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-poppins text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400">{plan.desc}</p>
                </div>

                <div className="flex items-baseline space-x-1.5 border-y border-[#1E293B] py-4">
                  <span className="text-4xl font-poppins font-black text-white">{plan.price}</span>
                  <span className="text-xs font-semibold text-slate-500">{plan.period}</span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3.5 text-xs font-medium text-slate-300">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {isUserPlan ? (
                  <div className="w-full py-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center rounded-xl uppercase tracking-wider">
                    Your Current Active Plan ✓
                  </div>
                ) : (
                  <button
                    onClick={() => handleCheckoutSimulation(plan.id)}
                    className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-center transition-all ${
                      plan.popular 
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B0F19] shadow-lg" 
                        : "bg-[#0B0F19] border border-[#1E293B] hover:border-[#D4AF37]/30 text-slate-300 hover:text-white"
                    }`}
                  >
                    Get Started Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RAZORPAY CHECKOUT INTERACTIVE SIMULATOR GATEWAY OVERLAY MODAL */}
      {selectedPlan && (
        <div id="razorpay-gateway-modal" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121826] border-2 border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Razorpay Brand Header */}
            <div className="bg-[#111726] border-b border-[#1E293B] p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Razorpay Gateway</h3>
                  <span className="text-[10px] text-slate-400 font-semibold">Secure Transaction for LawBuddy</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/10"
              >
                Cancel
              </button>
            </div>

            {/* Simulated Checkout Body */}
            <div className="p-6 space-y-6">
              {paymentDone ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-poppins text-lg font-bold text-white">Payment Successful!</h4>
                    <p className="text-xs text-slate-400">Upgraded to {selectedPlan.toUpperCase()} Scholar Access.</p>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Synchronizing Firestore credentials...</span>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="block text-slate-500 uppercase font-bold">Selected Subscription</span>
                      <span className="text-white font-bold text-sm uppercase">{selectedPlan} Access Plan</span>
                    </div>
                    <span className="text-[#D4AF37] font-extrabold text-lg">
                      {selectedPlan === 'basic' ? "₹299" : selectedPlan === 'pro' ? "₹599" : "₹1,999"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Simulated Card Details</span>
                    <div className="space-y-2">
                      <input 
                        id="razorpay-card-num"
                        type="text" 
                        value="4111 •••• •••• 1111" 
                        disabled
                        className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-xs text-slate-400 font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          id="razorpay-card-expiry"
                          type="text" 
                          value="12/29" 
                          disabled
                          className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-xs text-slate-400 font-mono"
                        />
                        <input 
                          id="razorpay-card-cvv"
                          type="text" 
                          value="•••" 
                          disabled
                          className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-xs text-slate-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={executeMockPayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <span>Processing Payment gateway...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authorize & Pay with Razorpay</span>
                      </>
                    )}
                  </button>

                  <span className="text-[9px] text-slate-500 text-center block leading-relaxed">
                    By confirming, you authorize Razorpay to run a sandbox payment testing module. No real money is transferred. Your profile status updates immediately.
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
