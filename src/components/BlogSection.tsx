import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_DATA } from '../data/portfolioData';
import { BlogItem } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  X,
  User,
  Share2,
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogItem | null>(null);

  return (
    <section id="blog" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> 13. Articles & Insights
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Tech &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Cyber Security Blog
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Technical guides, security best practices, and 3D web animation tutorials written by Orjo.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_DATA.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-900/90 border border-white/15 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-[10px] font-mono text-purple-300 font-semibold backdrop-blur-md">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveArticle(blog)}
                  className="w-full py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs font-mono font-semibold text-slate-200 group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> {activeArticle.author}
                  </span>
                  <span>{activeArticle.date}</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <div className="relative h-60 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed font-sans space-y-4 whitespace-pre-line">
                {activeArticle.content}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Written by Orjo Das Utshab
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="py-2.5 px-6 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
