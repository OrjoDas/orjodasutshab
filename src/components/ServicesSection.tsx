import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceItem } from '../types';
import {
  Layers,
  Layout,
  Component,
  Shield,
  ShieldAlert,
  Server,
  TrendingUp,
  Headphones,
  Image as ImageIcon,
  Globe,
  ArrowRight,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Layout': return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Component': return <Component className="w-6 h-6 text-indigo-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-400" />;
      case 'Server': return <Server className="w-6 h-6 text-yellow-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-teal-400" />;
      case 'Image': return <ImageIcon className="w-6 h-6 text-fuchsia-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-400" />;
      default: return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> 04. What I Offer
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Digital &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">
              Full Stack Solutions
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From modern responsive web applications to scalable microservices and cloud deployments — hover cards to explore 3D tilt effects.
          </p>
        </div>

        {/* 10 Services 3D Hover Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                rotateX: -4,
                rotateY: 4,
                scale: 1.03,
              }}
              className="relative group bg-slate-900/80 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Popular Badge */}
              {service.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-[10px] font-mono text-white font-bold shadow-md">
                  HOT SERVICE
                </span>
              )}

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-400/50 transition-all">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables preview */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {service.deliverables.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs font-mono font-semibold text-slate-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/40">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    Professional Tech Service
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedService.fullDesc}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Key Deliverables Included:
                </h4>
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-white/10">
                  {selectedService.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs text-center shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Request This Service
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15"
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
