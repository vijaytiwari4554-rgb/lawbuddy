import React, { useState } from "react";
import { Shield, BookOpen, AlertTriangle, FileText, Globe } from "lucide-react";

type DocType = 'privacy' | 'terms' | 'disclaimer' | 'dmca' | 'sitemap';

export const LegalDocs: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<DocType>('disclaimer');

  return (
    <div id="legal-docs-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-poppins text-3xl font-extrabold text-white">
          Platform <span className="gold-gradient-text">Compliance Documents</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review our legal status disclaimers, privacy charters, terms of use, DMCA copyright notices, and sitemap outlines.
        </p>
      </div>

      {/* COMPLIANCE DOCS SWITCHER */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#1E293B] pb-4">
        {[
          { id: 'disclaimer', label: "Indian Legal Disclaimer", icon: AlertTriangle },
          { id: 'privacy', label: "Privacy Policy", icon: Shield },
          { id: 'terms', label: "Terms of Service", icon: FileText },
          { id: 'dmca', label: "DMCA Copyright Notice", icon: BookOpen },
          { id: 'sitemap', label: "Sitemap Index", icon: Globe }
        ].map((tab) => {
          const isActive = activeDoc === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDoc(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 border ${
                isActive 
                  ? "bg-[#D4AF37] text-[#0B0F19] font-bold border-[#D4AF37]" 
                  : "bg-[#121826] text-slate-300 hover:text-white border-[#1E293B]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* THE COMPLIANCE VIEW STAGE */}
      <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 min-h-[400px] shadow-xl prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
        
        {activeDoc === "disclaimer" && (
          <div className="space-y-4">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
              <span>Mandatory Indian Legal Disclaimer</span>
            </h2>
            <div className="space-y-3 font-normal text-slate-300">
              <p>
                <strong>1. No Legal Advice Provided:</strong> The content, commentaries, study guides, revision notes, case summaries, and AI-generated outputs available on this platform (LawBuddy) are purely for academic, research, and educational purposes. Nothing on this website constitutes legal advice, solicitation, or a substitute for expert legal counsel.
              </p>
              <p>
                <strong>2. Bar Council of India Compliance:</strong> In accordance with the rules of the Bar Council of India, we do not solicit work or advertise. LawBuddy is an independent educational portal assisting law students in national LLB and Judiciary Services curriculum studies.
              </p>
              <p>
                <strong>3. AI Limitations (Gemini):</strong> Explanations provided by the LawBuddy AI assistant are synthetic, designed to simplify complex legal terminologies, and must be cross-verified with official gazettes and commentaries before academic submissions or litigation application.
              </p>
            </div>
          </div>
        )}

        {activeDoc === "privacy" && (
          <div className="space-y-4">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <span>Privacy Policy Charter</span>
            </h2>
            <div className="space-y-3 font-normal text-slate-300">
              <p>
                LawBuddy is committed to protecting your privacy credentials. This privacy policy details how we secure, process, and synchronize your account data.
              </p>
              <p>
                <strong>Data Encryption:</strong> All password details, bookmarks, and user metadata are saved securely on Firestore using Firebase's default server-side secure security rules.
              </p>
              <p>
                <strong>Analytics & Cookies:</strong> We utilize basic anonymous session cookies to maintain your login status and keep track of your active bookmarks and pdf download logs.
              </p>
            </div>
          </div>
        )}

        {activeDoc === "terms" && (
          <div className="space-y-4">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>Terms of Service Agreement</span>
            </h2>
            <div className="space-y-3 font-normal text-slate-300">
              <p>
                By accessing LawBuddy, you agree to comply with and be bound by the following terms of use conditions:
              </p>
              <p>
                <strong>Account Usage:</strong> Users are responsible for safeguarding their login credentials. Any unauthorized commercial distribution of study notes, syllabus lists, or PDFs hosted on this platform is strictly forbidden.
              </p>
              <p>
                <strong>Premium Access:</strong> Payments processed via sandbox Razorpay checkout authorize premium access to the selected scholar plan under sandbox testing terms.
              </p>
            </div>
          </div>
        )}

        {activeDoc === "dmca" && (
          <div className="space-y-4">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>DMCA Copyright Notice Policy</span>
            </h2>
            <div className="space-y-3 font-normal text-slate-300">
              <p>
                LawBuddy respects the intellectual property rights of universities and individual publishers. We host only public-domain legislative bare acts, publicly cited landmark Supreme Court judgments, and student-curated summary syllabus notes.
              </p>
              <p>
                If you are a copyright owner or an agent thereof and believe that any content on LawBuddy infringes upon your copyright rights, please contact support@lawbuddy.in with the exact resource link and proof of ownership. We will process and take down the respective content immediately within 24-48 hours.
              </p>
            </div>
          </div>
        )}

        {activeDoc === "sitemap" && (
          <div className="space-y-4">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <span>SEO Sitemap Index Outline</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {[
                { title: "Home Page", url: "/" },
                { title: "University Hubs", url: "/universities" },
                { title: "Bare Acts Library", url: "/bare-acts" },
                { title: "Case Laws dossiers", url: "/case-laws" },
                { title: "Judiciary PCS-J Prep", url: "/judiciary" },
                { title: "LawBuddy AI assistant", url: "/ai-assistant" },
                { title: "Premium Pricing Club", url: "/premium" },
                { title: "Student Journal Blog", url: "/blog" }
              ].map((link, idx) => (
                <div key={idx} className="p-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-xs font-semibold text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors">
                  <div>{link.title}</div>
                  <span className="text-[10px] text-slate-500 font-mono block">{link.url}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
