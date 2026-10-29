import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Mail, CheckCircle2, X, Shield, Sparkles, Send, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { saveProjectBooking } from '../lib/firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState('Full Stack Web Project (30 Mins)');
  const [date, setDate] = useState('2026-08-05');
  const [time, setTime] = useState('10:00 AM EST');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSaving(true);
    await saveProjectBooking({
      name,
      email,
      projectType: selectedTopic,
      details: `Scheduled Date: ${date} at ${time}`,
    });
    setIsSaving(false);
    setBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.3)] space-y-6 relative text-slate-100"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Calendar className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Schedule Direct Discovery Call <Sparkles className="w-4 h-4 text-yellow-300" />
              </h3>
              <p className="text-xs text-slate-400">
                Book a 1-on-1 Consultation Session with Orjo Das Utshab
              </p>
            </div>
          </div>

          {!booked ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase tracking-wider">Session Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  <option value="Full Stack Web Project (30 Mins)">Full Stack Web Application Development (30 Mins)</option>
                  <option value="Cyber Security Audit (45 Mins)">Cyber Security Vulnerability & PenTest Audit (45 Mins)</option>
                  <option value="Linux Server Hardening & DevOps">Linux Server Hardening & Cloud Setup (30 Mins)</option>
                  <option value="General Technical Consultation">General Freelance / Contract Consultation (15 Mins)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase tracking-wider">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/20 rounded-xl px-4 py-2.5 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold uppercase tracking-wider">Select Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-white/20 rounded-xl px-4 py-2.5 text-white outline-none focus:border-cyan-400"
                  >
                    <option value="10:00 AM EST">10:00 AM EST (8:00 PM BDT)</option>
                    <option value="02:00 PM EST">02:00 PM EST (12:00 AM BDT)</option>
                    <option value="06:00 PM EST">06:00 PM EST (04:00 AM BDT)</option>
                    <option value="09:00 PM EST">09:00 PM EST (07:00 AM BDT)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase tracking-wider">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full bg-slate-950 border border-white/20 rounded-xl px-4 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold uppercase tracking-wider">Your Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  className="w-full bg-slate-950 border border-white/20 rounded-xl px-4 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" /> CONFIRM MEETING BOOKING
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-white">MEETING CONFIRMED!</h4>
                <p className="text-xs text-cyan-300 font-mono">
                  {selectedTopic} on {date} at {time}
                </p>
                <p className="text-xs text-slate-400 pt-2 font-sans">
                  A Google Meet / Zoom link and calendar invitation have been sent to <strong className="text-white">{email}</strong>.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
