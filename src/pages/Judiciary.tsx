import React, { useState } from "react";
import { DAILY_QUIZZES } from "../data/legalData";
import { 
  GraduationCap, Clipboard, FileText, Award, BookOpen, 
  CheckCircle, XCircle, Flame, RefreshCw, Calendar, Book 
} from "lucide-react";

export const Judiciary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'planner' | 'mocks' | 'affairs'>('quiz');
  
  // Interactive Quiz Engine State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [streakCount, setStreakCount] = useState(4); // mock current streak

  const activeQuestion = DAILY_QUIZZES[currentQuizIdx] || DAILY_QUIZZES[0];

  const handleOptionSelect = (idx: number) => {
    if (quizAnswered) return;
    setSelectedOption(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || quizAnswered) return;
    setQuizAnswered(true);
    if (selectedOption === activeQuestion.correctOptionIndex) {
      setQuizScore((prev) => prev + 1);
      setStreakCount((prev) => prev + 1);
    } else {
      setStreakCount(0); // break streak
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setQuizAnswered(false);
    setCurrentQuizIdx((prev) => (prev + 1) % DAILY_QUIZZES.length);
  };

  const currentAffairsMock = [
    {
      title: "Enforcement of Bharatiya Nyaya Sanhita, 2023",
      date: "July 1, 2024",
      desc: "The Union Ministry of Home Affairs announced the formal implementation of BNS, BNSS, and BSA across India, replacing IPC, CrPC, and Indian Evidence Act."
    },
    {
      title: "Supreme Court Ruling on Right to Clean Environment",
      date: "April 2024",
      desc: "The Supreme Court expanded Article 21 to formally encompass protection against climate change adverse impacts as an integral fundamental liberty."
    }
  ];

  const mockTestsMock = [
    { id: "m1", title: "Judiciary Prelims Mock Test - Civil Law I", questions: 100, duration: "120 mins" },
    { id: "m2", title: "Judiciary Prelims Mock Test - Criminal Law II", questions: 100, duration: "120 mins" }
  ];

  const studyPlannerMock = [
    { day: "Monday & Tuesday", task: "Constitutional Law (Articles 12 to 35) & Landmark Precedents" },
    { day: "Wednesday", task: "Bharatiya Nyaya Sanhita (Offenses against body, Sections 100-146)" },
    { day: "Thursday & Friday", task: "Indian Contract Act (General Principles, Sections 1 to 75)" },
    { day: "Saturday", task: "Mock Practice and Current Affairs dossier summaries" }
  ];

  return (
    <div id="judiciary-prep-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#121826] to-[#1e2a3f] border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 animate-bounce" />
            <span>PCS-J Elite Exam Prep</span>
          </div>
          <h1 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-black text-white">
            State Judicial Services <span className="gold-gradient-text">Prep Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Practice interactive daily quizzes, track your exam preparation study plans, review monthly legal current affairs, and take simulated prelims mock tests.
          </p>
        </div>

        <div className="flex items-center bg-[#0B0F19] border border-[#1E293B] px-5 py-4 rounded-2xl flex-shrink-0 relative z-10">
          <Flame className="w-8 h-8 text-[#D4AF37] mr-3 animate-pulse" />
          <div className="text-left">
            <span className="block text-[#D4AF37] text-2xl font-black">{streakCount} Days</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Daily Study Streak</span>
          </div>
        </div>
      </div>

      {/* TABS CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#1E293B] pb-4">
        {[
          { id: 'quiz', label: "Daily Legal MCQ Quiz", icon: Award },
          { id: 'planner', label: "Study Planner Layout", icon: Calendar },
          { id: 'mocks', label: "Mock Test Series", icon: Clipboard },
          { id: 'affairs', label: "Legal Current Affairs", icon: BookOpen }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* CORE WORKSPACE CONTENT PANEL */}
      <div className="bg-[#121826] border border-[#1E293B] rounded-2xl p-6 sm:p-8 min-h-[400px] shadow-xl">
        
        {/* TAB 1: DAILY MCQ QUIZ */}
        {activeTab === "quiz" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Quiz panel question */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase">Question {currentQuizIdx + 1} of {DAILY_QUIZZES.length}</span>
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">{activeQuestion.subject}</span>
              </div>

              <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-2">
                <h3 className="font-poppins text-base sm:text-lg font-bold text-white leading-relaxed">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctOptionIndex;
                  const showSuccess = quizAnswered && isCorrect;
                  const showFailure = quizAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={quizAnswered}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold transition-all ${
                        showSuccess 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                          : showFailure 
                            ? "bg-red-500/10 border-red-500 text-red-400" 
                            : isSelected 
                              ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]" 
                              : "bg-[#0B0F19]/40 border-slate-800 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <span>{option}</span>
                      {showSuccess && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />}
                      {showFailure && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons bar */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
                {!quizAnswered ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null}
                    className="px-6 py-3 bg-[#D4AF37] disabled:opacity-50 text-[#0B0F19] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-[#1E293B] hover:bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/40 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Next Question</span>
                  </button>
                )}

                <div className="text-xs font-semibold text-slate-500">
                  Total Score: <span className="text-[#D4AF37]">{quizScore} correct</span>
                </div>
              </div>

            </div>

            {/* Explanation box on right (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-2xl space-y-4">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Legal Analysis Brief</span>
                {quizAnswered ? (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-white block">Explanation & Statutes Citation:</span>
                    <p className="text-xs text-slate-400 leading-relaxed leading-relaxed whitespace-pre-wrap">
                      {activeQuestion.explanation}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-600 text-xs">
                    <Clipboard className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <span>Submit your answer to unlock official statutory explanation and precedent references.</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STUDY PLANNER */}
        {activeTab === "planner" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Recommended Judiciary Preparation Planner</h3>
              <p className="text-xs text-slate-400 mt-1">A weekly structured study schedule mapped to syllabus requirements of Punjab, UP, Delhi, and Maharashtra services.</p>
            </div>
            <div className="space-y-4">
              {studyPlannerMock.map((plan, idx) => (
                <div key={idx} className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase">{plan.day}</span>
                    <h4 className="text-sm font-semibold text-slate-300 leading-relaxed">{plan.task}</h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold bg-[#121826] px-3 py-1 rounded-full uppercase border border-[#1E293B]">
                    Recommended: 6 Hours daily
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MOCK TESTS */}
        {activeTab === "mocks" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Full-Length Simulated Prelims Mock Tests</h3>
              <p className="text-xs text-slate-400 mt-1">Take real-time simulated assessment tests to analyze national competitive score benchmarks.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTestsMock.map((mock) => (
                <div key={mock.id} className="p-6 bg-[#0B0F19] border border-[#1E293B] hover:border-[#D4AF37]/45 rounded-2xl transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <Clipboard className="w-8 h-8 text-[#D4AF37] mb-2" />
                    <h4 className="font-poppins text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">{mock.title}</h4>
                    <p className="text-xs text-slate-400">{mock.questions} Multiple Choice Questions • {mock.duration}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Starting simulated testing workspace for "${mock.title}". Standard timer rules are active.`)}
                    className="w-full mt-6 py-2.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] text-xs font-extrabold rounded-lg shadow-md"
                  >
                    Begin Mock Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CURRENT AFFAIRS */}
        {activeTab === "affairs" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins text-xl font-bold text-white">Monthly Legal Current Affairs Tracker</h3>
              <p className="text-xs text-slate-400 mt-1">Review important legal reforms, bills introduced, constitutional amendments, and apex court decisions.</p>
            </div>
            <div className="space-y-4">
              {currentAffairsMock.map((aff, i) => (
                <div key={i} className="p-5 bg-[#0B0F19] border border-[#1E293B] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{aff.title}</h4>
                    <span className="text-[10px] text-[#D4AF37] font-semibold">{aff.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed leading-relaxed">{aff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
