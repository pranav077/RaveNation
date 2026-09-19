import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Calendar, 
  DollarSign, 
  Users, 
  Newspaper, 
  Trash2, 
  Sparkles,
  Search,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { useAuth } from '../context/AuthContext';
import { NewsArticle } from '../types';
import { Lock, ArrowRight } from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { 
    events, 
    updateEventStatus, 
    toggleFeatureEvent, 
    bookings, 
    news, 
    addNewsArticle, 
    showToast 
  } = useRave();
  const { user, openAuthModal } = useAuth();

  // Admin Guard
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-[#11131c] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#9945ff]/10 border border-[#9945ff]/30 text-[#9945ff] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(153,69,255,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-black text-2xl text-white mb-2">
            Admin Authentication Required
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Access to platform curation controls, event approvals, ticket sales telemetry, and scene editorial publishing is restricted to authorized platform administrators.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login', 'fan')}
              className="w-full py-3 px-4 rounded-xl bg-[#9945ff] hover:bg-[#8832eb] text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(153,69,255,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Sign In as Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition"
            >
              Return to Rave Directory
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'events' | 'bookings' | 'news'>('events');
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);

  // New article form
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Festival Report' | 'Scene Journalism' | 'Harm Reduction' | 'Club Heritage'>('Scene Journalism');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Total gross revenue
  const totalRevenue = bookings.reduce((sum, b) => (b.status === 'confirmed' ? sum + b.totalAmount : sum), 0);
  const totalTicketsSold = bookings.reduce((sum, b) => (b.status === 'confirmed' ? sum + b.items.reduce((s, i) => s + i.quantity, 0) : sum), 0);
  const pendingEvents = events.filter((e) => e.approvalStatus === 'pending' || (e.status as string) === 'pending');

  const handleApproveEvent = (id: string) => {
    updateEventStatus(id, 'available');
    showToast('Event approved and published to live directory!');
  };

  const handleRejectEvent = (id: string) => {
    updateEventStatus(id, 'cancelled');
    showToast('Event marked as cancelled / returned to organizer.');
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) return;

    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newsTitle,
      slug: newsTitle.toLowerCase().replace(/\s+/g, '-'),
      category: newsCategory,
      excerpt: newsExcerpt || newsContent.slice(0, 150) + '...',
      content: newsContent,
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      publishedAt: 'Sep 19, 2026',
      readingTime: '4 min read',
      author: {
        name: user?.name || 'Rave Nation Editorial Board',
        role: 'Chief Editor & Scene Curator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      tags: ['Poland', 'Techno', 'Editorial']
    };

    addNewsArticle(newArticle);
    setShowAddNewsModal(false);
    setNewsTitle('');
    setNewsContent('');
    setNewsExcerpt('');
    showToast('Chronicle published successfully to Scene Journalism!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-[#0f1118] border border-white/10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-display font-black text-2xl text-white">
              Rave Nation Operations Control
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#9945ff]/20 text-[#9945ff] font-bold">
              Root Administrator
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Curation gatekeeper • Live database telemetry across 14 Polish hubs
          </p>
        </div>

        <button
          onClick={() => setShowAddNewsModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#9945ff] hover:bg-[#8835f0] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-[0_0_20px_rgba(153,69,255,0.4)]"
        >
          <Newspaper className="w-4 h-4" />
          <span>Publish Scene Article</span>
        </button>
      </div>

      {/* Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Gross Ticket Revenue</span>
            <DollarSign className="w-4 h-4 text-[#c8ff00]" />
          </div>
          <p className="text-2xl font-bold font-display text-white">{totalRevenue.toLocaleString()} PLN</p>
          <span className="text-[10px] text-emerald-400 font-mono">100% processed</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Total Tickets Issued</span>
            <TrendingUp className="w-4 h-4 text-[#00f0ff]" />
          </div>
          <p className="text-2xl font-bold font-display text-white">{totalTicketsSold} Passes</p>
          <span className="text-[10px] text-neutral-400 font-mono">Real-time QR active</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Pending Submissions</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-display text-amber-400">{pendingEvents.length}</p>
          <span className="text-[10px] text-neutral-400 font-mono">Requires approval</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Platform Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-display text-emerald-400">Optimal</p>
          <span className="text-[10px] text-neutral-400 font-mono">0 security incidents</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'events'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Event Curation Queue ({events.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'bookings'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Orders & Transactions ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'news'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Published Chronicles ({news.length})
        </button>
      </div>

      {/* TAB 1: EVENT CURATION QUEUE */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">
              Underground Event Moderation & Homepage Features
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              {events.filter((e) => e.isFeatured).length} events currently featured on Hero
            </span>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-display font-bold text-white text-base">
                        {event.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          event.approvalStatus === 'approved' || (event.status as string) === 'available'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {event.approvalStatus || event.status}
                      </span>
                      {event.isFeatured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#c8ff00]/20 text-[#c8ff00] font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {event.date} • {event.venueName}, {event.cityName} • Organizer: {event.organizerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto text-xs font-mono">
                  {/* Feature Toggle */}
                  <button
                    onClick={() => toggleFeatureEvent(event.id)}
                    className={`p-2 rounded-lg border transition ${
                      event.isFeatured
                        ? 'border-[#c8ff00] text-[#c8ff00] bg-[#c8ff00]/10'
                        : 'border-white/10 text-neutral-400 hover:text-white'
                    }`}
                    title={event.isFeatured ? 'Remove from Homepage Feature' : 'Feature on Homepage'}
                  >
                    <Star className={`w-4 h-4 ${event.isFeatured ? 'fill-current' : ''}`} />
                  </button>

                  {/* Approve / Reject */}
                  {event.approvalStatus === 'pending' || (event.status as string) === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveEvent(event.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase transition flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleRejectEvent(event.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onNavigate('event-detail', event.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                    >
                      View Page
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS & TRANSACTIONS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-white">
            Live Ticket Order Ledger
          </h3>
          <div className="space-y-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-[#c8ff00] text-sm">{b.orderRef}</span>
                  <p className="text-white mt-0.5">
                    Attendee: {b.attendee.fullName} ({b.attendee.email})
                  </p>
                  <p className="text-neutral-400">
                    Items: {b.items.map((i) => `${i.tierName} x${i.quantity}`).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{b.totalAmount} PLN</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      b.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PUBLISHED NEWS */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">
              Published Articles & Safety Bulletins
            </h3>
          </div>
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#9945ff] uppercase font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-white text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono">
                      Published {item.publishedAt} by {item.author.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('news-detail', item.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono"
                >
                  Read Article
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: PUBLISH NEWS */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#11131c] border border-white/20 rounded-3xl p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Publish Scene Chronicle / Report
              </h3>
              <button
                onClick={() => setShowAddNewsModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateNews} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="e.g. Inside Jasna 1's Acoustic Evolution"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#9945ff]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Category
                </label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                >
                  <option value="Festival Report" className="bg-[#11131c]">Festival Report</option>
                  <option value="Scene Journalism" className="bg-[#11131c]">Scene Journalism</option>
                  <option value="Harm Reduction" className="bg-[#11131c]">Harm Reduction</option>
                  <option value="Club Heritage" className="bg-[#11131c]">Club Heritage</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Short Excerpt / Lead
                </label>
                <textarea
                  rows={2}
                  value={newsExcerpt}
                  onChange={(e) => setNewsExcerpt(e.target.value)}
                  placeholder="A concise summary appearing on cards..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Body Content
                </label>
                <textarea
                  rows={6}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Full editorial story..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9945ff] text-white font-display font-bold uppercase tracking-wider"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
