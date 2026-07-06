import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, BookOpen, GraduationCap, Scale, Award, 
  ChevronRight, HelpCircle, ArrowRight, Download, 
  Bookmark, CheckCircle, Flame, Star, Sparkles, MessageSquare 
} from "lucide-react";
import { UNIVERSITIES, CASE_LAWS, BARE_ACTS, DAILY_QUIZZES } from "../data/legalData";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export const Home: React.FC = () => {
  const { isDarkMode } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Helper to programmatically detect theme state and style the luxury hero card appropriately
  const getHeroContainerStyles = (): string => {
    if (isDarkMode) {
      return "border border-[#D4AF37]/15 bg-slate-900/40 backdrop-blur-md shadow-2xl shadow-black/20";
    }
    return "border border-[#B8860B]/10 bg-white/70 backdrop-blur-md shadow-xl shadow-slate-100/50";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const faqs = [
    {
      q: "What is LawBuddy and how does it help law students?",
      a: "LawBuddy is India's premium legal education ecosystem. It features structured semester notes mapped to leading universities (like Mumbai University, Delhi University, GLC, ILS, and NLUs), interactive Bare Acts, detailed analytical summaries of historic Supreme Court Case Laws, and an intelligent legal assistant powered by Google Gemini to clarify legal doubts and maxims."
    },
    {
      q: "Are the notes and study materials compliant with newly passed BNS, BNSS, and BSA laws?",
      a: "Yes! LawBuddy is fully updated. Our Bare Acts, LLB notes, and Judiciary quizzes contain comparative analyses between the Indian Penal Code (IPC) and the newly enacted Bharatiya Nyaya Sanhita (BNS) 2023, along with corresponding procedural and evidence updates."
    },
    {
      q: "How does the LawBuddy AI Assistant work?",
      a: "Our AI assistant uses the server-side Gemini 2.5-flash API to help students. It can summarize complex case laws, explain specific sections of Bare Acts with easy illustrations, generate tailored revision study notes, create multi-choice questions for study testing, and explain legal terms or Latin maxims in plain English."
    },
    {
      q: "Can I download study materials and previous year papers as PDFs?",
      a: "Yes, you can preview notes and question papers online in our high-fidelity interactive PDF viewer, bookmark them for rapid offline reading, and download them with one click directly into your device storage."
    }
  ];

  return (
    <div id="home-page-container" className="space-y-24 pb-16">
      
      {/* 1. LUXURY HERO WITH ANIMATED CANVAS & SEARCH */}
      <section className={`relative pt-12 md:pt-24 pb-20 overflow-hidden flex flex-col items-center text-center px-4 max-w-5xl mx-auto rounded-3xl transition-all duration-300 hero-gradient-bg ${getHeroContainerStyles()}`}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#F3E5AB]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Fully updated for BNS, BNSS & BSA 2023 Legislation</span>
          </div>

          <h1 className={`font-poppins text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
            India's Premium <br />
            <span className="inline-block bg-gradient-to-r from-[#B8860B] via-[#785A00] to-[#B8860B] dark:from-[#FFF] dark:via-[#D4AF37] dark:to-[#F3E5AB] bg-clip-text text-transparent">
              Legal Learning Platform
            </span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Master your LLB semesters, access flawless Bare Acts indexation, study landmark analytical case ratios, and ace your State Judiciary Exams with our elite legal study tools.
          </p>
        </motion.div>

        {/* Dynamic Search Box */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`w-full max-w-3xl mt-10 border transition-all duration-300 rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.06)] ${
            isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-[#D4AF37]/35" : "bg-white border-slate-200 hover:border-[#D4AF37]/50"
          }`}
        >
          <div className="flex-1 flex items-center px-4 w-full">
            <Search className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
            <input 
              id="hero-search-input"
              type="text" 
              placeholder="Search Mumbai Univ notes, Article 21, BNS Section 100, Kesavananda..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3 bg-transparent focus:outline-none text-sm md:text-base ${
                isDarkMode ? "text-white placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>
          <button 
            id="hero-search-btn"
            type="submit" 
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:opacity-95 text-[#0B0F19] font-bold text-sm rounded-xl transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] flex items-center justify-center space-x-2"
          >
            <span>Search Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Stat Counter Widgets */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-16 text-center border-t pt-8 ${isDarkMode ? "border-[#1E293B]" : "border-slate-200"}`}>
          {[
            { count: "8+", label: "Top Law Universities" },
            { count: "1,200+", label: "Curated LLB Semester Notes" },
            { count: "15,000+", label: "Bare Act Chapters" },
            { count: "5,000+", label: "Judiciary Mock Questions" }
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="block font-poppins text-3xl font-extrabold text-[#D4AF37]">{stat.count}</span>
              <span className={`text-xs uppercase tracking-widest font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TRENDING SUBJECTS & ACADEMICS ARCHIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 animate-bounce text-[#D4AF37]" />
              <span>Syllabus Master</span>
            </div>
            <h2 className={`font-poppins text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>Trending LLB Study Portals</h2>
          </div>
          <Link to="/notes" className="text-sm font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors flex items-center space-x-1 mt-2 md:mt-0">
            <span>Browse all syllabus subjects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: "contracts-1", name: "Law of Contracts - I", count: "12 detailed notes", bg: "from-blue-500/10 to-transparent", desc: "General principles, Offer & acceptance, free consent, damages.", link: "/subject/contracts-1" },
            { id: "consti-1", name: "Constitutional Law - I", count: "18 detailed notes", bg: "from-[#D4AF37]/10 to-transparent", desc: "Fundamental Rights (Art 14, 19, 21), Preamble, Writs.", link: "/subject/consti-1" },
            { id: "torts", name: "Law of Torts", count: "9 detailed notes", bg: "from-purple-500/10 to-transparent", desc: "Negligence, Strict & Absolute liability, Consumer protection.", link: "/subject/torts" },
            { id: "crimes-1", name: "Law of Crimes (BNS)", count: "15 detailed notes", bg: "from-red-500/10 to-transparent", desc: "Culpable homicide, murder, general exceptions under BNS.", link: "/subject/crimes-1" }
          ].map((sub) => (
            <Link 
              key={sub.id} 
              to={sub.link} 
              className={`group p-6 border rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md ${
                isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-[#D4AF37]/40" : "bg-white border-slate-200 hover:border-[#D4AF37]/50"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${sub.bg} opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
              <div className="relative z-10 space-y-4">
                <BookOpen className="w-8 h-8 text-[#D4AF37] mb-2" />
                <h3 className={`font-poppins text-lg font-bold group-hover:text-[#D4AF37] transition-colors ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>{sub.name}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{sub.desc}</p>
                <div className={`flex items-center justify-between pt-4 border-t text-xs font-semibold ${isDarkMode ? "border-[#1E293B] text-slate-400" : "border-slate-100 text-slate-500"}`}>
                  <span className="text-[#D4AF37]">{sub.count}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Study Now →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. UNIVERSITY DASHBOARDS SECTOR */}
      <section className={`py-20 border-y transition-colors duration-300 ${isDarkMode ? "bg-gradient-to-b from-[#0F1422] to-[#0B0F19] border-[#1E293B]/60" : "bg-slate-50 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Affiliated Curriculums</span>
            <h2 className={`font-poppins text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>University Academic Hubs</h2>
            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Unlock complete semester notes, previous year question papers, and specific course requirements tailored for major law universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNIVERSITIES.slice(0, 8).map((uni) => (
              <Link 
                key={uni.id} 
                to={`/university/${uni.id}`}
                className={`group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                  isDarkMode ? "bg-[#121826]/75 border-[#1E293B] hover:border-[#D4AF37]/50" : "bg-white border-slate-200 hover:border-[#D4AF37]/50"
                }`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center font-bold text-[#D4AF37] text-lg border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all duration-300">
                    {uni.shortName}
                  </div>
                  <h3 className={`font-poppins text-lg font-bold group-hover:text-[#D4AF37] transition-colors ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>{uni.name}</h3>
                  <p className={`text-xs leading-relaxed line-clamp-3 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{uni.description}</p>
                </div>
                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${isDarkMode ? "border-[#1E293B] text-slate-400" : "border-slate-100 text-slate-500"}`}>
                  <span className="text-[#D4AF37]">{uni.semesters} Semesters</span>
                  <span className="flex items-center text-[#D4AF37] group-hover:underline">
                    <span>Open Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENT ARCHIVE: NOTES, BARE ACTS, CASE LAWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Latest Bare Acts */}
          <div className="space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? "border-[#1E293B]" : "border-slate-200"}`}>
              <h3 className={`font-poppins text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                <Scale className="w-5 h-5 text-[#D4AF37]" />
                <span>Featured Bare Acts</span>
              </h3>
              <Link to="/bare-acts" className="text-xs text-[#D4AF37] font-semibold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {BARE_ACTS.map((act) => (
                <Link 
                  key={act.id} 
                  to="/bare-acts" 
                  className={`block p-4 rounded-xl border transition-all group ${
                    isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-[#D4AF37]/30 hover:bg-[#121826]/90" : "bg-white border-slate-200 hover:border-[#D4AF37]/50 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <span className={`text-[10px] font-semibold uppercase block mb-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Enacted {act.enactmentYear}</span>
                  <h4 className={`text-sm font-bold group-hover:text-[#D4AF37] transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}>{act.title}</h4>
                  <p className="text-xs text-[#D4AF37] mt-2 font-medium">Browse Chapters & Sections →</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Case Laws */}
          <div className="space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? "border-[#1E293B]" : "border-slate-200"}`}>
              <h3 className={`font-poppins text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span>Landmark Case Laws</span>
              </h3>
              <Link to="/case-laws" className="text-xs text-[#D4AF37] font-semibold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {CASE_LAWS.slice(0, 2).map((caseObj) => (
                <Link 
                  key={caseObj.id} 
                  to="/case-laws" 
                  className={`block p-4 rounded-xl border transition-all group ${
                    isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-[#D4AF37]/30 hover:bg-[#121826]/90" : "bg-white border-slate-200 hover:border-[#D4AF37]/50 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <span className="text-[10px] text-[#D4AF37] font-bold block mb-1">{caseObj.citation}</span>
                  <h4 className={`text-sm font-bold group-hover:text-[#D4AF37] transition-colors line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>{caseObj.title}</h4>
                  <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{caseObj.facts}</p>
                  <div className="flex gap-1.5 mt-3">
                    {caseObj.keywords.slice(0, 2).map((k) => (
                      <span key={k} className={`px-2 py-0.5 text-[10px] rounded-full ${isDarkMode ? "bg-[#1E293B] text-slate-400" : "bg-slate-100 text-slate-600"}`}>{k}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Judiciary Daily Quiz Quick Access */}
          <div className="space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? "border-[#1E293B]" : "border-slate-200"}`}>
              <h3 className={`font-poppins text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                <span>Judiciary Practice</span>
              </h3>
              <Link to="/judiciary" className="text-xs text-[#D4AF37] font-semibold hover:underline">Open Planner</Link>
            </div>
            <div className={`p-6 border rounded-2xl shadow-xl space-y-6 relative overflow-hidden ${
              isDarkMode ? "bg-gradient-to-tr from-[#121826] to-[#1a2337] border-[#D4AF37]/20" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none" />
              <div>
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">Today's Daily MCQ</span>
                <p className={`text-sm font-semibold leading-relaxed line-clamp-3 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  {DAILY_QUIZZES[0].question}
                </p>
              </div>
              <Link 
                to="/judiciary" 
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] text-xs font-bold rounded-xl text-center block transition-all shadow-[0_4px_12px_rgba(212,175,55,0.2)]"
              >
                Attempt Legal Quiz
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PREMIUM MEMBERSHIP ADVERTISING CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 ${
          isDarkMode ? "bg-gradient-to-r from-[#121826] via-[#1a233a] to-[#121826] border-[#D4AF37]/35" : "bg-white border-slate-200"
        }`}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none rounded-full" />
          
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider inline-block">
              Premium LawBuddy Club
            </span>
            <h2 className={`font-poppins text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
              Unlock Complete Case Summaries, Notes & Premium MCQ Banks
            </h2>
            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Become a LawBuddy Pro member to access downloadable high-quality PDF study manuals, comprehensive legal outlines with model answers, priority custom AI chat queries, and mock assessment metrics.
            </p>
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold pt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-1.5" /> Ad-Free Reading Mode</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-1.5" /> Direct PDF Offline Downloads</span>
              <span className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-1.5" /> Infinite Gemini AI Legal Prompts</span>
            </div>
          </div>

          <div className={`flex-shrink-0 text-center space-y-3 border p-6 rounded-2xl w-full max-w-sm ${
            isDarkMode ? "bg-[#0B0F19]/90 border-[#1E293B]" : "bg-slate-50 border-slate-200"
          }`}>
            <span className={`text-xs block font-semibold uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Premium Access starts at</span>
            <div className="flex items-baseline justify-center space-x-1">
              <span className={`text-4xl font-poppins font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>₹299</span>
              <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>/ month</span>
            </div>
            <Link 
              to="/premium" 
              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B0F19] text-sm font-extrabold rounded-xl text-center block transition-all shadow-lg"
            >
              Get Premium Access Now
            </Link>
            <span className="text-[10px] text-slate-500 block font-medium">Cancel any time. Full 7-Day Refund Policy included.</span>
          </div>
        </div>
      </section>

      {/* 6. TRUSTED STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Alumni Echoes</span>
          <h2 className={`font-poppins text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>Loved by Thousands of Law Students</h2>
          <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Read how LawBuddy empowers students from GLC, ILS, Delhi University, and NLUs to excel in semester exams and legal careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "LawBuddy's semester notes saved my LLB exams! The Mumbai University syllabus is perfectly structured, and the case summaries are exceptionally detailed. I managed to score 68% in Contracts without buying any other books.",
              name: "Ananya Deshmukh",
              college: "Government Law College (GLC), Mumbai",
              rating: 5
            },
            {
              text: "The BNS vs IPC comparative notes are a goldmine. With the legal landscape changing rapidly, having fully updated MCQ question banks and Bare Acts sections allowed me to confidently prepare for the Judiciary services.",
              name: "Karan Singh",
              college: "Faculty of Law, Delhi University",
              rating: 5
            },
            {
              text: "The LawBuddy Gemini AI Assistant is a game-changer. I prompt it to clarify section provisions and give illustrations, and it explains everything instantly in a simple manner. Truly the future of legal learning.",
              name: "Sanjana Roy",
              college: "NLU Delhi (NLUD)",
              rating: 5
            }
          ].map((t, idx) => (
            <div key={idx} className={`p-6 border rounded-2xl space-y-4 flex flex-col justify-between ${
              isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="space-y-4">
                <div className="flex gap-1 text-[#D4AF37]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className={`text-xs leading-relaxed italic ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>"{t.text}"</p>
              </div>
              <div className={`flex items-center space-x-3 pt-4 border-t ${isDarkMode ? "border-[#1E293B]" : "border-slate-100"}`}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#0B0F19] font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{t.name}</h4>
                  <p className={`text-[10px] font-semibold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>{t.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 space-y-2">
          <h2 className={`font-poppins text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>Frequently Asked Questions</h2>
          <p className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Have general questions about the platform? We've got you covered.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`p-6 border rounded-2xl ${isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200 shadow-sm"}`}>
              <h4 className={`font-poppins text-sm md:text-base font-bold mb-2 flex items-start ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                <HelpCircle className="w-5 h-5 text-[#D4AF37] mr-2.5 flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed pl-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
