import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle2, Globe2, Sparkles } from 'lucide-react';

export const AvailabilitySection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [selectedTime, setSelectedTime] = useState<string>('15:00 UTC');
  const [booked, setBooked] = useState(false);

  const availableTimes = ['09:00 UTC', '13:00 UTC', '15:00 UTC', '18:00 UTC', '20:00 UTC'];

  return (
    <section id="availability" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" /> 14. Availability & Booking
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Status &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              Discovery Call Calendar
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Currently accepting new freelance projects, remote contracts, and security consultation calls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Status Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-lg font-bold text-white">
                  Current Status: Available
                </h3>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 font-mono">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Freelance Projects:</span>
                  <span className="text-emerald-400 font-bold">OPEN</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Remote Contracts:</span>
                  <span className="text-emerald-400 font-bold">OPEN</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Timezone:</span>
                  <span className="text-cyan-400 font-bold">GMT+6 (Global Flexible)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Calendar Slots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" /> Book a 15-Min Intro Call
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Free Consultation
                </span>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">
                  Select Target Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">
                  Available Slots:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl text-xs font-mono transition-all ${
                        selectedTime === time
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                          : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Booking CTA */}
              <button
                onClick={() => setBooked(true)}
                disabled={booked}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs font-mono shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {booked ? '✓ Call Time Reserved!' : `Reserve Intro Call for ${selectedDate} at ${selectedTime}`}
              </button>

              {booked && (
                <p className="text-xs font-mono text-emerald-400 text-center animate-pulse">
                  Reservation logged! Please send details in the contact form below to receive meeting link.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
