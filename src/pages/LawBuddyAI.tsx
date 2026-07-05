import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Send, Bot, User, Trash2, HelpCircle, 
  BookOpen, Scale, Award, Clipboard, ChevronRight 
} from "lucide-react";
import { useApp } from "../context/AppContext";

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const LawBuddyAI: React.FC = () => {
  const { currentUser, userProfile } = useApp();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      sender: 'assistant',
      text: "Namaste! I am LawBuddy AI, your advanced legal learning companion powered by Google Gemini. How can I assist you with your LLB semesters or State Judiciary preparation today?\n\nChoose an action tab below or ask any legal question directly!",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState<'chat' | 'summarize' | 'explain_act' | 'generate_notes' | 'create_mcqs' | 'explain_term'>('chat');
  const [aiContext, setAiContext] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiResponding]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isAiResponding) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsAiResponding(true);

    try {
      // Call our server-side API proxy
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: selectedAction,
          prompt: userMsg.text,
          context: aiContext
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, {
          id: `ai-msg-${Date.now()}`,
          sender: 'assistant',
          text: data.response,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } else {
        throw new Error(data.error || "An error occurred with Gemini API");
      }
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      setMessages((prev) => [...prev, {
        id: `ai-msg-err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ Error: Could not reach LawBuddy AI services. Details: ${err.message || "Server connection failure."}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleActionTabChange = (action: typeof selectedAction) => {
    setSelectedAction(action);
    // Suggest prompt based on action
    switch (action) {
      case "summarize":
        setInputMessage("Summarize the Lalita Kumari v. State of UP (2014) case.");
        setAiContext("Lalita Kumari registration of FIR guidelines");
        break;
      case "explain_act":
        setInputMessage("Explain Section 100 of the newly enacted Bharatiya Nyaya Sanhita, 2023.");
        setAiContext("BNS Section 100 on Culpable Homicide");
        break;
      case "generate_notes":
        setInputMessage("Generate complete revision study notes for 'Free Consent' and its elements under Contract Law.");
        setAiContext("Indian Contract Act, 1872");
        break;
      case "create_mcqs":
        setInputMessage("Create 5 legal reasoning MCQs on Article 21 and the right to life.");
        setAiContext("Constitutional Law");
        break;
      case "explain_term":
        setInputMessage("Explain the legal maxim 'Audi Alteram Partem' and how it is applied in Indian courts.");
        setAiContext("");
        break;
      default:
        setInputMessage("");
        setAiContext("");
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear your current conversation history?")) {
      setMessages([
        {
          id: "welcome-msg",
          sender: 'assistant',
          text: "Namaste! Chat cleared. How can I assist you with your legal studies today?",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  return (
    <div id="ai-assistant-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-bold rounded-full uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Gemini-Powered Assistance</span>
        </div>
        <h1 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
          LawBuddy <span className="gold-gradient-text">AI Assistant</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Unlock instant explanations, case law summaries, bare acts provision breakdowns, revision study notes, and judiciary test series MCQs.
        </p>
      </div>

      {/* QUICK ASSISTANCE SPECIALIZED TOOL TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#1E293B] pb-4">
        {[
          { id: 'chat', label: "General Chat", icon: Bot },
          { id: 'summarize', label: "Summarize Case Laws", icon: Award },
          { id: 'explain_act', label: "Explain Bare Acts", icon: Scale },
          { id: 'generate_notes', label: "Generate Notes", icon: BookOpen },
          { id: 'create_mcqs', label: "Create MCQs", icon: Clipboard },
          { id: 'explain_term', label: "Explain Legal Terms", icon: HelpCircle }
        ].map((tab) => {
          const isActive = selectedAction === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleActionTabChange(tab.id as any)}
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

      {/* CHAT INTERFACE AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] items-stretch">
        
        {/* Left column info pane (3 cols) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between bg-[#121826] border border-[#1E293B] rounded-2xl p-5 space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Assistant Mode</span>
            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-2">
              <span className="block text-xs font-bold text-[#D4AF37] uppercase">
                {selectedAction.replace("_", " ")}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {selectedAction === 'chat' && "Freeform legal discussion and study advice."}
                {selectedAction === 'summarize' && "Input a case name to get Facts, Issues, Judgment, and Ratio."}
                {selectedAction === 'explain_act' && "Get clear illustrations and judicial views on bare act sections."}
                {selectedAction === 'generate_notes' && "Generates university syllabus note layouts with IRAC templates."}
                {selectedAction === 'create_mcqs' && "Create 5 practice legal multiple choice tests with answers."}
                {selectedAction === 'explain_term' && "Unpack origin, definitions, and applications of legal maxims."}
              </p>
            </div>

            {/* Optional Context Field */}
            {selectedAction !== 'chat' && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Context / Act name</span>
                <input 
                  id="ai-context-input"
                  type="text" 
                  placeholder="e.g. Indian Contract Act, 1872" 
                  value={aiContext}
                  onChange={(e) => setAiContext(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}
          </div>

          <button 
            onClick={clearChat}
            className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Chat Session</span>
          </button>
        </div>

        {/* Right column chat terminal (9 cols) */}
        <div className="lg:col-span-9 flex flex-col bg-[#121826] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl h-full">
          
          {/* Chat Stage Header */}
          <div className="px-6 py-4 bg-[#0B0F19] border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">LawBuddy Gemini Agent</span>
                <span className="block text-[10px] text-emerald-400 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-1.5 animate-pulse" />
                  <span>Online & ready</span>
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stage */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'assistant';
              return (
                <div key={msg.id} className={`flex items-start gap-3.5 max-w-[85%] ${isAi ? "mr-auto" : "ml-auto flex-row-reverse"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isAi 
                      ? "bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37]" 
                      : "bg-[#D4AF37] text-[#0B0F19]"
                  }`}>
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi 
                        ? "bg-[#0B0F19] text-slate-200 border border-[#1E293B] rounded-tl-none whitespace-pre-wrap" 
                        : "bg-[#D4AF37] text-[#0B0F19] font-medium rounded-tr-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="block text-[9px] text-slate-500 font-semibold px-1">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {isAiResponding && (
              <div className="flex items-start gap-3.5 mr-auto">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-[#0B0F19] border border-[#1E293B] rounded-2xl rounded-tl-none flex items-center space-x-2.5">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Panel Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#0B0F19] border-t border-[#1E293B] flex items-center gap-2">
            <input 
              id="ai-terminal-input"
              type="text" 
              placeholder={`Send instructions or questions to LawBuddy AI...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#121826] border border-[#1E293B] focus:border-[#D4AF37] rounded-xl text-xs sm:text-sm text-white focus:outline-none placeholder-slate-500 transition-colors"
            />
            <button 
              id="ai-send-btn"
              type="submit" 
              disabled={isAiResponding || !inputMessage.trim()}
              className="p-3 bg-[#D4AF37] hover:bg-[#C5A028] disabled:opacity-50 text-[#0B0F19] rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
              title="Send Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
