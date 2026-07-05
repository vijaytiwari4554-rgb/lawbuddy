import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BARE_ACTS } from "../data/legalData";
import { 
  Scale, BookOpen, Search, Bookmark, Sun, Moon, 
  HelpCircle, ChevronRight, Eye, CheckCircle, Sparkles, CornerDownRight 
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const BareActs: React.FC = () => {
  const { addBookmark, isBookmarked, removeBookmark } = useApp();
  
  const [selectedActIndex, setSelectedActIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [bareActSearch, setBareActSearch] = useState("");
  const [isReadingLightMode, setIsReadingLightMode] = useState(false);

  const activeAct = BARE_ACTS[selectedActIndex] || BARE_ACTS[0];
  const activeChapter = activeAct.chapters[selectedChapterIndex] || activeAct.chapters[0];
  const activeSection = activeChapter.sections[selectedSectionIndex] || activeChapter.sections[0];

  const handleSectionBookmarkToggle = (actTitle: string, secNumber: string, secTitle: string) => {
    const itemId = `${activeAct.id}-${secNumber}`;
    const bookmarked = isBookmarked(itemId, 'bare_act_section');
    if (bookmarked) {
      alert("This section is already bookmarked! Visit your profile to view your bookmarks.");
    } else {
      addBookmark(itemId, 'bare_act_section', `${secNumber}: ${secTitle}`, actTitle);
      alert(`Section ${secNumber} bookmarked successfully!`);
    }
  };

  // Filter sections or acts based on search
  const filteredActsList = BARE_ACTS.filter((act) => {
    return act.title.toLowerCase().includes(bareActSearch.toLowerCase()) || 
           act.shortTitle.toLowerCase().includes(bareActSearch.toLowerCase());
  });

  return (
    <div id="bare-acts-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Portal Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-poppins text-3xl font-extrabold text-white flex items-center gap-2">
            <Scale className="w-8 h-8 text-[#D4AF37]" />
            <span>Bare Act <span className="gold-gradient-text">Statute Library</span></span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Official state legal codes, comparative schedules, and intuitive chapter index tree navigation.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input 
            id="act-search-input"
            type="text" 
            placeholder="Search statutes..." 
            value={bareActSearch}
            onChange={(e) => setBareActSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#121826] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-500 transition-colors"
          />
        </div>
      </div>

      {/* CORE READING ENVIRONMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Act and Chapter Tree Navigation (4/12 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Act Selection List */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-4 space-y-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2">Select Statute</span>
            <div className="space-y-1">
              {filteredActsList.map((act, index) => {
                const isSelected = BARE_ACTS[selectedActIndex]?.id === act.id;
                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      // Find real index in original BARE_ACTS array
                      const realIdx = BARE_ACTS.findIndex((a) => a.id === act.id);
                      setSelectedActIndex(realIdx);
                      setSelectedChapterIndex(0);
                      setSelectedSectionIndex(0);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected 
                        ? "bg-[#D4AF37] text-[#0B0F19] font-bold" 
                        : "text-slate-300 hover:bg-white/[0.03]"
                    }`}
                  >
                    <span>{act.shortTitle}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Outline Navigation */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-4 space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2">Chapter Index</span>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {activeAct.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterIndex(idx);
                    setSelectedSectionIndex(0);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold block border transition-colors ${
                    selectedChapterIndex === idx 
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]" 
                      : "border-slate-800 bg-[#0B0F19] text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">{ch.number}</span>
                  <span className="block truncate mt-0.5">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Outline Selection */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-4 space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2">Sections in Chapter</span>
            <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
              {activeChapter.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                    selectedSectionIndex === idx 
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CornerDownRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-bold whitespace-nowrap text-[#D4AF37]">{sec.number}:</span>
                  <span className="truncate">{sec.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Active Statute Reading Board (8/12 cols) */}
        <div className="lg:col-span-8">
          
          {/* Controls Bar */}
          <div className="p-4 bg-[#121826] border border-[#1E293B] rounded-t-2xl flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">{activeAct.shortTitle}</span>
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-xs text-[#D4AF37] font-bold">{activeChapter.number}</span>
            </div>

            <div className="flex items-center space-x-2">
              
              {/* Reading Mode Toggle */}
              <button 
                onClick={() => setIsReadingLightMode(!isReadingLightMode)}
                className="p-2 bg-[#0B0F19] hover:bg-white/[0.04] border border-[#1E293B] rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Toggle Reading Canvas Theme"
              >
                {isReadingLightMode ? <Moon className="w-4 h-4 text-[#D4AF37]" /> : <Sun className="w-4 h-4 text-[#D4AF37]" />}
              </button>

              {/* Bookmark Section Button */}
              <button 
                onClick={() => handleSectionBookmarkToggle(activeAct.title, activeSection.number, activeSection.title)}
                className="px-3 py-1.5 bg-[#0B0F19] hover:bg-white/[0.04] border border-[#1E293B] rounded-lg text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1.5 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Bookmark</span>
              </button>

              {/* Ask AI button */}
              <Link 
                to="/ai-assistant" 
                className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] rounded-lg text-xs font-extrabold flex items-center space-x-1.5 shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI to Explain</span>
              </Link>

            </div>
          </div>

          {/* Active Reading Stage Canvas */}
          <div 
            className={`p-8 border-x border-b border-[#1E293B] rounded-b-2xl transition-colors duration-300 shadow-xl ${
              isReadingLightMode 
                ? "bg-white text-slate-900" 
                : "bg-[#121826] text-white"
            }`}
          >
            <div className="space-y-6">
              
              {/* Header Titles */}
              <div className="border-b pb-4 border-slate-700/50">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Official Statute Provisions
                </span>
                <h2 className={`font-poppins text-2xl font-black ${isReadingLightMode ? "text-slate-950" : "text-white"}`}>
                  {activeSection.number}: {activeSection.title}
                </h2>
              </div>

              {/* Core Legal Content text */}
              <div className="space-y-4">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Statutory Provisions Text</span>
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isReadingLightMode ? "text-slate-800" : "text-slate-300"}`}>
                  {activeSection.content}
                </p>
              </div>

              {/* Illustrations section if any */}
              {activeSection.illustration && (
                <div className={`p-5 rounded-xl border-l-4 border-[#D4AF37] ${isReadingLightMode ? "bg-amber-50 border-amber-400" : "bg-[#0B0F19]/80 border-[#D4AF37]"}`}>
                  <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Official Illustrations & Explanatory cases</span>
                  <p className={`text-xs leading-relaxed italic ${isReadingLightMode ? "text-slate-700" : "text-[#F3E5AB]"}`}>
                    {activeSection.illustration}
                  </p>
                </div>
              )}

              {/* Quick Assistant Help Guide */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${isReadingLightMode ? "bg-slate-50 border-slate-200" : "bg-[#161F32] border-[#1E293B]"}`}>
                <HelpCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-white">Stuck on legal definitions?</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Legal jargon can be difficult. Click the 'Ask AI to Explain' button at the top to have Gemini analyze this section, breaking down elements, penal parameters, exceptions, and key judicial precedents in real time.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
