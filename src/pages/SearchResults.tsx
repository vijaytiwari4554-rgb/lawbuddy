import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CASE_LAWS, BARE_ACTS, UNIVERSITIES } from "../data/legalData";
import { Search, Scale, Award, GraduationCap, Clipboard } from "lucide-react";

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Aggregate results
  const matchingCases = CASE_LAWS.filter((c) => {
    return c.title.toLowerCase().includes(query.toLowerCase()) || 
           c.citation.toLowerCase().includes(query.toLowerCase()) || 
           c.keywords.some((kw) => kw.toLowerCase().includes(query.toLowerCase()));
  });

  const matchingActs: Array<{ actTitle: string, sectionNumber: string, sectionTitle: string, content: string }> = [];
  BARE_ACTS.forEach((act) => {
    act.chapters.forEach((ch) => {
      ch.sections.forEach((sec) => {
        if (sec.title.toLowerCase().includes(query.toLowerCase()) || 
            sec.content.toLowerCase().includes(query.toLowerCase()) ||
            sec.number.toLowerCase().includes(query.toLowerCase())) {
          matchingActs.push({
            actTitle: act.title,
            sectionNumber: sec.number,
            sectionTitle: sec.title,
            content: sec.content
          });
        }
      });
    });
  });

  const matchingUnis = UNIVERSITIES.filter((u) => {
    return u.name.toLowerCase().includes(query.toLowerCase()) || 
           u.shortName.toLowerCase().includes(query.toLowerCase()) ||
           u.location.toLowerCase().includes(query.toLowerCase());
  });

  const totalCount = matchingCases.length + matchingActs.length + matchingUnis.length;

  return (
    <div id="search-results-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Search Input bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
        <input 
          id="global-search-input"
          type="text" 
          placeholder="Search universities, case laws, bare acts sections, syllabus..." 
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-[#121826] border-2 border-[#1E293B] focus:border-[#D4AF37] rounded-2xl text-xs sm:text-sm text-white focus:outline-none placeholder-slate-500 transition-colors"
        />
      </form>

      {/* Meta headers */}
      <div className="border-b border-[#1E293B] pb-4">
        <h1 className="font-poppins text-xl sm:text-2xl font-black text-white">
          Search Results for <span className="text-[#D4AF37]">"{query}"</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Found {totalCount} total reference entries in LawBuddy database.</p>
      </div>

      {totalCount === 0 ? (
        <div className="text-center py-16 bg-[#121826] border border-dashed border-[#1E293B] rounded-2xl">
          <Clipboard className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h4 className="font-poppins text-base font-bold text-white mb-1">No matching resources found</h4>
          <p className="text-xs text-slate-400">Try modifying your query tags or consult our LawBuddy AI assistant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main results column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Case Laws section */}
            {matchingCases.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Matching Case Law Dossiers ({matchingCases.length})</span>
                </span>

                <div className="space-y-3">
                  {matchingCases.map((c) => (
                    <div key={c.id} className="p-5 bg-[#121826] border border-[#1E293B] rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#D4AF37] font-bold">{c.citation}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{c.title}</h4>
                      </div>
                      <Link 
                        to="/case-laws" 
                        className="px-3 py-1.5 bg-[#0B0F19] border border-[#1E293B] text-slate-300 hover:text-white rounded-lg text-xs font-semibold"
                      >
                        Open Dossier
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Bare Acts sections matches */}
            {matchingActs.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#D4AF37]" />
                  <span>Matching Bare Act Provisions ({matchingActs.length})</span>
                </span>

                <div className="space-y-3">
                  {matchingActs.map((act, i) => (
                    <div key={i} className="p-5 bg-[#121826] border border-[#1E293B] rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{act.actTitle}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{act.sectionNumber}: {act.sectionTitle}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{act.content}</p>
                      </div>
                      <Link 
                        to="/bare-acts" 
                        className="px-3 py-1.5 bg-[#0B0F19] border border-[#1E293B] text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex-shrink-0"
                      >
                        Read Statute
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Universities matches */}
            {matchingUnis.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span>Matching University Hubs ({matchingUnis.length})</span>
                </span>

                <div className="space-y-3">
                  {matchingUnis.map((u) => (
                    <div key={u.id} className="p-5 bg-[#121826] border border-[#1E293B] rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{u.name}</h4>
                        <span className="text-[10px] text-[#D4AF37] font-semibold">{u.location}</span>
                      </div>
                      <Link 
                        to={`/university/${u.id}`} 
                        className="px-3 py-1.5 bg-[#0B0F19] border border-[#1E293B] text-slate-300 hover:text-white rounded-lg text-xs font-semibold"
                      >
                        Enter Dashboard
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right column context tips */}
          <div className="lg:col-span-4 bg-[#121826] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Search Tips</span>
            <ul className="space-y-3.5 text-xs text-slate-400 leading-relaxed font-medium list-disc pl-4">
              <li>Use official citation numbers like <strong className="text-white">"2014"</strong> or <strong className="text-white">"1973"</strong> for landmark cases.</li>
              <li>Input specific section names e.g., <strong className="text-white">"Article 21"</strong>, <strong className="text-white">"Section 100"</strong> for exact bare acts highlights.</li>
              <li>Filter matches by switching to dedicated tabs inside layout headers if needed.</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
