import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/legalData";
import { BookOpen, Calendar, User, Clock, ArrowRight, Tag } from "lucide-react";

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "New Criminal Laws", "Judiciary Prep"];

  const filteredPosts = selectedCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div id="blog-listing-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>LawBuddy Legal Journal</span>
        </div>
        <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Educative Legal <span className="gold-gradient-text">Articles & Analysis</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Deeply researched editorial perspectives, competitive syllabus outlines, and updates regarding newly enacted statutes.
        </p>
      </div>

      {/* CATEGORY SELECTOR */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedCategory === cat 
                ? "bg-[#D4AF37] text-[#0B0F19] border-[#D4AF37] font-bold" 
                : "bg-[#121826] text-slate-300 border-[#1E293B] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            className="group bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
          >
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[10px] text-slate-500 font-bold flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-poppins text-lg sm:text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Author widget */}
              <div className="flex items-center space-x-3 pt-4 border-t border-[#1E293B]">
                <img 
                  src={post.author.avatarUrl} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/30 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{post.author.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{post.author.role}</p>
                </div>
              </div>
            </div>

            {/* Read action footer */}
            <div className="px-6 py-4 bg-[#0B0F19]/40 border-t border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <Link 
                to={`/blog/${post.id}`}
                className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
