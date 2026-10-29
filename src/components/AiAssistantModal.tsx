import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { saveAiQuery, loginAdmin, loginAdminWithGoogle } from '../lib/firebase';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
  Mail,
  Calculator,
  FileText,
  Calendar,
  Briefcase,
  Zap,
  ShoppingBag,
  Cpu,
  Layers,
  Server,
} from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPanel?: () => void;
  onOpenBooking?: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminPanel,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "👋 Hi! I'm DevBot 2.0, Orjo Das Utshab's Personal AI Agent. I can provide project estimates, tech stack recommendations, CV match analysis, and schedule meetings!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '🛒 eCommerce & 3D Web App (Estimate)',
        '⚡ Full-Stack AI SaaS App Stack & Cost',
        '☁️ Cloud Architecture & Microservices',
        '📄 Analyze Orjo\'s CV for Full-Stack Role',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin login form state inside chatbot
  const [showAdminCard, setShowAdminCard] = useState(false);
  const [adminEmail, setAdminEmail] = useState('orjodasutshab@gmail.com');
  const [adminPass, setAdminPass] = useState('Pass-OrjoDasUtshab@1010');
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showAdminCard]);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPass) {
      setAdminError('Please enter both Email and Password');
      return;
    }

    setAdminLoginLoading(true);
    setAdminError(null);

    const res = await loginAdmin(adminEmail, adminPass);
    setAdminLoginLoading(false);

    if (res.success) {
      const grantMsg = `╔════════════════════════════╗\n║    ACCESS GRANTED ✓        ║\n╚════════════════════════════╝\nWelcome, Orjo.\nOpening Control Center...`;
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: grantMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setShowAdminCard(false);
      setTimeout(() => {
        if (onOpenAdminPanel) {
          onOpenAdminPanel();
        }
      }, 1000);
    } else {
      setAdminError(res.error || 'ACCESS DENIED');
    }
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setLoading(true);

    // Save user message to Firebase Firestore asynchronously
    saveAiQuery(textToSend, 'Guest Client').catch(() => {});

    // Intelligent Prompt Classification & Smart Proposal Engine
    setTimeout(() => {
      let botReply = '';
      let suggestions: string[] = [];
      const lower = textToSend.toLowerCase();

      if (lower.includes('ecommerce') || lower.includes('e-commerce') || lower.includes('shop') || lower.includes('store')) {
        botReply = `🛍️ **eCommerce & 3D Web App Proposal**:
• **Recommended Stack**: Next.js 15 / React 19 + Three.js (3D Interactive Product Previews) + Node.js + Stripe Payments + PostgreSQL
• **Estimated Timeline**: 2 - 3 Weeks
• **Budget Range**: $800 - $2,200 USD (Includes custom UI/UX, Cart, Inventory Admin & Automated Invoicing)
• **Deliverables**: 100% responsive code, 99+ Lighthouse performance, Stripe checkout, Docker container deployment.`;
        suggestions = ['📅 Schedule a kickoff meeting', '⚡ Tech Stack Details', '📄 Request Full Quote'];
      } else if (lower.includes('architecture') || lower.includes('cloud') || lower.includes('microservice') || lower.includes('backend') || lower.includes('devops') || lower.includes('database')) {
        botReply = `☁️ **Cloud Architecture & Scalable Microservices**:
• **Core Stack**: React / Next.js, Node.js (Express / Fastify), PostgreSQL, Redis cache layer, Docker containerization.
• **High Availability**: Load balancing, sub-100ms API response time, zero-downtime CI/CD deployment.
• **Timeline**: 2 - 4 Business Weeks
• **Deliverables**: Scalable backend microservices, optimized database schemas, fully documented REST/GraphQL APIs.`;
        suggestions = ['📅 Book Architecture Consultation', '⚡ View Cloud Tech Stack', '💬 Discuss Custom Project'];
      } else if (lower.includes('cv') || lower.includes('resume') || lower.includes('analyze') || lower.includes('match')) {
        botReply = `📄 **CV & Technical Match Analysis**:
• **Candidate**: Orjo Das Utshab (5+ Years Experience)
• **Core Match**: React, Next.js, TypeScript, Node.js/Express, Three.js (3D WebGL), PostgreSQL, Redis, Docker, Tailwind CSS.
• **Suitability**: 99% Match for Senior Full-Stack Web Developer, Frontend Architect & 3D Creative Engineer roles.
• **Availability**: Open for high-impact contracts & freelance engagements worldwide.`;
        suggestions = ['Download CV (.txt)', 'View LinkedIn Profile', 'Book an Interview'];
      } else if (lower.includes('cost') || lower.includes('pricing') || lower.includes('budget') || lower.includes('rate')) {
        botReply = `💰 **Engagement Pricing & Budget Models**:
• **Modern Landing Page / Web App**: $300 - $600 (3-5 Days)
• **Full-Stack SaaS Platform / eCommerce**: $800 - $2,500 (2-3 Weeks)
• **Custom 3D WebGL Experience (Three.js)**: $600 - $1,500 (1-2 Weeks)
• **Payment Terms**: 30% upfront deposit, 40% demo milestone, 30% final deployment.`;
        suggestions = ['Book Discovery Call', 'View Portfolio Projects', 'Contact Orjo Directly'];
      } else if (lower.includes('admin') || lower.includes('control') || lower.includes('login')) {
        setShowAdminCard(true);
        botReply = `🔐 **Admin Control Center Login**:
Please enter your authorized credentials below to access the database management dashboard.`;
      } else {
        botReply = `🤖 **Orjo Das Utshab's DevBot**:
Orjo specializes in crafting high-speed React applications, interactive 3D WebGL experiences with Three.js, scalable Node.js microservices, and modern SaaS platforms.

Would you like a custom budget quote, or would you like to schedule a 15-minute video call?`;
        suggestions = ['🛒 eCommerce Estimate', '☁️ Cloud Architecture', '📅 Book a Meeting'];
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions,
        },
      ]);
      setLoading(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[125] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-2xl w-full h-[85vh] max-h-[680px] shadow-[0_0_60px_rgba(6,182,212,0.3)] relative text-slate-100 flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-slate-950/90 border-b border-white/10 p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/30">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">DevBot 2.0 AI Agent</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Personal AI Full-Stack Proposal & Project Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-lg'
                        : 'bg-slate-950 border border-white/10 text-slate-200 rounded-tl-none shadow-inner'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sugg, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            if (sugg.includes('Schedule') || sugg.includes('Meeting') || sugg.includes('Book')) {
                              if (onOpenBooking) onOpenBooking();
                              else handleSendMessage(sugg);
                            } else {
                              handleSendMessage(sugg);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono transition-all cursor-pointer hover:scale-105"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 px-1">{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Admin Login Modal Card Embedded in Chat */}
            {showAdminCard && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3 font-mono">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <Cpu className="w-4 h-4 text-purple-400" /> Authorized Admin Login
                </div>
                <form onSubmit={handleAdminSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Admin Email"
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
                  />
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Admin Password"
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
                  />
                  {adminError && <div className="text-[10px] text-red-400">{adminError}</div>}
                  <button
                    type="submit"
                    disabled={adminLoginLoading}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {adminLoginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    <span>Authorize Access</span>
                  </button>
                </form>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>DevBot is computing estimate & proposal...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="bg-slate-950/90 border-t border-white/10 p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about project estimates, CV match, pricing..."
                className="flex-1 bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
