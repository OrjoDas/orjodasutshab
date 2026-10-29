import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Link as LinkIcon, Check, RefreshCw, X, Sparkles, Layers } from 'lucide-react';

// Preset local cyber background images
import bgDefault from '../assets/images/user_exact_cyber_earth_1786568733463.jpg';
import bgExact from '../assets/images/cyber_earth_user_exact_1786568525713.jpg';
import bgSphere from '../assets/images/cyber_earth_bg_1786566815229.jpg';
import bgGrid from '../assets/images/cyber_earth_exact_1786567960733.jpg';
import bgNeon from '../assets/images/cyber_earth_new_bg_1786567785055.jpg';

interface BackgroundChangerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBgUrl: string;
  onApplyBgUrl: (url: string) => void;
}

const PRESET_BACKGROUNDS = [
  { id: 'default', name: 'Cyber Earth Default', url: bgDefault },
  { id: 'exact', name: 'Cyber Earth Network', url: bgExact },
  { id: 'sphere', name: 'Cyber Earth Sphere', url: bgSphere },
  { id: 'grid', name: 'Digital Grid Earth', url: bgGrid },
  { id: 'neon', name: 'Cyber Neon Grid', url: bgNeon },
];

export const BackgroundChangerModal: React.FC<BackgroundChangerModalProps> = ({
  isOpen,
  onClose,
  currentBgUrl,
  onApplyBgUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(currentBgUrl || '');
  const [previewUrl, setPreviewUrl] = useState(currentBgUrl || bgDefault);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApply = (urlToApply: string) => {
    const finalUrl = urlToApply.trim();
    if (!finalUrl) return;
    onApplyBgUrl(finalUrl);
    setCopiedSuccess(true);
    setTimeout(() => {
      setCopiedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setInputUrl(bgDefault);
    setPreviewUrl(bgDefault);
    onApplyBgUrl(bgDefault);
    setCopiedSuccess(true);
    setTimeout(() => {
      setCopiedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 border border-cyan-500/50 rounded-3xl max-w-xl w-full overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-slate-950/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Image className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
                  CUSTOM BACKGROUND IMAGE LINK
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Paste any image URL or select a cyber preset
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Success Banner */}
            {copiedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Background image updated successfully!</span>
              </motion.div>
            )}

            {/* Custom URL Input Section */}
            <div className="space-y-2">
              <label className="text-xs text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                Paste Image Link (URL):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://example.com/cyber-background.jpg"
                  className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                />
                <button
                  onClick={() => handleApply(inputUrl)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-extrabold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                >
                  Apply Link
                </button>
              </div>
            </div>

            {/* Live Image Preview Frame */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Preview:</span>
                <span className="text-[10px] text-cyan-400 font-normal">Object-cover fit</span>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 group shadow-inner">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Background Preview"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      // Fallback if image link is invalid
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                    No image URL entered
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-3 text-[10px] text-cyan-300 bg-slate-950/80 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                  Live View Preview
                </div>
              </div>
            </div>

            {/* Presets Section */}
            <div className="space-y-3">
              <label className="text-xs text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Or Select Cyber Presets:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRESET_BACKGROUNDS.map((preset) => {
                  const isSelected = currentBgUrl === preset.url || previewUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setInputUrl(preset.url);
                        setPreviewUrl(preset.url);
                        handleApply(preset.url);
                      }}
                      className={`relative h-20 rounded-xl overflow-hidden border transition-all text-left group cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/50'
                          : 'border-white/10 hover:border-cyan-400/50 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                      <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded truncate">
                        {preset.name}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer controls */}
          <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              Reset Default
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
