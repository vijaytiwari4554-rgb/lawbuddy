import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  ShieldAlert, Upload, Users, FileText, Scale, 
  Award, TrendingUp, DollarSign, Database, CheckCircle 
} from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const Admin: React.FC = () => {
  const { userProfile } = useApp();
  
  const [activeAdminTab, setActiveAdminTab] = useState<'upload' | 'users' | 'analytics'>('upload');
  
  // Form States
  const [materialType, setMaterialType] = useState<'note' | 'paper' | 'case_law'>('note');
  const [title, setTitle] = useState("");
  const [descOrContent, setDescOrContent] = useState("");
  const [uni, setUni] = useState("Mumbai University");
  const [sem, setSem] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdminUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !descOrContent.trim()) {
      alert("Please complete all form fields!");
      return;
    }

    try {
      // Save directly to Firestore collection 'uploaded_materials'!
      await addDoc(collection(db, "uploaded_materials"), {
        title: title.trim(),
        content: descOrContent.trim(),
        materialType,
        university: uni,
        semester: Number(sem),
        uploadedAt: new Date().toISOString(),
        author: userProfile?.displayName || "Admin Moderator"
      });

      setIsSuccess(true);
      setTitle("");
      setDescOrContent("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error uploading material to Firestore:", error);
      alert("Error uploading document to database!");
    }
  };

  const usersMock = [
    { name: "Vijay Tiwari", email: "vijaytiwari4554@gmail.com", role: "admin", premium: "lifetime" },
    { name: "Anish Roy", email: "anish@gmail.com", role: "student", premium: "free" },
    { name: "Riya Sen", email: "riya@gmail.com", role: "student", premium: "pro" }
  ];

  return (
    <div id="admin-management-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="p-6 bg-red-500/10 border-2 border-red-500/25 rounded-2xl flex items-start gap-4">
        <ShieldAlert className="w-8 h-8 text-[#D4AF37] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="font-poppins text-lg font-bold text-white">LawBuddy Administration Console</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Authorized admin credentials detected for {userProfile?.displayName || "admin"}. Publish notes, previous year papers, bare acts commentaries, and track platform metrics.
          </p>
        </div>
      </div>

      {/* ADMIN TABS SELECTOR */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1E293B] pb-4">
        {[
          { id: 'upload', label: "Publish Materials", icon: Upload },
          { id: 'users', label: "Manage User Profiles", icon: Users },
          { id: 'analytics', label: "Financial Analytics", icon: TrendingUp }
        ].map((tab) => {
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
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

      {/* CORE WORKSPACE PANEL */}
      <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 min-h-[400px] shadow-xl">
        
        {/* TAB 1: UPLOAD DOCUMENTS FORM */}
        {activeAdminTab === "upload" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Publish New Study Resource</h3>
              <p className="text-xs text-slate-400 mt-1">This form pushes materials instantly to Firestore. They will appear dynamically on the academic dashboards.</p>
            </div>

            {isSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Document published successfully to LawBuddy Firestore archives!</span>
              </div>
            )}

            <form onSubmit={handleAdminUpload} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Material Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Resource Category</label>
                  <select 
                    id="admin-upload-type"
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="note">Syllabus Study Note</option>
                    <option value="paper">Previous Year Question Paper</option>
                    <option value="case_law">Landmark Case Dossier</option>
                  </select>
                </div>

                {/* University Affiliation */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">University Affiliation</label>
                  <select 
                    id="admin-upload-uni"
                    value={uni}
                    onChange={(e) => setUni(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Mumbai University">Mumbai University</option>
                    <option value="Delhi University">Delhi University</option>
                    <option value="GLC Mumbai">GLC Mumbai</option>
                    <option value="ILS Pune">ILS Pune</option>
                  </select>
                </div>

              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Document Title</label>
                <input 
                  id="admin-upload-title"
                  type="text" 
                  placeholder="e.g. Constitutional Writs of Mandamus dossier" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-600 transition-colors"
                />
              </div>

              {/* Semester */}
              <div className="space-y-1.5 w-32">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Semester</label>
                <input 
                  id="admin-upload-semester"
                  type="number" 
                  min="1" 
                  max="10" 
                  required
                  value={sem}
                  onChange={(e) => setSem(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              {/* Content text */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Document Content Body (Syllabus/Case analytical text)</label>
                <textarea 
                  id="admin-upload-body"
                  rows={6}
                  placeholder="Paste or write detailed study notes or case brief analysis here..."
                  required
                  value={descOrContent}
                  onChange={(e) => setDescOrContent(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-600 transition-colors font-mono"
                />
              </div>

              <button 
                id="admin-upload-submit"
                type="submit" 
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center space-x-1.5"
              >
                <span>Publish Document to Firestore</span>
              </button>

            </form>
          </div>
        )}

        {/* TAB 2: MANAGE USERS */}
        {activeAdminTab === "users" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Registered Student Database Profiles</h3>
              <p className="text-xs text-slate-400 mt-1">Audit active profiles and elevate testing users to Pro or Lifetime status instantly.</p>
            </div>
            <div className="border border-[#1E293B] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0B0F19] border-b border-[#1E293B] text-slate-400 uppercase font-semibold">
                    <th className="p-4">Student Profile Name</th>
                    <th className="p-4">Email Coordinates</th>
                    <th className="p-4">Role Permission</th>
                    <th className="p-4">Premium Membership Plan</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B] text-slate-300 font-medium">
                  {usersMock.map((u, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="p-4 text-white font-bold">{u.name}</td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4 uppercase text-[#D4AF37] font-bold">{u.role}</td>
                      <td className="p-4 uppercase">{u.premium} Scholar</td>
                      <td className="p-4">
                        <button 
                          onClick={() => alert(`Upgrading student "${u.name}" to Lifetime status in sandbox database.`)}
                          className="px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25 rounded hover:bg-[#D4AF37] hover:text-[#0B0F19] transition-all font-bold"
                        >
                          Upgrade Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PLATFORM SALES ANALYTICS */}
        {activeAdminTab === "analytics" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Financial Dashboard & Ingestion Metrics</h3>
              <p className="text-xs text-slate-400 mt-1">Sourced from sandbox database subscriptions records.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Total Gross Revenue", value: "₹45,890", icon: DollarSign, change: "+14.2% monthly" },
                { label: "Active Subscriptions", value: "112 Students", icon: Users, change: "+8% this week" },
                { label: "Dossiers Download Volume", value: "1,450 PDFs", icon: Database, change: "99.9% uptime" }
              ].map((metric, idx) => (
                <div key={idx} className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">{metric.label}</span>
                    <metric.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-2xl font-poppins font-black text-white">{metric.value}</span>
                    <span className="block text-[10px] text-emerald-400 font-semibold">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
