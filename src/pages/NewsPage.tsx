import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useRave } from '../context/RaveContext';

interface NewsPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const { news } = useRave();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Festival Report', 'Scene Journalism', 'Harm Reduction', 'Club Heritage'];

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[#9945ff] text-xs font-mono uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Electronic Music Editorial & Safe Space</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Underground Chronicles
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          In-depth journalism, club histories, festival dispatches, and harm reduction guides from the Polish dancefloor.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl border transition ${
              selectedCategory === cat
                ? 'bg-[#9945ff] text-white border-[#9945ff] font-bold shadow-[0_0_12px_rgba(153,69,255,0.4)]'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => onNavigate('news-detail', article.id)}
            className="group bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden hover:border-[#9945ff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#9945ff] border border-[#9945ff]/30 font-bold">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono mb-2">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#9945ff] transition leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mt-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-neutral-300 font-medium">
                    {article.author.name}
                  </span>
                </div>
                <span className="text-xs text-[#9945ff] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
