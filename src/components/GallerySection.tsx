import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_DATA } from '../data/portfolioData';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Maximize2, X, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5" /> 12. Visual Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Project Screenshots &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Interface Designs
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any screenshot to expand in high resolution Lightbox preview mode.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveItem(item)}
              className="relative group h-64 rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-xl cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-2 rounded-xl bg-slate-900/80 border border-white/20 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 max-w-3xl w-full shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-900 border border-white/20 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {activeItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
