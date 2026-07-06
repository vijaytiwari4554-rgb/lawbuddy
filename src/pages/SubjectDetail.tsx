import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SUBJECT_TOPICS, CASE_LAWS, UNIVERSITIES } from "../data/legalData";
import { 
  BookOpen, Bookmark, Download, Share2, HelpCircle, 
  Award, FileText, ArrowLeft, ChevronRight, CheckCircle, Copy 
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const SubjectDetail: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { addBookmark, isBookmarked, removeBookmark, recordDownload } = useApp();
  
  const [copiedLink, setCopiedLink] = useState(false);

  // Map Subject IDs to titles
  const getSubjectMeta = (id: string) => {
    switch (id) {
      case "contracts-1":
        return { name: "Law of Contracts - I", university: "Mumbai University", semester: 1 };
      case "consti-1":
        return { name: "Constitutional Law - I", university: "Delhi University", semester: 1 };
      case "torts":
        return { name: "Law of Torts & Consumer Protection", university: "GLC Mumbai", semester: 2 };
      case "crimes-1":
        return { name: "Law of Crimes - I (Penal Provisions)", university: "ILS Pune", semester: 2 };
      default:
        return { name: "General Jurisprudence", university: "National Law School", semester: 3 };
    }
  };

  const subjectMeta = getSubjectMeta(subjectId || "contracts-1");
  const data = SUBJECT_TOPICS[subjectId || "contracts-1"] || {
    syllabus: ["Syllabus index not loaded. Please contact curriculum advisor."],
    topics: ["Core concepts"],
    notes: ["No digital outlines ready yet."],
    questions: ["Describe basic terms."]
  };

  const handleBookmarkToggle = () => {
    const bookmarked = isBookmarked(subjectId || "contracts-1", 'note');
    if (bookmarked) {
      // Find the ID and remove (in simple mode we toggle or prompt)
      alert("Item is already bookmarked! Visit your profile to manage bookmarks.");
    } else {
      addBookmark(subjectId || "contracts-1", 'note', subjectMeta.name, `${subjectMeta.university} - Semester ${subjectMeta.semester}`);
      alert("Successfully bookmarked this subject to your Profile dashboard!");
    }
  };

  const handleDownload = () => {
    recordDownload(subjectId || "contracts-1", 'note', subjectMeta.name);
    alert(`Success! Standard Syllabus Manual & study notes for "${subjectMeta.name}" downloaded to your device as PDF.`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const sampleFAQs = [
    {
      q: "What is the recommended legal text or reference textbook for this course?",
      a: "For general Contracts-I, Avtar Singh's 'Law of Contract and Specific Relief' is highly recommended. For Constitutional Law, J.N. Pandey or M.P. Jain's treatises provide exceptional commentary mapped to standard Indian university exams."
    },
    {
      q: "How many questions are usually set on this subject in end-semester papers?",
      a: "Usually, the university question paper has 10 long-form analytical questions (12 marks each), of which students must answer 5. Short notes are typically worth 5-6 marks."
    }
  ];

  return (
    <div id="subject-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back button */}
      <Link to="/universities" className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-[#D4AF37] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to University Dashboard</span>
      </Link>

      {/* 1. HERO PANEL */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-[#121826] to-[#1e293b] border-2 border-[#D4AF37]/20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block">
              Core Course Syllabus Map
            </span>
            <h1 className="font-poppins text-3xl md:text-5xl font-black text-white leading-tight">
              {subjectMeta.name}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Complete semester guidebook, module index, academic notes, important exam questions, and comparative analysis of newly passed Indian legislation.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="bg-[#0B0F19] px-3 py-1.5 rounded-full border border-[#1E293B]">
                Mapped Uni: <span className="text-[#D4AF37]">{subjectMeta.university}</span>
              </span>
              <span className="bg-[#0B0F19] px-3 py-1.5 rounded-full border border-[#1E293B]">
                Curriculum Semester: <span className="text-[#D4AF37]">{subjectMeta.semester}</span>
              </span>
            </div>
          </div>

          {/* Call to Actions on right side */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
            <button 
              onClick={handleBookmarkToggle}
              className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-[#121826] border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all shadow-md"
            >
              <Bookmark className="w-4 h-4 text-[#D4AF37]" />
              <span>{isBookmarked(subjectId || "contracts-1", 'note') ? "Bookmarked ✓" : "Bookmark Subject"}</span>
            </button>
            
            <button 
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B0F19] rounded-xl text-xs font-extrabold transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Syllabus</span>
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-5 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all"
            >
              {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? "Link Copied!" : "Share Syllabus"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THREE COLUMNS SYLLABUS & PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Official Syllabus Modules */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Syllabus Unit Outline */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2 border-b border-[#1E293B] pb-4">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>Academic Curriculum Guidelines</span>
            </h2>
            <div className="space-y-4">
              {data.syllabus.map((sy, i) => (
                <div key={i} className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{sy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Explored section */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2 border-b border-[#1E293B] pb-4">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
              <span>Core Subject Topics Analyzed</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.topics.map((t, i) => (
                <div key={i} className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-center justify-between group">
                  <span className="text-xs sm:text-sm text-white font-bold">{t}</span>
                  <Link 
                    to={`/bare-acts`} 
                    className="text-[10px] font-semibold text-[#D4AF37] group-hover:underline flex items-center"
                  >
                    <span>Read Bare Act</span>
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Study Material / Short Notes notes */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-poppins text-xl font-bold text-white flex items-center gap-2 border-b border-[#1E293B] pb-4">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <span>Handwritten Outlines & Case briefs</span>
            </h2>
            <div className="space-y-4">
              {data.notes.map((n, i) => (
                <div key={i} className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{n}</h4>
                    <span className="text-[10px] text-slate-500 block">Study Module • 5-8 min reading time</span>
                  </div>
                  <Link 
                    to="/ai-assistant" 
                    className="px-3 py-1.5 bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/50 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all flex-shrink-0"
                  >
                    AI Explain
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Important Questions & Subject FAQs */}
        <div className="space-y-8">
          
          {/* Important Exam Questions */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 space-y-6">
            <h3 className="font-poppins text-lg font-bold text-white border-b border-[#1E293B] pb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>High-Frequency Exam Questions</span>
            </h3>
            <div className="space-y-4">
              {data.questions.map((q, i) => (
                <div key={i} className="p-4 bg-[#0B0F19] border border-slate-800 rounded-xl space-y-2">
                  <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">{q}</p>
                  <Link 
                    to="/ai-assistant" 
                    className="text-[10px] text-[#D4AF37] font-bold hover:underline block"
                  >
                    Generate Model Answer with Gemini AI →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Course Subject FAQs */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 space-y-6">
            <h3 className="font-poppins text-lg font-bold text-white border-b border-[#1E293B] pb-4">
              Syllabus Study FAQs
            </h3>
            <div className="space-y-4">
              {sampleFAQs.map((faq, i) => (
                <div key={i} className="space-y-1">
                  <span className="block text-xs font-bold text-[#D4AF37]">{faq.q}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Subject Outlines Links */}
          <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <h3 className="font-poppins text-sm font-bold uppercase tracking-wider text-white">
              Related Semester Outlines
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-[#D4AF37]">
              <li><Link to="/subject/consti-1" className="hover:underline block">Constitutional Law of India - I</Link></li>
              <li><Link to="/subject/contracts-1" className="hover:underline block">Law of Contracts & Specific Relief</Link></li>
              <li><Link to="/subject/torts" className="hover:underline block">Principles of Law of Torts</Link></li>
              <li><Link to="/subject/crimes-1" className="hover:underline block">Criminal Law provisions under BNS 2023</Link></li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
