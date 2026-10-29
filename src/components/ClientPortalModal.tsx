import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  CreditCard,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Lock,
  User,
  Users,
  Server,
  TrendingUp,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'analytics' | 'invoices' | 'vault'>('overview');
  const [clientName, setClientName] = useState('Nexus Enterprise Inc.');
  const [isCopied, setIsCopied] = useState(false);
  const [paidInvoices, setPaidInvoices] = useState<number[]>([1, 2]);

  if (!isOpen) return null;

  const copyCredentials = () => {
    navigator.clipboard.writeText('STAGING_URL: https://nexus-staging.orjo.dev\nAPI_KEY: nv_live_sec_994827104928');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const payInvoice = (id: number) => {
    if (!paidInvoices.includes(id)) {
      setPaidInvoices([...paidInvoices, id]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.25)] relative text-slate-100 flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-slate-950/90 border-b border-white/10 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Client Portal & Project Dashboard
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    LIVE DEMO
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Client ID: <span className="text-cyan-300 font-bold">CLI-9824</span> • Organization: {clientName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition-all cursor-pointer"
                >
                  Schedule Sync Call
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="bg-slate-950/50 border-b border-white/10 px-4 sm:px-6 flex gap-2 overflow-x-auto py-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Project Overview', icon: Layers },
              { id: 'tasks', label: 'Milestones & Tasks (12)', icon: CheckCircle2 },
              { id: 'analytics', label: 'Live Analytics', icon: Activity },
              { id: 'invoices', label: 'Invoices & Billing', icon: CreditCard },
              { id: 'vault', label: 'Credentials & Assets Vault', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Project Status Banner */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                        ACTIVE CONTRACT
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        CyberVault — High-Speed E-Commerce & Microservices Hardening
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                        75% COMPLETED
                      </span>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-mono font-bold">
                        PHASE 3: PEN-TESTING
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Development & Deployment Progress</span>
                      <span className="text-cyan-400 font-bold">75% Complete (Phase 3 of 4)</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-white/10">
                      <div
                        className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>

                  {/* Key Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-400">LEAD ARCHITECT</div>
                      <div className="text-sm font-bold text-white">Orjo Das Utshab</div>
                    </div>
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-400">TARGET LAUNCH</div>
                      <div className="text-sm font-bold text-emerald-400">Sept 15, 2026</div>
                    </div>
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-400">TOTAL TASKS</div>
                      <div className="text-sm font-bold text-cyan-300">12 Done / 4 In Review</div>
                    </div>
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-400">HEALTH SCORE</div>
                      <div className="text-sm font-bold text-purple-300">100% On Track</div>
                    </div>
                  </div>
                </div>

                {/* Staging URL & Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <Server className="w-4 h-4" /> Active Staging Environment
                    </div>
                    <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-white/10 font-mono text-xs text-slate-300">
                      <span className="truncate">https://nexus-staging.orjo.dev</span>
                      <button
                        onClick={copyCredentials}
                        className="text-cyan-400 hover:text-cyan-300 ml-2 cursor-pointer flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Protected with HTTP Basic Auth + Cloudflare WAF. Changes auto-deploy on git push to `main`.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Next Milestone Delivery
                    </div>
                    <div className="text-sm font-semibold text-slate-200">
                      Security Penetration Testing & OWASP Top 10 Report
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" /> Review scheduled in 3 days
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Contract Deliverables & Task Progress
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">12 of 16 Completed (75%)</span>
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'Full Stack Architecture & DB Schema Design (PostgreSQL + Drizzle)', status: 'Completed', date: 'Aug 02' },
                    { title: 'Figma UI/UX High-Fidelity Interactive Wireframes', status: 'Completed', date: 'Aug 06' },
                    { title: 'React 18 + Vite Frontend with Tailwind CSS & Motion Animations', status: 'Completed', date: 'Aug 10' },
                    { title: 'Stripe Payment Gateway, Webhooks & Automated Invoicing', status: 'Completed', date: 'Aug 14' },
                    { title: 'Live Three.js 3D Product Configurator Canvas', status: 'Completed', date: 'Aug 18' },
                    { title: 'JWT Authentication & Role-Based Access Control (RBAC)', status: 'Completed', date: 'Aug 22' },
                    { title: 'RESTful Microservices & WebSockets Live Notification Engine', status: 'Completed', date: 'Aug 26' },
                    { title: 'Server Hardening & Ubuntu Nginx Reverse Proxy Config', status: 'Completed', date: 'Aug 30' },
                    { title: 'OWASP Top 10 Penetration Testing & SQLi / XSS Patching', status: 'In Progress', date: 'Active' },
                    { title: 'Lighthouse Core Web Vitals Optimization (Target: 98+)', status: 'In Progress', date: 'Active' },
                    { title: 'Final Production Deployment on Cloud Run & DNS Handover', status: 'Pending', date: 'Upcoming' },
                    { title: '30-Day Post-Launch Maintenance & Bug Warranty', status: 'Pending', date: 'Upcoming' },
                  ].map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-white/5 hover:border-cyan-500/30 transition-all font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {task.status === 'Completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : task.status === 'In Progress' ? (
                          <Clock className="w-4 h-4 text-yellow-400 shrink-0 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        )}
                        <span className={task.status === 'Completed' ? 'text-slate-200' : 'text-slate-400 font-medium'}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500">{task.date}</span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            task.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : task.status === 'In Progress'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6 font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-1">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>MONTHLY VISITORS</span>
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">32,540</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +24.8% vs last month
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>PERFORMANCE SCORE</span>
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">98 / 100</div>
                    <div className="text-[10px] text-slate-400">Lighthouse Green Tier</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-purple-500/30 space-y-1">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>SECURITY RATING</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-purple-300">Grade A+</div>
                    <div className="text-[10px] text-purple-400">0 Vulnerabilities Found</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-yellow-500/30 space-y-1">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>SERVER UPTIME</span>
                      <Server className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">99.99%</div>
                    <div className="text-[10px] text-emerald-400">Zero Incident Reports</div>
                  </div>
                </div>

                {/* Core Web Vitals Breakdown */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                    Production Core Web Vitals (Real-Time Telemetry)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-1">
                      <div className="text-slate-400">First Contentful Paint (FCP)</div>
                      <div className="text-base font-bold text-emerald-400">0.7s (Super Fast)</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-1">
                      <div className="text-slate-400">Largest Contentful Paint (LCP)</div>
                      <div className="text-base font-bold text-emerald-400">1.1s (Passed)</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-1">
                      <div className="text-slate-400">Cumulative Layout Shift (CLS)</div>
                      <div className="text-base font-bold text-emerald-400">0.002 (Stable)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white uppercase tracking-wider">
                    Milestone Payments & Invoices
                  </h3>
                  <div className="text-slate-400">
                    Total Contract: <span className="text-cyan-300 font-bold">$3,700 USD</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, title: 'Milestone 1: 30% Upfront Deposit & Architecture', amount: '$1,200', date: 'Aug 02, 2026', method: 'Stripe Card (••• 4242)' },
                    { id: 2, title: 'Milestone 2: 40% Beta Demo & Full Stack Build', amount: '$1,500', date: 'Aug 20, 2026', method: 'bKash / Bank Wire' },
                    { id: 3, title: 'Milestone 3: 30% Final Security Audit & Handover', amount: '$1,000', date: 'Due Sept 15', method: 'Pending Final Sign-Off' },
                  ].map((inv) => {
                    const isPaid = paidInvoices.includes(inv.id);
                    return (
                      <div
                        key={inv.id}
                        className="bg-slate-950 p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <FileText className="w-4 h-4 text-cyan-400" />
                            {inv.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Invoice #INV-2026-0{inv.id} • {inv.date} • {inv.method}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white">{inv.amount}</span>
                          {isPaid ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> PAID
                            </span>
                          ) : (
                            <button
                              onClick={() => payInvoice(inv.id)}
                              className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'vault' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cyan-400" /> Confidential Project Credentials & Assets
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-bold">AES-256 ENCRYPTED</span>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Figma Master UI Kit & Design System</div>
                        <div className="text-[10px] text-slate-400">Tokens, dark theme components, vector icons</div>
                      </div>
                      <a
                        href="https://figma.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-white/10 text-cyan-300 hover:bg-white/20 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open Figma
                      </a>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Private GitHub Repository Access</div>
                        <div className="text-[10px] text-slate-400">Invite sent to client engineering team</div>
                      </div>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-white/10 text-cyan-300 hover:bg-white/20 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> GitHub Repo
                      </a>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">CEH Penetration Testing & Vulnerability Audit Report (.PDF)</div>
                        <div className="text-[10px] text-emerald-400">Grade A+ (0 High / 0 Medium Vulnerabilities)</div>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-950/90 border-t border-white/10 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Orjo Das Utshab Verified Developer Portal</span>
            </div>
            <div>
              Support Email: <a href="mailto:orjodasutshab@gmail.com" className="text-cyan-400 hover:underline">orjodasutshab@gmail.com</a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
