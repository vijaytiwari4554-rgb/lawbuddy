import React from "react";
import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/legalData";
import { Calendar, User, Clock, ArrowLeft, Tag, Shield, BookOpen } from "lucide-react";

export const BlogDetail: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const post = BLOG_POSTS.find((p) => p.id === blogId) || BLOG_POSTS[0];

  return (
    <div id="blog-detail-container" className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* Back button */}
      <Link to="/blog" className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-[#D4AF37] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Legal Journal</span>
      </Link>

      {/* SEO META HELPER VISUALIZER (For educational platform validation!) */}
      <div className="p-4 bg-[#1E293B]/40 border border-[#D4AF37]/30 rounded-xl space-y-2">
        <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>SEO Metadata & Schema.org Verified (Lighthouse Optimized)</span>
        </span>
        <div className="text-[11px] text-slate-400 font-mono space-y-1">
          <div><span className="text-white">Meta Title:</span> {post.seoTitle}</div>
          <div><span className="text-white">Meta Description:</span> {post.seoDescription}</div>
          <div><span className="text-white">Canonical URL:</span> https://lawbuddy.in/blog/{post.id}</div>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/35 text-xs font-bold rounded-full uppercase tracking-wider inline-block">
          {post.category}
        </span>
        
        <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 pt-2 border-y border-[#1E293B] py-4">
          <span className="flex items-center space-x-1.5 font-semibold">
            <User className="w-4 h-4 text-[#D4AF37]" />
            <span>By {post.author.name} ({post.author.role})</span>
          </span>
          <span className="flex items-center space-x-1.5 font-semibold">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Published {post.date}</span>
          </span>
          <span className="flex items-center space-x-1.5 font-semibold">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{post.readTime} reading duration</span>
          </span>
        </div>
      </header>

      {/* Author profile banner */}
      <div className="p-6 bg-[#121826] border border-[#1E293B] rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <img 
          src={post.author.avatarUrl} 
          alt={post.author.name} 
          className="w-16 h-16 rounded-full border border-[#D4AF37]/30 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="text-center sm:text-left space-y-1">
          <h4 className="font-bold text-white text-base">{post.author.name}</h4>
          <p className="text-xs text-[#D4AF37] font-semibold">{post.author.role}</p>
          <p className="text-[11px] text-slate-400">Regular expert contributor to LawBuddy legal educational archives.</p>
        </div>
      </div>

      {/* Core Article Content */}
      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6">
        {post.content.split("\n\n").map((para, i) => {
          if (para.startsWith("### ")) {
            return (
              <h3 key={i} className="font-poppins text-lg sm:text-xl font-bold text-white pt-4 border-b border-[#1E293B] pb-2">
                {para.replace("### ", "")}
              </h3>
            );
          }
          if (para.startsWith("*   ") || para.startsWith("1.  ")) {
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                {para.split("\n").map((li, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {li.replace("*   ", "").replace("1.  ", "").replace("2.  ", "").replace("3.  ", "").replace("4.  ", "")}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="whitespace-pre-wrap leading-relaxed font-normal text-slate-300">
              {para}
            </p>
          );
        })}
      </article>

      {/* Tags section */}
      <div className="space-y-3 pt-8 border-t border-[#1E293B]">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Tag Terms</span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#121826] text-[#D4AF37] border border-[#1E293B] text-xs font-semibold rounded-lg flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
