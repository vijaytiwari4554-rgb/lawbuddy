import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useApp } from "../context/AppContext";

export const Contact: React.FC = () => {
  const { isDarkMode } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !msg.trim()) {
      alert("Please fill out all mandatory fields!");
      return;
    }

    try {
      // Save directly to Firestore Support Tickets!
      await addDoc(collection(db, "support_tickets"), {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: msg.trim(),
        submittedAt: new Date().toISOString()
      });

      setIsSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMsg("");
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.error("Error creating contact ticket:", err);
      alert("Could not submit support ticket to database.");
    }
  };

  return (
    <div id="contact-page-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className={`font-poppins text-3xl sm:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
          Contact <span className="gold-gradient-text">Student Support</span>
        </h1>
        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Need help accessing your university syllabus, custom notes, or billing? Drop us a line and our legal academic team will reply within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact info */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 border rounded-2xl space-y-6 shadow-sm ${
            isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
          }`}>
            <h3 className={`font-poppins text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Office Coordinates</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Email Address</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>support@lawbuddy.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Phone Support Helpline</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Academic Headquarters</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Level 4, Imperial Legal Towers, Nariman Point, Mumbai, Maharashtra - 400021</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Preview */}
          <div className={`p-6 border rounded-2xl space-y-4 shadow-sm ${
            isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
          }`}>
            <h3 className={`font-poppins text-base font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>Quick Help Guides</span>
            </h3>
            
            <div className={`space-y-3.5 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <div className="space-y-1">
                <strong className={`block ${isDarkMode ? "text-white" : "text-slate-800"}`}>How do I download the PDF?</strong>
                <p>Visit any specific subject syllabus or question paper details, and hit the 'Download PDF' button. Your download will start instantly.</p>
              </div>

              <div className="space-y-1">
                <strong className={`block ${isDarkMode ? "text-white" : "text-slate-800"}`}>Is the Gemini AI chatbot free?</strong>
                <p>Yes! Free registered students get 10 queries per month. Upgrading to the Pro or Lifetime tier offers unrestricted AI chats.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ${
          isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
        }`}>
          <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Send an Academic Query</h3>
          
          {isSent && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Support ticket submitted successfully! Check your inbox for response.</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Full Name</label>
                <input 
                  id="contact-name-input"
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2.5 border focus:border-[#D4AF37] rounded-xl text-xs focus:outline-none placeholder-slate-500 transition-colors ${
                    isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Email Address</label>
                <input 
                  id="contact-email-input"
                  type="email" 
                  placeholder="name@gmail.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 border focus:border-[#D4AF37] rounded-xl text-xs focus:outline-none placeholder-slate-500 transition-colors ${
                    isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Topic / Subject</label>
              <input 
                id="contact-subject-input"
                type="text" 
                placeholder="e.g. Issue downloading Semester 3 BNS notes" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full px-4 py-2.5 border focus:border-[#D4AF37] rounded-xl text-xs focus:outline-none placeholder-slate-500 transition-colors ${
                  isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Your message</label>
              <textarea 
                id="contact-msg-textarea"
                rows={5}
                placeholder="Explain what you need assistance with..."
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className={`w-full px-4 py-3 border focus:border-[#D4AF37] rounded-xl text-xs focus:outline-none placeholder-slate-500 transition-colors ${
                  isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              />
            </div>

            <button 
              id="contact-submit-btn"
              type="submit" 
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit Academic Ticket</span>
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
