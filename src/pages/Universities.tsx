import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, ChevronRight, School, BookOpen } from "lucide-react";
import { UNIVERSITIES } from "../data/legalData";

export const Universities: React.FC = () => {
  return (
    <div id="universities-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Curated Syllabus Hubs</span>
        </div>
        <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Syllabus-Aligned <span className="gold-gradient-text">Academic Portals</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Access specialized study programs tailored for major Indian State and National law universities. Download official previous year papers, semester assignment sheets, and study notes.
        </p>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {UNIVERSITIES.map((uni) => (
          <Link 
            key={uni.id} 
            to={`/university/${uni.id}`}
            className="group flex flex-col justify-between p-6 bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/50 rounded-2xl transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          >
            {/* Visual background gradient accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-bl-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center font-bold text-[#D4AF37] text-lg border border-[#D4AF37]/25 group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] transition-all duration-300">
                  {uni.shortName}
                </div>
                <div className="flex items-center text-xs font-semibold text-slate-500 bg-[#0B0F19] border border-[#1E293B] px-3 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-[#D4AF37] mr-1" />
                  <span>{uni.location.split(",")[0]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-poppins text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {uni.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {uni.description}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-400 font-semibold relative z-10">
              <span className="text-[#D4AF37] flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5" />
                <span>{uni.semesters} Semesters syllabus</span>
              </span>
              <span className="flex items-center text-[#D4AF37] group-hover:underline">
                <span>Open Portal</span>
                <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};
