import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { useRave } from '../context/RaveContext';

interface NewsDetailPageProps {
  articleId: string;
  onBack: () => void;
  onNavigate: (view: string, id?: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  articleId,
  onBack,
  onNavigate
}) => {
  const { news, showToast } = useRave();
  const article = news.find((n) => n.id === articleId) || news[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Article link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Top Back & Share */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to chronicles</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 text-xs font-semibold transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Article</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#9945ff]/20 text-[#9945ff] border border-[#9945ff]/30">
          {article.category}
        </span>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center space-x-4 pt-2 border-t border-white/10 text-xs text-neutral-400 font-mono">
          <div className="flex items-center space-x-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <p className="text-white font-semibold">{article.author.name}</p>
              <p className="text-[10px] text-neutral-500">{article.author.role}</p>
            </div>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishedAt}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <p className="text-lg text-white font-medium italic border-l-2 border-[#9945ff] pl-4 py-1">
          {article.excerpt}
        </p>

        <div className="whitespace-pre-line space-y-4">
          {article.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
