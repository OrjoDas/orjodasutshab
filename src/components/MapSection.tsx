import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MAP_MARKERS } from '../data/portfolioData';
import { Globe, MapPin, Radio, Shield, CheckCircle } from 'lucide-react';

export const MapSection: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState(MAP_MARKERS[0]);

  return (
    <section id="map" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5" /> 15. Global Connectivity
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive World Map &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Project Footprint
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Based in Dhaka, Bangladesh with remote project footprints across USA, Europe, Japan, and Australia.
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Canvas Visual (SVG World Outline) */}
          <div className="lg:col-span-8 relative h-80 sm:h-96 bg-slate-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
            {/* World Vector Outline Grid */}
            <svg
              className="w-full h-full opacity-40"
              viewBox="0 0 1000 500"
              fill="none"
              stroke="currentColor"
            >
              {/* Grid Lines */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
              <rect width="1000" height="500" fill="url(#grid)" />

              {/* Simplified World Continents Paths */}
              <path
                d="M 150,150 Q 200,100 300,150 T 400,200 L 350,300 Z"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
              />
              <path
                d="M 450,120 Q 550,80 650,120 T 750,220 L 600,350 Z"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
              />
              <path
                d="M 700,250 Q 800,200 900,300 L 850,420 Z"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
              />
            </svg>

            {/* Interactive Pulse Pin Markers */}
            {MAP_MARKERS.map((m) => {
              // Convert lat/lng to approximate SVG positions
              const xPercent = ((m.lng + 180) / 360) * 100;
              const yPercent = ((90 - m.lat) / 180) * 100;
              const isSelected = selectedMarker.id === m.id;

              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMarker(m)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                  style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full animate-ping ${
                        m.active ? 'bg-cyan-400/40' : 'bg-purple-400/20'
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-400 border-white scale-125 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                          : m.active
                          ? 'bg-emerald-400 border-slate-900'
                          : 'bg-purple-400 border-slate-900'
                      }`}
                    >
                      <MapPin className="w-2.5 h-2.5 text-slate-950" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Location Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-950 border border-white/15 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" /> Selected Location
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedMarker.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Latitude: {selectedMarker.lat}° N • Longitude: {selectedMarker.lng}° E
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 font-mono">
                Role: <span className="text-cyan-300 font-bold">{selectedMarker.role}</span>
              </div>

              <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>24/7 Asynchronous & Live Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Secure VPN & Encrypted Channels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
