import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, MapPin, Users, Music, Newspaper, ArrowRight } from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { CITIES, VENUES } from '../data/mockData';

interface SearchModalProps {
  onNavigate: (view: string, id?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { isSearchOpen, closeSearch, events, artists, news } = useRave();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.cityName.toLowerCase().includes(q) ||
          e.venueName.toLowerCase().includes(q) ||
          e.genres.some((g) => g.toLowerCase().includes(q)) ||
          e.lineup.some((l) => l.name.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const filteredArtists = q
    ? artists.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.genres.some((g) => g.toLowerCase().includes(q)) ||
          a.city.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredVenues = q
    ? VENUES.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.cityName.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredCities = q
    ? CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredNews = q
    ? news.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const hasResults =
    filteredEvents.length > 0 ||
    filteredArtists.length > 0 ||
    filteredVenues.length > 0 ||
    filteredCities.length > 0 ||
    filteredNews.length > 0;

  const handleSelect = (view: string, id?: string) => {
    onNavigate(view, id);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#10121a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-[#c8ff00] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, artists, venues, Polish cities, genres..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="px-2 py-0.5 text-xs bg-white/10 border border-white/10 rounded font-mono text-neutral-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-6 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                Trending Rave Searches in Poland
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Jasna 1', 'Warsaw', 'VTSS', 'Industrial Techno', 'Schron', 'Hypnotic', 'Tama Poznań'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 transition"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-12 text-center">
              <p className="text-neutral-400 text-sm">No underground events, artists or venues matching "{query}"</p>
              <p className="text-neutral-500 text-xs mt-1">Try searching for "Warsaw", "Techno", "Jasna 1", or "VTSS"</p>
            </div>
          )}

          {/* Events Results */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-[#c8ff00] mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Events ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleSelect('event-detail', event.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={event.posterUrl}
                        alt={event.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-[#c8ff00] transition">
                          {event.title}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {event.date} • {event.venueName}, {event.cityName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#c8ff00]">
                      from {event.minPrice} PLN
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artists Results */}
          {filteredArtists.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-[#00f0ff] mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Artists ({filteredArtists.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => handleSelect('artist-detail', artist.id)}
                    className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                  >
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#00f0ff]/40"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{artist.name}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{artist.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Venues & Cities */}
          {(filteredVenues.length > 0 || filteredCities.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVenues.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Venues
                  </div>
                  <div className="space-y-1">
                    {filteredVenues.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => handleSelect('venues')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-white">{v.name}</span>
                        <span className="text-[10px] text-neutral-400">{v.cityName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredCities.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Cities
                  </div>
                  <div className="space-y-1">
                    {filteredCities.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect('cities')}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-white">{c.name}</span>
                        <span className="text-[10px] text-[#c8ff00]">{c.activeEventsCount} events</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* News Results */}
          {filteredNews.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-[#9945ff] mb-2">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Scene News</span>
              </div>
              <div className="space-y-1">
                {filteredNews.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelect('news-detail', article.id)}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs text-white font-medium group-hover:text-[#9945ff] truncate">
                      {article.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
