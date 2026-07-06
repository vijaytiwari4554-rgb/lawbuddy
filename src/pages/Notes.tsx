import React, { useState } from "react";
import { Search, Filter, BookOpen, Download, Eye, Bookmark, Lock, ArrowUpDown, Sparkles } from "lucide-react";
import { UNIVERSITIES, SUBJECT_TOPICS } from "../data/legalData";
import { useApp } from "../context/AppContext";

interface NotesMock {
  id: string;
  title: string;
  subject: string;
  university: string;
  semester: number;
  author: string;
  isPremium?: boolean;
}

export const Notes: React.FC = () => {
  const { recordDownload, addBookmark, isBookmarked, isDarkMode } = useApp();
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState<boolean>(false);

  // Notes Mock Data covering different semesters and universities
  const notesMock: NotesMock[] = [
    { id: "n1", title: "Standard Form Contracts and Boilerplate terms", subject: "Law of Contracts - I", university: "Mumbai University", semester: 1, author: "Prof. S. R. Sen", isPremium: false },
    { id: "n2", title: "The impact of minors entering into legal covenants (Mohori Bibee case)", subject: "Law of Contracts - I", university: "Mumbai University", semester: 1, author: "Dr. Aditya Mehta", isPremium: false },
    { id: "n3", title: "Landmark Expansion of Article 21 and Golden Triangle", subject: "Constitutional Law - I", university: "Delhi University", semester: 1, author: "Hon. Justice V. K. Rao", isPremium: true },
    { id: "n4", title: "Detailed Guide to Constitutional Writs in India", subject: "Constitutional Law - I", university: "Delhi University", semester: 1, author: "Dr. Radhika Roy", isPremium: false },
    { id: "n5", title: "Unpacking Strict Liability vs Absolute Liability (M.C. Mehta case)", subject: "Law of Torts & Consumer Protection", university: "Pune University (SPPU Faculty of Law)", semester: 2, author: "Prof. Amit Shinde", isPremium: false },
    { id: "n6", title: "Essentials of Negligence and Res Ipsa Loquitur", subject: "Law of Torts & Consumer Protection", university: "Pune University (SPPU Faculty of Law)", semester: 2, author: "Prof. Amit Shinde", isPremium: true },
    { id: "n7", title: "Mens Rea and Statutory Exceptions in Crimes", subject: "Law of Crimes - I", university: "RTMNU (Rashtrasant Tukadoji Maharaj Nagpur University)", semester: 2, author: "Dr. Jayant Patil", isPremium: false },
    { id: "n8", title: "General Defences under IPC / BNS (Private Defence)", subject: "Law of Crimes - I", university: "RTMNU (Rashtrasant Tukadoji Maharaj Nagpur University)", semester: 2, author: "Dr. Jayant Patil", isPremium: true },
    { id: "n9", title: "Administrative Discretion and Principles of Natural Justice", subject: "Administrative Law", university: "SNDT Women's University (Law School)", semester: 3, author: "Dean Meera Sen", isPremium: false },
    { id: "n10", title: "Judicial Review of Administrative Action (Doctrine of Wednesbury Unreasonableness)", subject: "Administrative Law", university: "SNDT Women's University (Law School)", semester: 3, author: "Dean Meera Sen", isPremium: true },
    { id: "n11", title: "Essentials of a Valid Hindu Marriage (Section 5 Hindu Marriage Act)", subject: "Family Law - I", university: "Banaras Hindu University (Faculty of Law)", semester: 3, author: "Dr. Ram Shastri", isPremium: false },
    { id: "n12", title: "Concept of Coparcenary and Partition under Mitakshara School", subject: "Family Law - I", university: "Banaras Hindu University (Faculty of Law)", semester: 3, author: "Dr. Ram Shastri", isPremium: true }
  ];

  const handleDownload = (id: string, title: string) => {
    recordDownload(id, 'note', title);
    alert(`Downloading "${title}" study notes PDF successfully!`);
  };

  const handleBookmarkToggle = (note: NotesMock) => {
    const itemId = `note-doc-${note.id}`;
    const bookmarked = isBookmarked(itemId, 'note');
    if (bookmarked) {
      alert("This document is already bookmarked in your Profile!");
    } else {
      addBookmark(itemId, 'note', note.title, `${note.subject} • Sem ${note.semester}`);
      alert(`"${note.title}" bookmarked successfully!`);
    }
  };

  // Filtering
  const filteredNotes = notesMock.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = selectedSemester === "All" || note.semester.toString() === selectedSemester;
    const matchesUni = selectedUniversity === "All" || note.university.includes(selectedUniversity);
    const matchesPremium = !showPremiumOnly || note.isPremium === true;

    return matchesSearch && matchesSemester && matchesUni && matchesPremium;
  });

  return (
    <div id="notes-library-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Legal Dossiers</span>
        </div>
        <h1 className={`font-poppins text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
          Syllabus-Aligned <span className="gold-gradient-text">LLB & Semester Notes</span>
        </h1>
        <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Premium academic drafts and summaries aligned to major Indian law colleges and universities. All files are updated for BNS 2023.
        </p>
      </div>

      {/* Filters Area */}
      <div className={`p-6 border rounded-2xl space-y-4 shadow-xl ${
        isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Search bar */}
          <div className="md:col-span-2 relative w-full">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input 
              id="notes-search-input"
              type="text" 
              placeholder="Search by topic, university, subject or professor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border focus:border-[#D4AF37] rounded-xl text-xs sm:text-sm focus:outline-none transition-colors ${
                isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          {/* Semester select */}
          <div className={`flex items-center space-x-2 border px-3 py-2 rounded-xl ${
            isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
          }`}>
            <span className="text-[10px] text-slate-500 font-bold uppercase whitespace-nowrap">Semester:</span>
            <select 
              id="notes-filter-semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className={`w-full bg-transparent text-xs sm:text-sm focus:outline-none ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              <option value="All" className={isDarkMode ? "bg-[#121826] text-white" : "bg-white text-slate-800"}>All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s} className={isDarkMode ? "bg-[#121826] text-white" : "bg-white text-slate-800"}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* University select */}
          <div className={`flex items-center space-x-2 border px-3 py-2 rounded-xl ${
            isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
          }`}>
            <span className="text-[10px] text-slate-500 font-bold uppercase whitespace-nowrap">University:</span>
            <select 
              id="notes-filter-uni"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className={`w-full bg-transparent text-xs sm:text-sm focus:outline-none ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              <option value="All" className={isDarkMode ? "bg-[#121826] text-white" : "bg-white text-slate-800"}>All Universities</option>
              {UNIVERSITIES.map((uni) => (
                <option key={uni.id} value={uni.name} className={isDarkMode ? "bg-[#121826] text-white" : "bg-white text-slate-800"}>{uni.shortName}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Premium Checkbox Toggle */}
        <div className={`flex items-center justify-between pt-2 border-t ${isDarkMode ? "border-[#1E293B]/60" : "border-slate-100"}`}>
          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
            <input 
              id="premium-only-toggle"
              type="checkbox" 
              checked={showPremiumOnly}
              onChange={(e) => setShowPremiumOnly(e.target.checked)}
              className={`w-4 h-4 accent-[#D4AF37] rounded focus:ring-0 ${isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"}`}
            />
            <span className={`text-xs font-semibold flex items-center gap-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Show Premium Locked Notes Only</span>
            </span>
          </label>
          <span className="text-xs text-slate-500 font-medium">{filteredNotes.length} resources found</span>
        </div>
      </div>

      {/* Grid of Notes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => {
          const isBook = isBookmarked(`note-doc-${note.id}`, 'note');
          return (
            <div 
              key={note.id} 
              className={`p-6 border hover:border-[#D4AF37]/45 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group ${
                isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      Sem {note.semester} • {note.subject}
                    </span>
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {note.university}
                    </span>
                  </div>
                  {note.isPremium ? (
                    <span className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded bg-emerald-500/5">
                      Free
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className={`font-poppins text-lg font-bold group-hover:text-[#D4AF37] transition-colors leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {note.title}
                  </h3>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Syllabus commentary curated by <span className={isDarkMode ? "text-slate-300 font-medium" : "text-slate-700 font-medium"}>{note.author}</span>. Contains structural summaries and key case ratio citations.
                  </p>
                </div>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center justify-between gap-2 ${isDarkMode ? "border-[#1E293B]" : "border-slate-100"}`}>
                <button 
                  onClick={() => handleBookmarkToggle(note)}
                  className={`p-2 rounded-lg border transition-all ${
                    isBook 
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40" 
                      : (isDarkMode ? "bg-[#0B0F19] text-slate-400 border-[#1E293B] hover:text-white" : "bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800")
                  }`}
                  title={isBook ? "Remove Bookmark" : "Save Bookmark"}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => handleDownload(note.id, note.title)}
                  className="flex-1 py-2.5 px-4 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-[0_2px_10px_rgba(212,175,55,0.15)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Notes</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredNotes.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <p className="text-base font-semibold">No notes match your filters</p>
            <p className="text-xs text-slate-600 mt-1">Try modifying your search queries or selecting another semester.</p>
          </div>
        )}
      </div>

    </div>
  );
};
