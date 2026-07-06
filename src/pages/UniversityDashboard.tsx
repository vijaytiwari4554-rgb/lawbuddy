import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  UNIVERSITIES, SUBJECT_TOPICS, CASE_LAWS 
} from "../data/legalData";
import { 
  GraduationCap, BookOpen, FileText, HelpCircle, 
  Clipboard, Download, Eye, Bookmark, Share2, 
  CheckCircle, ArrowLeft, ZoomIn, ZoomOut, Maximize 
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export const UniversityDashboard: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const { addBookmark, isBookmarked, removeBookmark, recordDownload, currentUser, isDarkMode } = useApp();
  
  const university = UNIVERSITIES.find((u) => u.id === universityId) || UNIVERSITIES[0];
  const totalSemesters = university.semesters;
  
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [activeTab, setActiveTab] = useState<'subjects' | 'notes' | 'papers' | 'cases' | 'assignments'>('subjects');
  
  // PDF Viewer Modal State
  const [pdfPreview, setPdfPreview] = useState<{ isOpen: boolean; title: string; subtitle: string; content?: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Map subjects dynamically depending on the semester chosen
  const getSubjectsForSemester = (sem: number) => {
    if (sem === 1) {
      return [
        { id: "contracts-1", name: "Law of Contracts - I", notesCount: 5 },
        { id: "consti-1", name: "Constitutional Law - I", notesCount: 6 }
      ];
    } else if (sem === 2) {
      return [
        { id: "torts", name: "Law of Torts & Consumer Protection", notesCount: 4 },
        { id: "crimes-1", name: "Law of Crimes - I (Penal Provisions)", notesCount: 5 }
      ];
    } else {
      // Fallback/Generic for other semesters
      return [
        { id: "contracts-1", name: `Administrative Law (Sem ${sem})`, notesCount: 4 },
        { id: "consti-1", name: `Family Law (Sem ${sem})`, notesCount: 5 }
      ];
    }
  };

  const currentSubjects = getSubjectsForSemester(selectedSemester);

  // PDF Preview Content Generator
  const triggerPdfPreview = (title: string, subtitle: string, type: 'notes' | 'paper' | 'assignment') => {
    let mockContent = `LAWBUDDY OFFICIAL ACADEMIC ARCHIVE\n\nDocument: ${title}\nCategory: ${subtitle}\nUniversity: ${university.name}\n\n======================================================\n\nI. BACKGROUND AND KEY OBJECTIVES\nThis study material is mapped exactly to the curriculum approved by the Academic Council. It covers all core statutory provisions, comparative schedules, and historic judicial interpretations.\n\nII. ESSENTIAL SYLLABUS HIGHLIGHTS\n1. Detailed understanding of statutory clauses and active amendments.\n2. In-depth analysis of landmark rulings including ratio decidendi.\n3. Model answer templates structured with the IRAC legal framework.\n\nIII. CRITICAL CASE NOTES & CITATIONS\nEnsure you cite these cases verbatim in your semester examination answer booklets for maximum scoring.\n\n======================================================\n© LawBuddy - India's Legal Learning Platform. Authorized download only.`;
    
    setPdfPreview({
      isOpen: true,
      title,
      subtitle,
      content: mockContent
    });
  };

  const handleDownload = (itemId: string, itemTitle: string) => {
    recordDownload(itemId, 'note', itemTitle);
    alert(`Downloading ${itemTitle} PDF to your device storage successfully!`);
  };

  const handleShare = (title: string) => {
    const text = `Check out "${title}" on LawBuddy - India's Legal Learning Platform!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      alert(`Link copied to clipboard:\n${url}`);
    }
  };

  return (
    <div id="university-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <Link to="/universities" className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-[#D4AF37] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Universities Grid</span>
      </Link>

      {/* Hero Header */}
      <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-xl ${
        isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent pointer-events-none rounded-full" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {university.shortName}
              </span>
              <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>{university.location}</span>
            </div>
            <h1 className={`font-poppins text-2xl sm:text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {university.name}
            </h1>
            <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {university.description}
            </p>
          </div>
          
          <div className={`px-6 py-4 rounded-xl border text-center flex-shrink-0 ${
            isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
          }`}>
            <span className="block text-[#D4AF37] text-3xl font-extrabold">{totalSemesters}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Semesters Mapped</span>
          </div>
        </div>
      </div>

      {/* SEMESTER TABS */}
      <div className={`flex flex-wrap gap-2 border-b pb-4 ${isDarkMode ? "border-[#1E293B]" : "border-slate-200"}`}>
        {Array.from({ length: totalSemesters }).map((_, i) => {
          const semNum = i + 1;
          const isSelected = selectedSemester === semNum;
          return (
            <button
              key={semNum}
              onClick={() => {
                setSelectedSemester(semNum);
                setActiveTab('subjects');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isSelected 
                  ? "bg-[#D4AF37] text-[#0B0F19] font-bold shadow-[0_4px_12px_rgba(212,175,55,0.25)]" 
                  : (isDarkMode ? "bg-[#121826] text-slate-300 hover:text-white border border-[#1E293B]" : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm")
              }`}
            >
              Semester {semNum}
            </button>
          );
        })}
      </div>

      {/* METRICS & SUB NAVIGATION */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Sidebar navigation tabs */}
        <div className="space-y-2">
          {[
            { id: 'subjects', label: "Semester Subjects", icon: BookOpen, desc: "Syllabus outlines & materials" },
            { id: 'notes', label: "Detailed Study Notes", icon: FileText, desc: "Core theory and summaries" },
            { id: 'papers', label: "Question Papers", icon: Clipboard, desc: "Previous year exam questions" },
            { id: 'cases', label: "Important Case Laws", icon: GraduationCap, desc: "Mandatory case analytical briefings" },
            { id: 'assignments', label: "Academic Assignments", icon: HelpCircle, desc: "Sample reports and prompts" }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-4 rounded-xl border flex items-center space-x-4 transition-all duration-300 ${
                  isTabActive
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                    : (isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-slate-700 text-slate-300 hover:text-white" : "bg-white border-slate-200 hover:border-[#D4AF37]/40 text-slate-600 hover:text-slate-900 shadow-sm")
                }`}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-bold">{tab.label}</span>
                  <span className="block text-[10px] text-slate-500 font-medium">{tab.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Contents Panel */}
        <div className="lg:col-span-3 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-" + selectedSemester}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-md ${
                isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
              }`}
            >
              
              {/* TAB 1: SUBJECTS */}
              {activeTab === "subjects" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Semester {selectedSemester} Core Subjects</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Select a subject below to explore detailed syllabus guidelines and curated mock answers.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSubjects.map((sub) => (
                      <Link 
                        key={sub.id} 
                        to={`/subject/${sub.id}`}
                        className={`p-5 border hover:border-[#D4AF37]/45 rounded-xl hover:shadow-lg transition-all group flex flex-col justify-between ${
                          isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="space-y-2">
                          <BookOpen className="w-6 h-6 text-[#D4AF37]" />
                          <h4 className={`font-poppins text-base font-bold group-hover:text-[#D4AF37] transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}>{sub.name}</h4>
                          <span className="text-[10px] text-slate-500 font-bold block uppercase">{sub.notesCount} topic modules available</span>
                        </div>
                        <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                          isDarkMode ? "border-[#1E293B] text-slate-400" : "border-slate-100 text-slate-500"
                        }`}>
                          <span>Explore Subject</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: DETAILED NOTES */}
              {activeTab === "notes" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Study Notes for Semester {selectedSemester}</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Review top-grade notes prepared by leading academic legal scholars.</p>
                  </div>
                  <div className="space-y-4">
                    {currentSubjects.flatMap((sub) => {
                      const topics = SUBJECT_TOPICS[sub.id]?.notes || ["General Introduction Notes", "Model Revision Guides"];
                      return topics.map((t, index) => (
                        <div key={`${sub.id}-${index}`} className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="space-y-1">
                            <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">{sub.name}</span>
                            <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>{t}</h4>
                            <span className="text-[10px] text-slate-500 block">Contributor: LawBuddy Advisory • 5 min read</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => triggerPdfPreview(t, `Syllabus Note: ${sub.name}`, 'notes')}
                              className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 ${
                                isDarkMode ? "bg-[#121826] text-slate-300 hover:text-white border-[#1E293B]" : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm"
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>
                            <button 
                              onClick={() => handleDownload(`${sub.id}-note-${index}`, t)}
                              className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] rounded-lg text-xs font-bold flex items-center space-x-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </button>
                          </div>
                        </div>
                      ));
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: QUESTION PAPERS */}
              {activeTab === "papers" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Previous Year Question Papers</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Practice with real examination papers distributed during previous academic semesters.</p>
                  </div>
                  <div className="space-y-4">
                    {[2024, 2023, 2022].map((year) => (
                      currentSubjects.map((sub) => (
                        <div key={`${sub.id}-${year}`} className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="space-y-1">
                            <span className="text-[10px] text-emerald-500 font-bold uppercase">{year} Annual Examination</span>
                            <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>{sub.name} - End Term Paper</h4>
                            <span className="text-[10px] text-slate-500 block">{university.shortName} official paper • 100 Marks</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => triggerPdfPreview(`${sub.name} Paper (${year})`, `${university.shortName} Endterm`, 'paper')}
                              className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 ${
                                isDarkMode ? "bg-[#121826] text-slate-300 hover:text-white border-[#1E293B]" : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm"
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>
                            <button 
                              onClick={() => handleDownload(`${sub.id}-paper-${year}`, `${sub.name} PYP ${year}`)}
                              className="px-3 py-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] rounded-lg text-xs font-bold flex items-center space-x-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CASE LAWS */}
              {activeTab === "cases" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Mandatory Case Laws for Semester {selectedSemester}</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Read landmark judicial precedents relevant to your current syllabus.</p>
                  </div>
                  <div className="space-y-4">
                    {CASE_LAWS.map((caseObj) => (
                      <div key={caseObj.id} className={`p-5 border rounded-xl space-y-3 ${
                        isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <span className="text-[10px] text-[#D4AF37] font-bold block">{caseObj.citation}</span>
                            <h4 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{caseObj.title}</h4>
                            <span className="text-xs text-slate-500">{caseObj.court}</span>
                          </div>
                          <Link 
                            to="/case-laws" 
                            className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${
                              isDarkMode ? "bg-[#121826] text-slate-300 hover:text-white border-[#1E293B]" : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm"
                            }`}
                          >
                            Explore Analysis
                          </Link>
                        </div>
                        <p className={`text-xs line-clamp-3 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{caseObj.facts}</p>
                        <div className={`p-3 border-l-2 border-[#D4AF37] rounded-r-lg ${isDarkMode ? "bg-[#121826]" : "bg-white border-slate-200 shadow-inner"}`}>
                          <span className="block text-[10px] text-slate-500 uppercase font-bold">Legal Ratio Decidendi</span>
                          <p className="text-xs text-[#D4AF37] italic font-medium leading-relaxed mt-0.5">{caseObj.ratio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ASSIGNMENTS */}
              {activeTab === "assignments" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-poppins text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Semester Sample Assignments & Prompts</h3>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Mock research paper questions and reference analysis reports to help you score high grades.</p>
                  </div>
                  <div className="space-y-4">
                    {currentSubjects.map((sub, index) => (
                      <div key={`assign-${sub.id}`} className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="space-y-1">
                          <span className="text-[10px] text-purple-400 font-bold uppercase">Topic Research Task</span>
                          <h4 className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>Critique paper on {sub.name} applications in corporate fields</h4>
                          <span className="text-[10px] text-slate-500 block">Suggested length: 2,500 words • Citation: Bluebook format</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => triggerPdfPreview(`Research Prompt - ${sub.name}`, "Suggested Outline Document", 'assignment')}
                            className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 ${
                              isDarkMode ? "bg-[#121826] text-slate-300 hover:text-white border-[#1E293B]" : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm"
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                          <button 
                            onClick={() => handleDownload(`assign-pdf-${index}`, `Research Prompt - ${sub.name}`)}
                            className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] rounded-lg text-xs font-bold flex items-center space-x-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Get Brief</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DETAILED PDF VIEWER OVERLAY MODAL */}
      <AnimatePresence>
        {pdfPreview?.isOpen && (
          <motion.div 
            id="pdf-previewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto ${
              isDarkMode ? "bg-[#0B0F19]/95" : "bg-slate-900/80"
            }`}
          >
            <div className={`w-full max-w-4xl border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh] ${
              isDarkMode ? "bg-[#121826] border-[#D4AF37]/35" : "bg-white border-slate-300"
            }`}>
              
              {/* PDF Header Controls */}
              <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 ${
                isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
              }`}>
                <div>
                  <h4 className={`font-poppins text-sm md:text-base font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{pdfPreview.title}</h4>
                  <span className={`text-[10px] font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{pdfPreview.subtitle}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Zoom Controls */}
                  <div className={`flex items-center rounded-lg px-2.5 py-1 border ${
                    isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <button 
                      onClick={() => setZoomLevel((prev) => Math.max(50, prev - 10))}
                      className="p-1 hover:text-[#D4AF37] text-slate-400"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className={`text-xs font-mono px-2 min-w-[40px] text-center ${isDarkMode ? "text-white" : "text-slate-800"}`}>{zoomLevel}%</span>
                    <button 
                      onClick={() => setZoomLevel((prev) => Math.min(200, prev + 10))}
                      className="p-1 hover:text-[#D4AF37] text-slate-400"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleShare(pdfPreview.title)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode ? "bg-[#121826] hover:bg-white/[0.05] border-[#1E293B] text-slate-300 hover:text-white" : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600 shadow-sm"
                    }`}
                    title="Share Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => handleDownload("preview-dl", pdfPreview.title)}
                    className="p-2 bg-[#D4AF37] hover:bg-[#C5A028] rounded-lg text-[#0B0F19] font-bold"
                    title="Download document as PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setPdfPreview(null)}
                    className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>

              {/* PDF Content Stage */}
              <div className={`flex-1 overflow-y-auto p-6 md:p-12 flex justify-center ${isDarkMode ? "bg-slate-900/60" : "bg-slate-100"}`}>
                <div 
                  className="bg-white text-slate-950 p-8 md:p-12 rounded-lg shadow-xl max-w-2xl w-full border border-slate-300 font-sans leading-relaxed selection:bg-[#D4AF37]/40 transition-all duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                >
                  <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {pdfPreview.content}
                  </pre>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
