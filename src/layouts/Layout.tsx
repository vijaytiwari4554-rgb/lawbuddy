import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Scale, Search, Menu, X, User, LogOut, Sun, Moon, 
  BookOpen, FileText, Bookmark, Award, HelpCircle, 
  Send, ShieldAlert, FileSignature, Map, Mail, Phone, ExternalLink 
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userProfile, isDarkMode, toggleDarkMode } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "LLB Notes", path: "/notes" },
    { name: "Question Papers", path: "/question-papers" },
    { name: "Bare Acts", path: "/bare-acts" },
    { name: "Case Laws", path: "/case-laws" },
    { name: "Judiciary", path: "/judiciary" },
    { name: "AI Assistant", path: "/ai-assistant" },
    { name: "Premium", path: "/premium" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-[#0B0F19] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none rounded-full" />

      {/* STICKY NAVBAR */}
      <header id="navbar-header" className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 border-white/10 bg-[#0B0F19]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link id="navbar-logo" to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-[10px] bg-[#0B0F19] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-200">
                  Law<span className="text-[#D4AF37]">Buddy</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-medium uppercase -mt-1 hidden sm:block">
                  India's Legal Learning Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? "text-[#D4AF37] bg-white/[0.04] border border-[#D4AF37]/20" 
                        : "text-slate-300 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Utility Icons & Profile */}
            <div className="flex items-center space-x-3">
              
              {/* Search Toggle */}
              <button 
                id="search-toggle-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Search everything"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button 
                id="darkmode-toggle-btn"
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Toggle Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5 text-slate-300" />}
              </button>

              {/* User Login/Dashboard */}
              {userProfile ? (
                <div className="relative group flex items-center space-x-2">
                  <Link 
                    id="user-dashboard-link"
                    to="/profile" 
                    className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/40 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#0B0F19] font-bold text-sm overflow-hidden">
                      {userProfile.photoURL ? (
                        <img src={userProfile.photoURL} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        userProfile.displayName ? userProfile.displayName[0].toUpperCase() : "U"
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-300 max-w-[80px] truncate hidden md:inline">
                      {userProfile.displayName}
                    </span>
                    {userProfile.premiumStatus !== "free" && (
                      <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">
                        {userProfile.premiumStatus}
                      </span>
                    )}
                  </Link>

                  <button 
                    id="logout-btn"
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#EF4444] hover:bg-red-500/10 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    to="/premium"
                    className="px-4 py-2 text-sm font-semibold border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-all hidden sm:block"
                  >
                    Premium
                  </Link>
                  <Link 
                    id="navbar-login-btn"
                    to="/login" 
                    className="px-5 py-2 text-sm font-semibold bg-[#D4AF37] text-[#0B0F19] rounded-lg hover:bg-[#c4a030] shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all flex items-center gap-1.5"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0D1322] border-b border-[#1E293B] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive 
                        ? "text-[#D4AF37] bg-white/[0.04]" 
                        : "text-slate-300 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            id="search-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-[#121826] border border-[#1E293B] rounded-2xl p-6 relative shadow-2xl gold-glow">
              <button 
                id="close-search-btn"
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-poppins text-lg font-semibold text-white mb-4">Search LawBuddy Library</h3>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input 
                  id="search-modal-input"
                  type="text" 
                  placeholder="Search Universities, Notes, Bare Acts, Case Laws..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  autoFocus
                />
                <button 
                  id="search-submit-btn"
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B0F19] font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Search
                </button>
              </form>
              <div className="mt-4 text-xs text-slate-400 flex flex-wrap gap-2 items-center">
                <span>Trending:</span>
                {["BNS 2023", "Article 21", "Kesavananda Bharati", "Contract Act Sec 10", "Semester 3 notes"].map((t) => (
                  <button 
                    key={t}
                    onClick={() => {
                      setSearchQuery(t);
                    }}
                    className="px-2 py-1 rounded bg-[#1E293B] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE APP WORKSPACE CONTENT */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer id="footer-section" className="relative z-10 border-t border-[#1E293B] bg-[#070A11] text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* About and Newsletter */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="font-poppins text-xl font-bold text-white">
                  Law<span className="text-[#D4AF37]">Buddy</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                LawBuddy is India's premium, state-of-the-art online legal education ecosystem. We empower law students, scholars, and judiciary aspirants with curated academic archives, bare acts, case analytical ratio, and an advanced legal assistant powered by Google Gemini.
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">Subscribe to Our Newsletter</span>
                {newsletterSubscribed ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <span>✓ Thank you for subscribing to LawBuddy insights!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm gap-2">
                    <input 
                      id="newsletter-email-input"
                      type="email" 
                      placeholder="Enter email address" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2 bg-[#121826] border border-[#1E293B] rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <button 
                      id="newsletter-submit-btn"
                      type="submit" 
                      className="p-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] rounded-xl transition-colors"
                      title="Subscribe"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Resources Map */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase text-white tracking-wider">Academic Portals</h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link to="/universities" className="hover:text-white transition-colors">All Indian Universities</Link></li>
                <li><Link to="/notes" className="hover:text-white transition-colors">LLB Syllabus Notes</Link></li>
                <li><Link to="/question-papers" className="hover:text-white transition-colors">Previous Year Papers</Link></li>
                <li><Link to="/bare-acts" className="hover:text-white transition-colors">Bare Act Library</Link></li>
                <li><Link to="/case-laws" className="hover:text-white transition-colors">Case Law Analytical Lexicon</Link></li>
              </ul>
            </div>

            {/* Exam Prep */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase text-white tracking-wider">Judiciary Exams</h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link to="/judiciary" className="hover:text-white transition-colors">Judiciary Study Planner</Link></li>
                <li><Link to="/judiciary?tab=quiz" className="hover:text-white transition-colors">Daily Legal MCQ Quiz</Link></li>
                <li><Link to="/judiciary?tab=mocks" className="hover:text-white transition-colors">Mock Test Series</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-white transition-colors">LawBuddy Gemini AI Chat</Link></li>
                <li><Link to="/premium" className="hover:text-white transition-colors">Premium Membership plans</Link></li>
              </ul>
            </div>

            {/* Legal Disclaimers & Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase text-white tracking-wider">Legal & Compliance</h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link to="/contact" className="hover:text-white transition-colors">Help & Support</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
                <li><Link to="/dmca" className="hover:text-white transition-colors">DMCA & Fair Use</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap XML</Link></li>
              </ul>
            </div>

          </div>

          <hr className="border-[#1E293B] my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between text-xs gap-4">
            <p>© {new Date().getFullYear()} LawBuddy. All rights reserved. Created with absolute precision as India's Legal Learning Platform.</p>
            
            <div className="flex items-center space-x-6 text-slate-500 font-semibold">
              <span className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                <span>support@lawbuddy.in</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 11 4050 9988</span>
              </span>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="mt-6 p-4 rounded-xl bg-[#121826]/60 border border-[#1E293B] text-[10px] text-slate-500 leading-relaxed">
            <span className="font-bold text-[#D4AF37] block mb-1">Disclaimer:</span>
            LawBuddy is an educational technology learning application designed solely for law students and study assistance. The reference notes, Bare Acts explanation, judicial case analysis, and responses from the LawBuddy Gemini AI Assistant do not constitute formal legal advice. No lawyer-client relationship is formed under any circumstances. For actual litigation counseling, please contact certified legal bar practitioners in your state jurisdiction.
          </div>

        </div>
      </footer>

    </div>
  );
};
