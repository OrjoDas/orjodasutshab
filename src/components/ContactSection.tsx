import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedInBadge } from './LinkedInBadge';
import { saveContactMessage } from '../lib/firebase';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  Send as TelegramIcon,
  Sparkles,
  Loader2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Save message to Firebase Firestore database
    await saveContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Direct Message',
      message: `${formData.message} ${formData.phone ? `(Phone: ${formData.phone})` : ''}`,
    });

    setIsSubmitting(false);

    // Trigger celebratory confetti blast
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
  };

  const socialLinks = [
    { name: 'GitHub', url: PERSONAL_INFO.socials.github, icon: Github, color: 'hover:text-purple-400 hover:border-purple-400' },
    { name: 'LinkedIn', url: PERSONAL_INFO.socials.linkedin, icon: Linkedin, color: 'hover:text-blue-400 hover:border-blue-400' },
    { name: 'Facebook', url: PERSONAL_INFO.socials.facebook, icon: Facebook, color: 'hover:text-cyan-400 hover:border-cyan-400' },
    { name: 'Instagram', url: PERSONAL_INFO.socials.instagram, icon: Instagram, color: 'hover:text-pink-400 hover:border-pink-400' },
    { name: 'Twitter/X', url: PERSONAL_INFO.socials.twitter, icon: Twitter, color: 'hover:text-sky-400 hover:border-sky-400' },
    { name: 'YouTube', url: PERSONAL_INFO.socials.youtube, icon: Youtube, color: 'hover:text-red-400 hover:border-red-400' },
    { name: 'Discord', url: PERSONAL_INFO.socials.discord, icon: MessageSquare, color: 'hover:text-indigo-400 hover:border-indigo-400' },
    { name: 'Telegram', url: PERSONAL_INFO.socials.telegram, icon: TelegramIcon, color: 'hover:text-teal-400 hover:border-teal-400' },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" /> 16 & 17. Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
              Extraordinary & Secure
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Send a direct message for project inquiries, cyber audits, or freelance hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> Direct Glass Message Form
            </h3>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-slate-300 font-mono">
                  Thank you {formData.name}. Orjo Das Utshab will review your note and reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold font-mono"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Full Stack App / 3D Web Project"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project requirements, timeline, or architecture needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message Securely
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Info Cards & Social Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Details */}
            <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300">{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Google Map Embedded Frame */}
            <div className="h-44 rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <iframe
                title="Dhaka Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.27923710582298!3d23.78088745620245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026cd1%3A0x4c726521a0478e5b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1711200000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Social Icons Hover Glow */}
            <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-3">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                17. Social Media Channels
              </h4>
              <div className="grid grid-cols-4 gap-2.5">
                {socialLinks.map((s) => {
                  const IconC = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className={`p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:scale-110 hover:bg-slate-950 transition-all ${s.color}`}
                    >
                      <IconC className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Official LinkedIn Profile Badge */}
            <LinkedInBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
