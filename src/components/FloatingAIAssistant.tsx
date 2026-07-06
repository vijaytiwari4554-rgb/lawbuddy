import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Scale, X, Minimize2, Send, Copy, Check, RotateCw, Trash2, Maximize2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

// High-fidelity local Markdown and Code parser to prevent rendering issues in React 19
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  const blocks = text.split("\n\n");

  return (
    <div className="space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Code Block Block
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          let code = "";
          let lang = "code";
          if (lines[0].startsWith("```")) {
            lang = lines[0].replace("```", "").trim() || "code";
            code = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined).join("\n");
          } else {
            code = trimmed.replace(/```/g, "");
          }
          return (
            <div key={i} className="my-3 rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#070A11] text-xs font-mono">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#111625] text-slate-400 border-b border-[#D4AF37]/10 text-[10px]">
                <span className="uppercase text-[#D4AF37] font-semibold">{lang}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1"
                  title="Copy code"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-[#E2E8F0] whitespace-pre-wrap break-all"><code>{code}</code></pre>
            </div>
          );
        }

        // Header Block
        if (trimmed.startsWith("#")) {
          const level = (trimmed.match(/^#+/) || ["#"])[0].length;
          const headerText = trimmed.replace(/^#+\s*/, "");
          const sizeClass = level === 1 ? "text-base sm:text-lg font-bold text-[#D4AF37]" : level === 2 ? "text-sm sm:text-base font-bold text-[#D4AF37]" : "text-xs sm:text-sm font-semibold text-[#D4AF37]";
          return (
            <h4 key={i} className={`mt-3 mb-1 font-poppins font-semibold border-b border-[#D4AF37]/10 pb-0.5 ${sizeClass}`}>
              {parseInline(headerText)}
            </h4>
          );
        }

        // Bullet list block
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.match(/^\d+\.\s/)) {
          const lines = trimmed.split("\n");
          return (
            <ul key={i} className="list-none space-y-2 pl-1 my-2">
              {lines.map((line, li) => {
                const isOrdered = line.match(/^\d+\.\s/);
                const itemText = line.replace(/^[-*\d.]+\s+/, "");
                return (
                  <li key={li} className="flex items-start space-x-2">
                    {isOrdered ? (
                      <span className="text-[#D4AF37] font-bold text-xs mt-0.5 min-w-[16px]">{isOrdered[0].trim()}</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                    )}
                    <span className="flex-1 text-slate-200 dark:text-slate-200">{parseInline(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Table Block
        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
          const lines = trimmed.split("\n");
          const headerLine = lines[0];
          const rows = lines.slice(2).filter(r => r.trim() && r.includes("|"));
          const headers = headerLine.split("|").map(h => h.trim()).filter(h => h);
          return (
            <div key={i} className="my-3 overflow-x-auto rounded-lg border border-[#D4AF37]/15">
              <table className="min-w-full text-[11px] sm:text-xs text-left divide-y divide-[#D4AF37]/10">
                <thead className="bg-[#D4AF37]/5">
                  <tr>
                    {headers.map((h, hi) => (
                      <th key={hi} className="px-3 py-2 text-[#D4AF37] font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/10 bg-black/10">
                  {rows.map((row, ri) => {
                    const cells = row.split("|").map(c => c.trim()).filter((_, ci) => ci > 0 && ci <= headers.length);
                    if (cells.length === 0) return null;
                    return (
                      <tr key={ri} className="hover:bg-[#D4AF37]/5 transition-colors">
                        {cells.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-slate-300">{parseInline(cell)}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }

        // Regular paragraph block
        return <p key={i} className="mb-2.5 leading-relaxed text-slate-200 dark:text-slate-200">{parseInline(trimmed)}</p>;
      })}
    </div>
  );
};

// Inline parsing helper
function parseInline(text: string) {
  const parts = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    const boldMatch = currentText.match(/\*\*([^*]+)\*\*/);
    const codeMatch = currentText.match(/`([^`]+)`/);

    let firstMatch = null;
    let matchType = "";

    if (boldMatch && (!codeMatch || boldMatch.index! < codeMatch.index!)) {
      firstMatch = boldMatch;
      matchType = "bold";
    } else if (codeMatch) {
      firstMatch = codeMatch;
      matchType = "code";
    }

    if (firstMatch) {
      const index = firstMatch.index!;
      if (index > 0) {
        parts.push(<span key={key++}>{currentText.slice(0, index)}</span>);
      }

      if (matchType === "bold") {
        parts.push(
          <strong key={key++} className="font-bold text-[#D4AF37]">
            {firstMatch[1]}
          </strong>
        );
      } else {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 rounded font-mono text-xs bg-[#070A11]/70 text-[#D4AF37] border border-[#D4AF37]/15">
            {firstMatch[1]}
          </code>
        );
      }

      currentText = currentText.slice(index + firstMatch[0].length);
    } else {
      parts.push(<span key={key++}>{currentText}</span>);
      break;
    }
  }

  return parts;
}

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export const FloatingAIAssistant: React.FC = () => {
  const { isDarkMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Namaste! I am **LawBuddy AI**, India's Professional Legal Education Assistant. 🎓\n\nI can help you analyze Indian codes, explain Bare Acts, generate custom LLB notes, compare laws, and prepare Judiciary Exam MCQs!\n\nHow can I support your legal education today?\n\n*Educational and informational guidance only.*",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestedQuestions = [
    "Explain Section 299 BNS.",
    "Difference between IPC and BNS.",
    "Summarize Kesavananda Bharati case.",
    "Explain the Doctrine of Basic Structure.",
    "Generate LLB Semester 1 notes.",
    "Create Judiciary MCQs."
  ];

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Adjust input textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = async (textToSend?: string) => {
    const finalQuery = (textToSend || input).trim();
    if (!finalQuery || isLoading) return;

    if (!textToSend) setInput("");

    const userMessage: Message = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      text: finalQuery,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build previous message history context for API call
      // Filter the last 10 messages for context window size optimization
      const contextHistory = messages
        .filter((msg) => msg.id !== "welcome")
        .slice(-10)
        .map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          content: msg.text
        }));

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "chat",
          prompt: finalQuery,
          history: contextHistory
        })
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: `msg-${Date.now()}-b`,
          role: "model",
          text: data.response || "No response received.",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to receive legal response from LawBuddy AI server.");
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-err`,
        role: "model",
        text: `⚠️ **Server connection error:** ${error.message || "An unexpected error occurred while communicating with LawBuddy API. Please verify your GEMINI_API_KEY."}`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear your current conversation history?")) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Namaste! I am **LawBuddy AI**, India's Professional Legal Education Assistant. 🎓\n\nI can help you analyze Indian codes, explain Bare Acts, generate custom LLB notes, compare laws, and prepare Judiciary Exam MCQs!\n\nHow can I support your legal education today?\n\n*Educational and informational guidance only.*",
          timestamp: new Date()
        }
      ]);
    }
  };

  const regenerateResponse = async () => {
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length === 0 || isLoading) return;

    const lastUserQuery = userMessages[userMessages.length - 1].text;
    
    // Remove the last bot response if it exists
    setMessages((prev) => {
      const updated = [...prev];
      if (updated[updated.length - 1].role === "model") {
        updated.pop();
      }
      return updated;
    });

    handleSend(lastUserQuery);
  };

  return (
    <div id="lawbuddy-ai-root" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* TOOLTIP */}
      <AnimatePresence>
        {isTooltipVisible && !isOpen && (
          <motion.div
            id="lawbuddy-ai-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute right-0 bottom-16 mb-2 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap shadow-md border pointer-events-none transition-colors ${
              isDarkMode 
                ? "bg-[#121826]/95 border-[#D4AF37]/30 text-[#D4AF37]" 
                : "bg-white/95 border-[#D4AF37]/30 text-[#C5A028]"
            }`}
          >
            Ask LawBuddy AI ✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING LAUNCHER BUTTON */}
      <motion.button
        id="lawbuddy-ai-launcher"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-xl relative focus:outline-none bg-gradient-to-tr from-[#0F1423] via-[#0B0F19] to-[#121826] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] gold-glow pulse-ring`}
        style={{
          boxShadow: "0 0 15px rgba(212, 175, 55, 0.25)"
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="ai-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Scale className="w-6 h-6 text-[#D4AF37]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle decorative pulsing badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
          </span>
        )}
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            id="lawbuddy-ai-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`fixed bottom-24 right-0 sm:right-0 w-full sm:w-[420px] h-[85vh] sm:h-[70vh] max-h-[640px] sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col z-50 overflow-hidden border transition-colors duration-300 ${
              isDarkMode 
                ? "bg-[#0B0F19]/95 backdrop-blur-md border-[#D4AF37]/20 text-[#F8FAFC]" 
                : "bg-white/95 backdrop-blur-md border-[#D4AF37]/30 text-[#0F172A]"
            }`}
            style={{
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.15)"
            }}
          >
            
            {/* CHAT HEADER */}
            <div className={`p-4 flex items-center justify-between border-b transition-colors bg-[#080B13] border-[#D4AF37]/20`}>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-poppins text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    LawBuddy AI
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">PRO</span>
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Powered by Google Gemini 3.5</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  id="minimize-chat-btn"
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-md text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 transition-colors"
                  title="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CHAT BODY (SCROLLABLE MESSAGES) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-500/10">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[85%] flex flex-col space-y-1">
                    
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm relative group transition-colors shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0B0F19] font-medium rounded-tr-none"
                          : isDarkMode
                            ? "bg-[#121826] border border-white/5 text-slate-100 rounded-tl-none"
                            : "bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      {msg.role === "model" ? (
                        <MarkdownRenderer text={msg.text} />
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}

                      {/* Hover action toolbar for bot messages */}
                      {msg.role === "model" && msg.id !== "welcome" && (
                        <div className="absolute right-2 bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 bg-[#0B0F19]/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-[#D4AF37]/20">
                          <button
                            onClick={() => copyToClipboard(msg.id, msg.text)}
                            className="text-slate-400 hover:text-[#D4AF37] transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className={`text-[9px] text-slate-500 self-end ${msg.role === "user" ? "mr-1" : "ml-1"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot Loading / Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] flex flex-col space-y-1">
                    <div className={`px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5 ${
                      isDarkMode ? "bg-[#121826] border border-white/5" : "bg-slate-100 border border-slate-200"
                    }`}>
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-medium tracking-wide">Analysing legal references...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions Panel (Rendered only if chat history is fresh or minimal) */}
              {messages.length <= 1 && !isLoading && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">Suggested Topics</span>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all hover:scale-[1.01] flex items-center space-x-2 ${
                          isDarkMode
                            ? "bg-[#121826]/40 border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#121826] text-slate-300"
                            : "bg-slate-50 border-slate-200 hover:border-[#D4AF37]/30 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span className="truncate">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS TOOLBAR */}
            {messages.length > 1 && (
              <div className="px-4 py-1.5 border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 transition-colors bg-black/10">
                <button
                  onClick={clearChat}
                  className="flex items-center space-x-1.5 hover:text-red-400 transition-colors font-medium"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Chat</span>
                </button>

                {!isLoading && (
                  <button
                    onClick={regenerateResponse}
                    className="flex items-center space-x-1.5 hover:text-[#D4AF37] transition-colors font-medium"
                    title="Regenerate last response"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Regenerate Response</span>
                  </button>
                )}
              </div>
            )}

            {/* CHAT INPUT AREA */}
            <div className={`p-3 border-t transition-colors ${
              isDarkMode ? "bg-[#090D18] border-white/5" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-end space-x-2 relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Sections, BNS, Case analysis..."
                  className={`flex-1 pl-3 pr-10 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none overflow-hidden max-h-24 ${
                    isDarkMode
                      ? "bg-[#121826] border border-white/5 text-white placeholder-slate-500"
                      : "bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                  disabled={isLoading}
                />
                
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    input.trim() && !isLoading
                      ? "bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19]"
                      : "bg-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[8px] text-center text-slate-500 mt-1.5 font-medium">
                Verify important provisions with the official Bare Acts and official judgments.
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* MINIMIZED PILL TRIGGER */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            id="lawbuddy-ai-minimized-pill"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            className={`fixed bottom-6 right-24 py-2.5 px-4 rounded-xl shadow-lg border cursor-pointer hover:border-[#D4AF37] transition-all flex items-center space-x-2.5 font-poppins text-xs font-bold z-50 ${
              isDarkMode 
                ? "bg-[#0B0F19] border-[#D4AF37]/30 text-white" 
                : "bg-white border-[#D4AF37]/30 text-slate-800"
            }`}
            style={{
              boxShadow: "0 4px 15px rgba(212, 175, 55, 0.15)"
            }}
          >
            <div className="w-5 h-5 rounded-md bg-[#D4AF37]/10 flex items-center justify-center">
              <Scale className="w-3 h-3 text-[#D4AF37]" />
            </div>
            <span>LawBuddy AI (Minimized)</span>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
