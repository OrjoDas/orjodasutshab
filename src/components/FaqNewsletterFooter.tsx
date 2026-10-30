import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

export const FaqNewsletterFooter: React.FC<{
  onNavigate?: (page: PageId) => void;
  showFaq?: boolean;
}> = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-white text-slate-900 selection:bg-slate-900 selection:text-white pt-24 sm:pt-32 pb-16 px-6 sm:px-12 lg:px-20 relative z-20 font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Main 3-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Studio Address / Location */}
          <div className="md:col-span-3 space-y-1 text-[15px] sm:text-[16px] text-slate-900 font-normal leading-[1.6]">
            <p>Suite 2</p>
            <p>9 Marsh Street</p>
            <p>Bristol, BS1 4AA</p>
            <p>United Kingdom</p>
          </div>

          {/* Column 2: Social Links & Contact Enquiries */}
          <div className="md:col-span-3 space-y-8 text-[15px] sm:text-[16px] text-slate-900 font-normal leading-[1.6]">
            {/* Social Channels */}
            <div className="space-y-1">
              <div>
                <a
                  href={PERSONAL_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  Twitter / X
                </a>
              </div>
              <div>
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  Instagram
                </a>
              </div>
              <div>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  Linkedin
                </a>
              </div>
            </div>

            {/* General Enquires */}
            <div className="space-y-1">
              <p className="text-slate-900">General enquires</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:opacity-60 transition-opacity block"
              >
                hello@orjo.dev
              </a>
            </div>

            {/* New Business */}
            <div className="space-y-1">
              <p className="text-slate-900">New business</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:opacity-60 transition-opacity block"
              >
                business@orjo.dev
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter Subscription Block */}
          <div className="md:col-span-6 space-y-6 md:pl-6">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-slate-950 leading-[1.08]">
              Subscribe to<br />our newsletter
            </h2>

            <form onSubmit={handleNewsletterSubmit} className="max-w-lg pt-2">
              <div className="bg-[#F0F2F6] hover:bg-[#EAECEF] focus-within:bg-[#EAECEF] transition-colors rounded-2xl sm:rounded-full px-6 py-4 flex items-center justify-between shadow-inner">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-base font-normal w-full pr-4"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-950 hover:translate-x-1 transition-transform cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {subscribed && (
                <p className="mt-3 text-sm text-emerald-600 font-medium pl-4">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Metadata & Scroll to Top Bar */}
        <div className="mt-24 sm:mt-32 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-[13px] sm:text-[14px] text-slate-900 font-normal gap-6 border-t border-slate-100">
          <div>
            ©{new Date().getFullYear()} ORJO Creative Studio
          </div>

          <div>
            R&D: labs.orjo.dev
          </div>

          <div className="flex items-center gap-1.5">
            Built by Orjo with <span className="text-[#FF3366]">💖</span>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
