import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { CertificateItem } from '../types';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  X,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" /> 08. Verified Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Industry{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-cyan-400">
              Certifications
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified certifications in ethical hacking, cloud architecture, system administration, and advanced web engineering.
          </p>
        </div>

        {/* 3D Certificate Cards Grid - 2 per line on PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveCert(cert)}
              className="bg-slate-900/80 border border-white/15 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl hover:border-yellow-400/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-mono text-yellow-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> VERIFIED
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>{cert.issuer}</span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Calendar className="w-3 h-3 text-cyan-400" /> {cert.issueDate}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    Credential ID: {cert.credentialId}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 group-hover:bg-yellow-500 group-hover:text-slate-950 font-semibold transition-colors flex items-center justify-center gap-1.5">
                  Pop-up Preview <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal Preview */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 max-w-xl w-full shadow-2xl relative space-y-5"
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Issued by {activeCert.issuer} • {activeCert.issueDate}
                  </p>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                  Verified Skills & Capabilities:
                </h4>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3.5 rounded-2xl border border-white/10">
                  {activeCert.skillsVerified.map((sk) => (
                    <div key={sk} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={activeCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" /> Verify Official Credential
                </a>
                <button
                  onClick={() => setActiveCert(null)}
                  className="py-2.5 px-4 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
