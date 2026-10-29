import React, { useEffect, useState } from 'react';
import { Linkedin, ExternalLink, ShieldCheck, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const LinkedInBadge: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Dynamically inject the official LinkedIn badge JS script if not present
    const scriptId = 'linkedin-badge-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      script.type = 'text/javascript';

      script.onload = () => {
        setScriptLoaded(true);
      };

      script.onerror = (event: Event | string) => {
        // Prevent cross-origin script error propagation
        if (typeof event === 'object' && event && 'preventDefault' in event) {
          (event as Event).preventDefault();
        }
        setScriptLoaded(false);
      };

      try {
        document.body.appendChild(script);
      } catch (err) {
        setScriptLoaded(false);
      }
    } else {
      setScriptLoaded(true);
      if ((window as any).LInAuth) {
        try {
          (window as any).LInAuth();
        } catch (e) {
          // Ignore badge re-render errors
        }
      }
    }
  }, []);

  return (
    <div className="bg-slate-950/90 border border-indigo-500/30 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(99,102,241,0.2)] font-mono space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Linkedin className="w-5 h-5 text-indigo-400" /> Official LinkedIn Profile
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Member
        </span>
      </div>

      {/* Profile Card View */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-4 font-sans">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-full text-white">
              <Linkedin className="w-3 h-3" />
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              {PERSONAL_INFO.name}
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            </h4>
            <p className="text-xs text-indigo-300 font-mono flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> {PERSONAL_INFO.professions.slice(0, 2).join(' • ')}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" /> {PERSONAL_INFO.location}
            </p>
          </div>
        </div>

        {/* Official Badge Container if script loaded */}
        <div className="badge-base LI-profile-badge flex justify-center hidden" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="orjodasutshab" data-version="v1" />
      </div>

      {/* Direct Call to Action Button */}
      <div className="pt-2 border-t border-white/10 text-center">
        <a
          href={PERSONAL_INFO.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md font-mono"
        >
          <Linkedin className="w-4 h-4" /> Connect with Orjo on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

