import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING_DATA } from '../data/portfolioData';
import { CheckCircle2, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project');

  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> 22. Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Clear Investment Plans for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
              Web & Cyber Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Choose the service package that fits your organization's goals. Custom enterprise solutions available upon request.
          </p>
        </div>

        {/* Toggle Billing Mode */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
            <button
              onClick={() => setBillingCycle('project')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                billingCycle === 'project'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Per Project Basis
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Retainer (-15%)
            </button>
          </div>
        </div>

        {/* 3D Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_DATA.map((plan, idx) => {
            const displayPrice =
              billingCycle === 'project'
                ? plan.price
                : `$${Math.round(parseInt(plan.price.replace('$', '').replace('/proj', '')) * 0.85)}/mo`;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative bg-slate-900/90 border rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                    : 'border-white/15 hover:border-cyan-400/40'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-[10px] font-mono text-white font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 border-b border-white/10 pb-6">
                    <span className="text-4xl font-extrabold text-white font-mono">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {billingCycle === 'project' ? ' / project' : ''}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      Included Services & Security:
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="#contact"
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Select Plan <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
