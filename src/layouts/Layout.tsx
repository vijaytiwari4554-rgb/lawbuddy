import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Scale, Search, Menu, X, User, LogOut, Sun, Moon, 
  BookOpen, FileText, Bookmark, Award, HelpCircle, 
  Send, ShieldAlert, FileSignature, Map, Mail, Phone, ExternalLink,
  Sparkles, Download
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import { FloatingAIAssistant } from "../components/FloatingAIAssistant";

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
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header 
        id="navbar-header" 
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          isScrolled 
            ? isDarkMode 
              ? "border-white/10 bg-[#0B0F19]/90 backdrop-blur-md shadow-lg shadow-[#D4AF37]/5" 
              : "border-slate-200 bg-white/95 backdrop-blur-md shadow-md shadow-black/5"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo (Universal) */}
            <Link id="navbar-logo" to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDarkMode ? "bg-[#0B0F19]" : "bg-white"}`}>
                  <Scale className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`font-poppins text-xl font-bold tracking-tight group-hover:text-[#D4AF37] transition-colors duration-200 ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
                  Law<span className="text-[#D4AF37]">Buddy</span>
                </span>
                <span className={`text-[9px] tracking-wider font-medium uppercase -mt-1 hidden sm:block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  India's Legal Learning Platform
                </span>
              </div>
            </Link>

            {/* Desktop-Only Search and Navigation (Visible on screen widths >= 1024px) */}
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center px-6">
              {/* Desktop Large Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xs w-full">
                <Search className={`absolute left-3 top-2.5 w-4 h-4 pointer-events-none ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
                <input
                  type="text"
                  placeholder="Search topics, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 focus:border-[#D4AF37] rounded-xl text-xs focus:outline-none transition-colors ${
                    isDarkMode 
                      ? "bg-[#121826]/75 border border-[#1E293B] text-white placeholder-slate-500" 
                      : "bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </form>

              {/* Desktop Menu Links */}
              <nav id="desktop-nav" className="flex items-center space-x-1">
                {navLinks.slice(0, 7).map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isActive 
                          ? "text-[#D4AF37] bg-white/[0.04] border border-[#D4AF37]/20" 
                          : isDarkMode 
                            ? "text-slate-300 hover:text-white hover:bg-white/[0.02]" 
                            : "text-slate-600 hover:text-[#0B0F19] hover:bg-slate-100"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT SIDEBAR ACTIONS (Responsive: Mobile shows simplified icons; Desktop shows full profiles) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Search Trigger Icon (Universal) */}
              <button 
                id="search-toggle-btn"
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/[0.05]" : "text-slate-600 hover:text-[#0B0F19] hover:bg-slate-100"}`}
                title="Search everything"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle Icon (Universal) */}
              <button 
                id="darkmode-toggle-btn"
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/[0.05]" : "text-slate-600 hover:text-[#0B0F19] hover:bg-slate-100"}`}
                title="Toggle Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5 text-slate-500" />}
              </button>

              {/* USER PROFILE / COMPACT LOGIN ICON (Universal) */}
              {userProfile ? (
                <Link 
                  id="user-dashboard-link"
                  to="/profile" 
                  className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isDarkMode 
                      ? "bg-[#121826] border border-[#1E293B] hover:border-[#D4AF37]/40" 
                      : "bg-slate-100 border border-slate-200 hover:border-[#D4AF37]/40"
                  }`}
                  title="My Student Dashboard"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#0B0F19] font-bold text-xs overflow-hidden">
                    {userProfile.photoURL ? (
                      <img src={userProfile.photoURL} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      userProfile.displayName ? userProfile.displayName[0].toUpperCase() : "U"
                    )}
                  </div>
                </Link>
              ) : (
                <Link 
                  id="navbar-login-btn"
                  to="/login" 
                  className={`p-2 rounded-lg transition-all flex items-center justify-center ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/[0.05]" : "text-slate-600 hover:text-[#0B0F19] hover:bg-slate-100"}`}
                  title="Login to Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Hamburger Button (Always visible below 1024px) */}
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/[0.05]" : "text-slate-600 hover:text-[#0B0F19] hover:bg-slate-100"}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER (Slide in from Left, beautiful glassmorphism/luxury finish) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop click-to-close overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Main drawer body sliding from the left */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 shadow-2xl flex flex-col lg:hidden transition-colors duration-300 ${
                isDarkMode ? "bg-[#0B0F19] border-r border-white/10" : "bg-white border-r border-slate-200"
              }`}
            >
              {/* Drawer Title & Close Button */}
              <div className={`flex items-center justify-between p-5 border-b transition-colors ${isDarkMode ? "border-[#1E293B]" : "border-slate-100"}`}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] p-[1.5px]">
                    <div className={`w-full h-full rounded-[7px] flex items-center justify-center ${isDarkMode ? "bg-[#0B0F19]" : "bg-white"}`}>
                      <Scale className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>
                  <span className={`font-poppins text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>
                    Law<span className="text-[#D4AF37]">Buddy</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode ? "text-slate-400 hover:text-white hover:bg-white/[0.05]" : "text-slate-500 hover:text-[#0B0F19] hover:bg-slate-100"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Drawer Menu Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                
                {/* Section 1: Main Platform */}
                <div className="space-y-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 block mb-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Main Navigation</span>
                  
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Scale className="w-4 h-4 text-[#D4AF37]" />
                    <span>Home</span>
                  </Link>
                  
                  <Link to="/universities" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Map className="w-4 h-4 text-[#D4AF37]" />
                    <span>Universities</span>
                  </Link>

                  <Link to="/notes" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>LLB Notes</span>
                  </Link>

                  <Link to="/notes" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>Semester Notes</span>
                  </Link>

                  <Link to="/question-papers" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <FileSignature className="w-4 h-4 text-[#D4AF37]" />
                    <span>Question Papers</span>
                  </Link>
                </div>

                {/* Section 2: Codes and Holdings */}
                <div className="space-y-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 block mb-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Statutes & Case Laws</span>
                  
                  <Link to="/bare-acts" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>Bare Acts</span>
                  </Link>

                  <Link to="/case-laws" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>Case Laws</span>
                  </Link>

                  <Link to="/judiciary" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                    <span>Judiciary</span>
                  </Link>

                  <Link to="/premium" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Premium Notes</span>
                  </Link>
                </div>

                {/* Section 3: Profile Tabs */}
                <div className="space-y-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 block mb-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Student Dashboard</span>
                  
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Downloads</span>
                  </Link>

                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                    <span>Bookmarks</span>
                  </Link>
                </div>

                {/* Section 4: Policy & Legal details */}
                <div className="space-y-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 block mb-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>LawBuddy Info</span>
                  
                  <Link to="/compliance" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>About</span>
                  </Link>

                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>Contact</span>
                  </Link>

                  <Link to="/compliance" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                    <span>Privacy Policy</span>
                  </Link>

                  <Link to="/compliance" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? "text-slate-300 hover:text-[#D4AF37] hover:bg-white/[0.02]" : "text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50"}`}>
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>Terms</span>
                  </Link>
                </div>

              </div>

              {/* Drawer Profile Signout Footer */}
              <div className={`p-4 border-t transition-colors ${isDarkMode ? "border-[#1E293B] bg-[#0E1322]" : "border-slate-100 bg-slate-50"}`}>
                {userProfile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#0B0F19] font-bold text-xs overflow-hidden">
                        {userProfile.photoURL ? (
                          <img src={userProfile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          userProfile.displayName ? userProfile.displayName[0].toUpperCase() : "U"
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold max-w-[120px] truncate ${isDarkMode ? "text-white" : "text-slate-800"}`}>{userProfile.displayName}</span>
                        <span className="text-[9px] text-[#D4AF37] uppercase font-bold">{userProfile.premiumStatus} Scholar</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-[#EF4444] hover:bg-red-500/10 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Login / Sign Up</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
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
            className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 transition-colors ${isDarkMode ? "bg-[#0B0F19]/90" : "bg-white/90"}`}
          >
            <div className={`w-full max-w-2xl border rounded-2xl p-6 relative shadow-2xl gold-glow transition-colors ${
              isDarkMode ? "bg-[#121826] border-[#1E293B]" : "bg-white border-slate-200"
            }`}>
              <button 
                id="close-search-btn"
                onClick={() => setIsSearchOpen(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-[#0B0F19] hover:bg-slate-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className={`font-poppins text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#0B0F19]"}`}>Search LawBuddy Library</h3>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input 
                  id="search-modal-input"
                  type="text" 
                  placeholder="Search Universities, Notes, Bare Acts, Case Laws..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 px-4 py-3 border rounded-xl placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                    isDarkMode ? "bg-[#0B0F19] border-[#1E293B] text-white" : "bg-slate-100 border-slate-200 text-slate-900"
                  }`}
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
              <div className={`mt-4 text-xs flex flex-wrap gap-2 items-center ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                <span>Trending:</span>
                {["BNS 2023", "Article 21", "Kesavananda Bharati", "Contract Act Sec 10", "Semester 3 notes"].map((t) => (
                  <button 
                    key={t}
                    onClick={() => {
                      setSearchQuery(t);
                    }}
                    className={`px-2 py-1 rounded transition-colors ${
                      isDarkMode ? "bg-[#1E293B] text-[#D4AF37] hover:bg-[#D4AF37]/10" : "bg-slate-100 text-[#C5A028] hover:bg-slate-200"
                    }`}
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
        <FloatingAIAssistant />
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
