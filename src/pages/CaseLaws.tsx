import React, { useState } from "react";
import { CASE_LAWS } from "../data/legalData";
import { 
  Award, Search, Bookmark, Copy, Share2, 
  Printer, ArrowRight, CornerDownRight, ExternalLink 
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const CaseLaws: React.FC = () => {
  const { addBookmark, isBookmarked } = useApp();
  
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCitation, setCopiedCitation] = useState(false);

  const activeCase = CASE_LAWS[selectedCaseIdx] || CASE_LAWS[0];

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleBookmark = (itemId: string, title: string, subtitle: string) => {
    const isBook = isBookmarked(itemId, 'case_law');
    if (isBook) {
      alert("This case analysis is already bookmarked! Visit your profile to manage bookmarks.");
    } else {
      addBookmark(itemId, 'case_law', title, subtitle);
      alert("Successfully bookmarked this case dossier!");
    }
  };

  const handleShareSocial = (platform: 'whatsapp' | 'telegram', title: string) => {
    const text = encodeURIComponent(`Read landmark case analysis: "${title}" on LawBuddy!`);
    const url = encodeURIComponent(window.location.href);
    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else {
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    }
    window.open(shareUrl, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter cases based on search
  const filteredCasesList = CASE_LAWS.filter((c) => {
    return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           c.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div id="case-law-library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-poppins text-3xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-8 h-8 text-[#D4AF37]" />
            <span>Landmark <span className="gold-gradient-text">Case Law Dossiers</span></span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authoritative, highly parsed ratio analysis, facts summaries, and critical judicial holdings of the Supreme Court of India.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input 
            id="case-search-input"
            type="text" 
            placeholder="Search cases or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#121826] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none placeholder-slate-500 transition-colors"
          />
        </div>
      </div>

      {/* TWO COLUMN MASTER DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Cases List Selection (4/12 cols) */}
        <div className="lg:col-span-4 bg-[#121826] border border-[#1E293B] rounded-2xl p-4 space-y-4">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2">Cases Dossier List</span>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredCasesList.map((caseObj) => {
              const originalIdx = CASE_LAWS.findIndex((c) => c.id === caseObj.id);
              const isSelected = selectedCaseIdx === originalIdx;
              return (
                <button
                  key={caseObj.id}
                  onClick={() => setSelectedCaseIdx(originalIdx)}
                  className={`w-full text-left p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                    isSelected 
                      ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" 
                      : "bg-[#0B0F19] border-[#1E293B] text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#D4AF37] font-bold block">{caseObj.citation}</span>
                    <h4 className={`text-xs sm:text-sm font-bold ${isSelected ? "text-[#D4AF37]" : "text-white"} leading-snug line-clamp-2`}>
                      {caseObj.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {caseObj.keywords.slice(0, 2).map((k) => (
                      <span key={k} className="px-2 py-0.5 bg-[#1E293B] text-[9px] rounded-full text-slate-400">{k}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Case Dossier Analysis (8/12 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Action dossier Header */}
          <div className="p-6 bg-[#121826] border border-[#1E293B] rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest block">{activeCase.citation}</span>
                <h2 className="font-poppins text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {activeCase.title}
                </h2>
                <span className="text-xs text-slate-400 block">{activeCase.court} • Decided in {activeCase.year}</span>
              </div>

              {/* Utility actions buttons */}
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button 
                  onClick={() => handleCopyCitation(activeCase.citation)}
                  className="px-3 py-1.5 bg-[#0B0F19] border border-[#1E293B] text-slate-300 hover:text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                  title="Copy Citation"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{copiedCitation ? "Copied ✓" : "Copy"}</span>
                </button>

                <button 
                  onClick={() => handleBookmark(activeCase.id, activeCase.title, activeCase.citation)}
                  className="p-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg text-slate-300 hover:text-white"
                  title="Bookmark Dossier"
                >
                  <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button 
                  onClick={handlePrint}
                  className="p-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg text-slate-300 hover:text-white"
                  title="Print Analysis"
                >
                  <Printer className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Social Share utilities */}
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 border-t border-[#1E293B] pt-4">
              <span>Share:</span>
              <button 
                onClick={() => handleShareSocial('whatsapp', activeCase.title)}
                className="text-emerald-400 hover:underline"
              >
                WhatsApp
              </button>
              <button 
                onClick={() => handleShareSocial('telegram', activeCase.title)}
                className="text-sky-400 hover:underline"
              >
                Telegram
              </button>
            </div>
          </div>

          {/* Core Case Analytical Brief dossier */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-8">
            
            {/* Keywords list */}
            <div className="flex flex-wrap gap-2">
              {activeCase.keywords.map((k) => (
                <span key={k} className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/20 rounded-full">
                  #{k}
                </span>
              ))}
            </div>

            {/* Segment: Facts */}
            <div className="space-y-3">
              <h3 className="font-poppins text-lg font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#D4AF37]" />
                <span>Facts of the Case</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#0B0F19]/40 p-4 rounded-xl border border-[#1E293B]">
                {activeCase.facts}
              </p>
            </div>

            {/* Segment: Issues */}
            <div className="space-y-3">
              <h3 className="font-poppins text-lg font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#D4AF37]" />
                <span>Key Legal Issues Involved</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#0B0F19]/40 p-4 rounded-xl border border-[#1E293B] whitespace-pre-wrap">
                {activeCase.issues}
              </p>
            </div>

            {/* Segment: Ratio */}
            <div className="p-6 bg-[#D4AF37]/5 border-l-4 border-[#D4AF37] rounded-r-xl space-y-2">
              <span className="text-xs text-[#D4AF37] font-extrabold uppercase tracking-widest block">Ratio Decidendi</span>
              <p className="text-xs sm:text-sm text-[#F3E5AB] italic leading-relaxed font-medium">
                "{activeCase.ratio}"
              </p>
            </div>

            {/* Segment: Judgment */}
            <div className="space-y-3">
              <h3 className="font-poppins text-lg font-bold text-white flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#D4AF37]" />
                <span>Detailed Final Judgment</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-[#0B0F19]/40 p-4 rounded-xl border border-[#1E293B] whitespace-pre-wrap">
                {activeCase.judgement}
              </p>
            </div>

            {/* Segment: Critical Highlights */}
            <div className="space-y-4">
              <h3 className="font-poppins text-lg font-bold text-white">Critical holdings & Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCase.importantPoints.map((pt, i) => (
                  <div key={i} className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related precedents */}
            {activeCase.relatedCases && (
              <div className="space-y-3 border-t border-[#1E293B] pt-6">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Related Judicial Precedents</span>
                <div className="flex flex-wrap gap-2.5">
                  {activeCase.relatedCases.map((rc) => (
                    <span key={rc} className="px-3 py-1 bg-[#1E293B] text-xs font-semibold text-slate-300 rounded-lg flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                      <span>{rc}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
