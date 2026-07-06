import React, { useState } from "react";
import { Search, Filter, Clipboard, Download, Eye, ArrowUpDown } from "lucide-react";
import { UNIVERSITIES } from "../data/legalData";
import { useApp } from "../context/AppContext";

interface PaperMock {
  id: string;
  title: string;
  subject: string;
  university: string;
  year: number;
  semester: number;
  marks: number;
}

export const QuestionPapers: React.FC = () => {
  const { recordDownload, isDarkMode } = useApp();
  
  // State variables for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("All");

  const papersMock: PaperMock[] = [
    { id: "p1", title: "Law of Contracts - I", subject: "Contracts", university: "Mumbai University", year: 2024, semester: 1, marks: 100 },
    { id: "p2", title: "Constitutional Law of India - I", subject: "Constitution", university: "Delhi University", year: 2024, semester: 1, marks: 100 },
    { id: "p3", title: "Law of Crimes - I (Penal Code / BNS)", subject: "Criminal Law", university: "GLC Mumbai", year: 2024, semester: 2, marks: 100 },
    { id: "p4", title: "Law of Torts & Consumer Protection", subject: "Torts", university: "ILS Pune", year: 2024, semester: 2, marks: 100 },
    
    { id: "p5", title: "Law of Contracts - I", subject: "Contracts", university: "Mumbai University", year: 2023, semester: 1, marks: 100 },
    { id: "p6", title: "Constitutional Law of India - I", subject: "Constitution", university: "Delhi University", year: 2023, semester: 1, marks: 100 },
    { id: "p7", title: "Law of Crimes - I (IPC provisions)", subject: "Criminal Law", university: "GLC Mumbai", year: 2023, semester: 2, marks: 100 },
    { id: "p8", title: "Law of Torts", subject: "Torts", university: "ILS Pune", year: 2023, semester: 2, marks: 100 },

    { id: "p9", title: "Law of Contracts - I", subject: "Contracts", university: "Mumbai University", year: 2022, semester: 1, marks: 100 },
    { id: "p10", title: "Constitutional Law of India - I", subject: "Constitution", university: "Delhi University", year: 2022, semester: 1, marks: 100 }
  ];

  const handleDownload = (id: string, title: string) => {
    recordDownload(id, 'question_paper', title);
    alert(`Downloading ${title} PDF Question Paper successfully!`);
  };

  const handlePreview = (title: string) => {
    alert(`Opening High-fidelity PDF document preview for "${title}" inside LawBuddy interactive PDF viewer!`);
  };

  // Filter papers
  const filteredPapers = papersMock.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paper.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = selectedYear === "All" || paper.year.toString() === selectedYear;
    const matchesSemester = selectedSemester === "All" || paper.semester.toString() === selectedSemester;
    const matchesUni = selectedUniversity === "All" || paper.university.includes(selectedUniversity);

    return matchesSearch && matchesYear && matchesSemester && matchesUni;
  });

  return (
    <div id="question-papers-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className={`font-poppins text-3xl sm:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
          Previous Year <span className="gold-gradient-text">Question Papers</span>
        </h1>
        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Search, filter, preview, and download authentic university LLB examinations papers spanning multiple semesters and academic years.
        </p>
      </div>

      {/* FILTER SEARCH BAR BAR */}
      <div className={`p-6 border rounded-2xl space-y-4 shadow-xl ${
        isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
      }`}>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search bar input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input 
              id="paper-search-input"
              type="text" 
              placeholder="Search by subject, year, or university name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none placeholder-slate-500 transition-colors ${
                isDarkMode ? "bg-[#0B0F19] border-[#1E293B] focus:border-[#D4AF37] text-white" : "bg-slate-50 border-slate-200 focus:border-[#D4AF37] text-slate-800"
              }`}
            />
          </div>

          {/* Filters select inputs */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Year filter */}
            <div className={`flex items-center space-x-1.5 border px-3 py-1.5 rounded-xl ${
              isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
            }`}>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Year:</span>
              <select 
                id="filter-year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`bg-transparent text-xs font-semibold focus:outline-none cursor-pointer ${isDarkMode ? "text-white" : "text-slate-700"}`}
              >
                <option value="All" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>All Years</option>
                <option value="2024" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>2024</option>
                <option value="2023" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>2023</option>
                <option value="2022" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>2022</option>
              </select>
            </div>

            {/* Semester Filter */}
            <div className={`flex items-center space-x-1.5 border px-3 py-1.5 rounded-xl ${
              isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
            }`}>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Semester:</span>
              <select 
                id="filter-semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={`bg-transparent text-xs font-semibold focus:outline-none cursor-pointer ${isDarkMode ? "text-white" : "text-slate-700"}`}
              >
                <option value="All" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>All</option>
                <option value="1" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 1</option>
                <option value="2" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 2</option>
                <option value="3" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 3</option>
                <option value="4" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 4</option>
                <option value="5" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 5</option>
                <option value="6" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>Sem 6</option>
              </select>
            </div>

            {/* University Filter */}
            <div className={`flex items-center space-x-1.5 border px-3 py-1.5 rounded-xl ${
              isDarkMode ? "bg-[#0B0F19] border-[#1E293B]" : "bg-slate-50 border-slate-200"
            }`}>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Uni:</span>
              <select 
                id="filter-uni"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className={`bg-transparent text-xs font-semibold focus:outline-none cursor-pointer max-w-[120px] ${isDarkMode ? "text-white" : "text-slate-700"}`}
              >
                <option value="All" className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>All Unis</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni.id} value={uni.shortName} className={isDarkMode ? "bg-[#0B0F19]" : "bg-white"}>{uni.shortName}</option>
                ))}
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* QUESTION PAPERS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <div 
            key={paper.id}
            className={`p-5 border rounded-2xl flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm ${
              isDarkMode ? "bg-[#121826] border-[#1E293B] hover:border-[#D4AF37]/35" : "bg-white border-slate-200 hover:border-[#D4AF37]/50"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  {paper.university}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Year {paper.year}</span>
              </div>
              
              <div className="space-y-1">
                <h4 className={`font-poppins text-base font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  {paper.title} Examination Paper
                </h4>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Semester {paper.semester} • Max Marks: {paper.marks}</p>
              </div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t gap-4 ${isDarkMode ? "border-[#1E293B]" : "border-slate-100"}`}>
              <button 
                onClick={() => handlePreview(paper.title)}
                className={`px-4 py-2 border rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                  isDarkMode ? "bg-[#0B0F19] hover:bg-white/[0.03] text-slate-300 hover:text-white border-[#1E293B]" : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Web Preview</span>
              </button>

              <button 
                onClick={() => handleDownload(paper.id, paper.title)}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className={`col-span-full p-12 text-center border border-dashed rounded-2xl ${
            isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <Clipboard className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 className={`font-poppins text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>No exam papers found</h4>
            <p className="text-xs text-slate-400">Try modifying your filter settings or search query above.</p>
          </div>
        )}
      </div>

    </div>
  );
};
