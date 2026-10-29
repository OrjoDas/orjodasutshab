import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Download, CheckCircle, QrCode, Phone, Mail, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const CyberIdCard: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Utshab;Orjo;Das;;
FN:Orjo Das Utshab
TITLE:Senior Full Stack Web Developer & 3D Web Architect
ORG:Full Stack Engineering & Web Architecture
TEL;TYPE=CELL:${PERSONAL_INFO.phone}
EMAIL;TYPE=INTERNET:${PERSONAL_INFO.email}
URL:https://orjodasutshab.dev
ADR;TYPE=WORK:;;Dhaka;Dhaka;;;Bangladesh
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Orjo_Das_Utshab.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="py-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Holographic ID Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="w-full max-w-sm bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-400/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden group space-y-4"
          >
            {/* Hologram Light Laser Beam */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-scanline pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">
                  DEV ARCHITECT ID
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            {/* Profile Avatar & Info Row */}
            <div className="flex items-center gap-4">
              <div className="relative w-22 h-22 p-[2px] rounded-2xl bg-[conic-gradient(from_0deg,#a855f7,#06b6d4,#10b981,#a855f7)] animate-[spin_8s_linear_infinite] shadow-[0_0_20px_rgba(6,182,212,0.4)] flex-shrink-0">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 p-0.5 relative group/cardimg">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover rounded-xl group-hover/cardimg:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-cyan-500/10 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-white">
                  {PERSONAL_INFO.name}
                </h4>
                <p className="text-[11px] text-cyan-400 font-semibold">
                  Senior Full Stack Web Developer
                </p>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-400" /> {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

            {/* Detailed Credentials List */}
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10 space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">ENGINEERING STATUS:</span>
                <span className="text-cyan-400 font-bold">100% PRODUCTION READY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CORE TECH:</span>
                <span className="text-purple-300">React • Next.js • Node • Three.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EXPERIENCE:</span>
                <span className="text-emerald-400">5+ Years (120+ Web Apps)</span>
              </div>
            </div>

            {/* Footer QR & Contact Button */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <QrCode className="w-6 h-6 text-cyan-400" />
                <span>SCAN DIGITAL CARD</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400">ID: ORJO-2026-HQ</span>
            </div>
          </motion.div>
        </div>

        {/* Right Info & Digital Business Card Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Digital Business Card
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Save Contact Details Directly To Your Phone
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Download Orjo’s official vCard (.vcf) file to import email, phone number, website URL, and office location directly into your Mobile Contacts or Outlook in one click.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-white/10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 truncate">{PERSONAL_INFO.email}</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-white/10 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">{PERSONAL_INFO.phone}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleDownloadVCard}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              {downloaded ? 'vCard Downloaded!' : 'Download Digital Business Card (.vcf)'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
