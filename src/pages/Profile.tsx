import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  User, Bookmark, Download, Award, ShieldAlert, 
  Settings, CheckCircle, Flame, LogOut, BookOpen, Trash2 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const Profile: React.FC = () => {
  const { userProfile, bookmarks, removeBookmark, downloads, currentUser } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userProfile?.displayName || "");
  const navigate = useNavigate();

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newDisplayName.trim()) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        displayName: newDisplayName.trim()
      });
      setEditingName(false);
      alert("Display name updated successfully! Please refresh or wait a moment for sync.");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile display name:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div id="student-profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. PROFILE TOP BAR BRIEF */}
      <div className="p-8 rounded-3xl bg-[#121826] border border-[#1E293B] relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none rounded-full" />
        
        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center text-white text-3xl font-bold font-poppins overflow-hidden">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="User profile avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                userProfile?.displayName ? userProfile.displayName[0].toUpperCase() : "U"
              )}
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              {editingName ? (
                <form onSubmit={handleUpdateName} className="flex gap-2">
                  <input 
                    id="edit-name-input"
                    type="text" 
                    value={newDisplayName} 
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="px-3 py-1 bg-[#0B0F19] border border-[#1E293B] rounded-lg text-xs text-white focus:outline-none"
                    autoFocus
                  />
                  <button type="submit" className="px-3 py-1 bg-[#D4AF37] text-[#0B0F19] rounded-lg text-[10px] font-bold">Save</button>
                  <button type="button" onClick={() => setEditingName(false)} className="px-2 py-1 bg-white/10 text-white rounded-lg text-[10px]">Cancel</button>
                </form>
              ) : (
                <h2 className="font-poppins text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>{userProfile?.displayName || "Anonymous Scholar"}</span>
                  <button 
                    id="edit-name-btn"
                    onClick={() => {
                      setNewDisplayName(userProfile?.displayName || "");
                      setEditingName(true);
                    }}
                    className="p-1 hover:text-[#D4AF37] text-slate-500"
                    title="Edit Name"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </h2>
              )}
              
              <span className="px-2.5 py-0.5 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[9px] font-black uppercase rounded-full tracking-wider">
                {userProfile?.premiumStatus} Scholar
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentUser?.email || "Guest user Mode"}</p>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Joined {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "recently"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10 flex-shrink-0">
          {userProfile?.role === "admin" && (
            <Link 
              id="profile-admin-panel"
              to="/admin" 
              className="px-4 py-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white"
            >
              Open Admin Board
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Account</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN GRID METRICS & INTERACTIVE BOOKMARKS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left pane details: Bookmarks */}
        <div className="lg:col-span-2 bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="font-poppins text-lg font-bold text-white flex items-center gap-2 border-b border-[#1E293B] pb-4">
            <Bookmark className="w-5 h-5 text-[#D4AF37]" />
            <span>Your Bookmarked Resources ({bookmarks.length})</span>
          </h3>

          <div className="space-y-4">
            {bookmarks.map((bmark) => (
              <div 
                key={bmark.id}
                className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[9px] text-[#D4AF37] font-extrabold uppercase tracking-widest">{bmark.itemType.replace("_", " ")}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{bmark.itemTitle}</h4>
                  <span className="text-[10px] text-slate-500 block">{bmark.itemSubtitle}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link 
                    to={bmark.itemType === 'case_law' ? '/case-laws' : bmark.itemType === 'bare_act_section' ? '/bare-acts' : '/universities'}
                    className="px-3 py-1.5 bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/50 rounded-lg text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => removeBookmark(bmark.id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {bookmarks.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-xs border border-dashed border-[#1E293B] rounded-2xl">
                <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <span>You have no active bookmarks yet. Go explore Bare Acts and LLB Notes to save them here!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right pane: Download History / metrics */}
        <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 space-y-6">
          <h3 className="font-poppins text-lg font-bold text-white flex items-center gap-2 border-b border-[#1E293B] pb-4">
            <Download className="w-5 h-5 text-[#D4AF37]" />
            <span>Download Log history ({downloads.length})</span>
          </h3>

          <div className="space-y-3">
            {downloads.map((dl) => (
              <div 
                key={dl.id}
                className="p-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-300 line-clamp-1">{dl.itemTitle}</h4>
                  <span className="text-[9px] text-slate-500">{new Date(dl.downloadedAt).toLocaleDateString()}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Success ✓</span>
              </div>
            ))}

            {downloads.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs">
                <span>No PDF download histories recorded yet.</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
