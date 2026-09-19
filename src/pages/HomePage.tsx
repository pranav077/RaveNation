import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Play, 
  Pause,
  Ticket, 
  Radio, 
  ShieldCheck, 
  Music, 
  Send, 
  Heart, 
  CheckCircle2,
  TrendingUp,
  Volume2,
  Users
} from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { useAuth } from '../context/AuthContext';
import { CITIES, VENUES } from '../data/mockData';
import { EventCard } from '../components/EventCard';
import { ArtistCard } from '../components/ArtistCard';
import { CityCard } from '../components/CityCard';
import { RaveEvent } from '../types';

interface HomePageProps {
  onNavigate: (view: string, id?: string) => void;
  onBookNow: (event: RaveEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBookNow }) => {
  const { 
    approvedEvents, 
    artists, 
    tracks, 
    news, 
    playTrack, 
    currentTrack,
    isPlaying,
    togglePlay,
    subscribeNewsletter, 
    setSelectedCityFilter,
    setSelectedGenreFilter
  } = useRave();
  const { user } = useAuth();

  // Hero Quick Search state
  const [heroSearchCity, setHeroSearchCity] = useState('');
  const [heroSearchGenre, setHeroSearchGenre] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Filtered upcoming events
  const thisWeekendEvents = approvedEvents.filter((e) => e.isThisWeekend);
  const featuredEvents = approvedEvents.filter((e) => e.isFeatured).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchCity) setSelectedCityFilter(heroSearchCity);
    if (heroSearchGenre) setSelectedGenreFilter(heroSearchGenre);
    onNavigate('events');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      subscribeNewsletter(newsletterEmail);
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4">
        {/* Deep atmospheric backdrop with layered lighting */}
        <div className="absolute inset-0 bg-[#07080c]" />
        
        {/* Ambient video/image background simulation */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1800&q=80')`
          }}
        />

        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c8ff00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-[400px] h-[250px] bg-[#9945ff]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Top Rave Live Pulse Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#c8ff00]/40 backdrop-blur-md shadow-[0_0_15px_rgba(200,255,0,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#c8ff00] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              POLAND UNDERGROUND SCENE • LIVE 2026
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
              POLAND’S RAVE <br />
              <span className="text-gradient-acid">CULTURE,</span> IN ONE PLACE
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              The definitive underground platform connecting ravers, warehouse collectives, 
              legendary clubs, modular synthesists, and electronic music pioneers across Poland.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('events')}
              className="px-8 py-3.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-extrabold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-[0_0_30px_rgba(200,255,0,0.4)] flex items-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('artists')}
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-bold text-sm uppercase tracking-wider transition-all duration-200 backdrop-blur-md flex items-center space-x-2"
            >
              <Users className="w-4 h-4 text-[#00f0ff]" />
              <span>Discover Artists</span>
            </button>
          </div>

          {/* Live Quick Filter Toolbar */}
          <form 
            onSubmit={handleHeroSearch}
            className="max-w-3xl mx-auto mt-8 p-3 rounded-2xl bg-[#11131c]/90 border border-white/15 backdrop-blur-xl shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-left"
          >
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 px-1">
                Select City
              </label>
              <select
                value={heroSearchCity}
                onChange={(e) => setHeroSearchCity(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-[#c8ff00]"
              >
                <option value="">All Polish Cities</option>
                {CITIES.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#11131c]">
                    {c.name} ({c.activeEventsCount} raves)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 px-1">
                Preferred Genre
              </label>
              <select
                value={heroSearchGenre}
                onChange={(e) => setHeroSearchGenre(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-[#c8ff00]"
              >
                <option value="">All Electronic Genres</option>
                <option value="Industrial Techno" className="bg-[#11131c]">Industrial Techno</option>
                <option value="Hypnotic Techno" className="bg-[#11131c]">Hypnotic Techno</option>
                <option value="Acid Techno" className="bg-[#11131c]">Acid Techno</option>
                <option value="Modular Live" className="bg-[#11131c]">Modular Live</option>
                <option value="Hard Dance" className="bg-[#11131c]">Hard Dance / Gabber</option>
                <option value="EBM" className="bg-[#11131c]">EBM & Electro</option>
                <option value="Ambient" className="bg-[#11131c]">Ambient & Deep</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#c8ff00] text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Scene</span>
              </button>
            </div>
          </form>

          {/* Quick Scene Counters */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-neutral-400 text-xs font-mono">
            <div>
              <span className="text-xl font-bold text-white font-display block">14</span>
              <span>Major Polish Cities</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#c8ff00] font-display block">100%</span>
              <span>Verified Raves</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#00f0ff] font-display block">24h+</span>
              <span>Marathon Events</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#9945ff] font-display block">Safe</span>
              <span>Harm Reduction Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* HAPPENING THIS WEEKEND SPOTLIGHT */}
      {thisWeekendEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest mb-1.5">
                <Flame className="w-4 h-4 fill-current" />
                <span>Immediate Underground Agenda</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                Happening Tonight & This Weekend
              </h2>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-mono text-neutral-400 hover:text-[#c8ff00] flex items-center space-x-1 transition self-start sm:self-auto"
            >
              <span>View full calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thisWeekendEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={(id) => onNavigate('event-detail', id)}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        </section>
      )}

      {/* DISCOVER BY POLISH CITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#00f0ff] text-xs font-mono uppercase tracking-widest mb-1.5">
              <MapPin className="w-4 h-4" />
              <span>Geographic Underground Exploration</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Explore Poland By City
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              From Warsaw's legendary basement sanctuaries to Poznań’s fallout bunkers and Gdańsk’s Baltic shipyard warehouses.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cities')}
            className="text-xs font-mono text-neutral-400 hover:text-[#00f0ff] flex items-center space-x-1 transition self-start sm:self-auto"
          >
            <span>All 14 Polish cities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CITIES.slice(0, 8).map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onSelect={(id) => onNavigate('cities', id)}
            />
          ))}
        </div>
      </section>

      {/* FEATURED EVENTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Curated Program</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Featured Polish Raves
            </h2>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs font-mono text-neutral-400 hover:text-[#c8ff00] flex items-center space-x-1 transition self-start sm:self-auto"
          >
            <span>Browse all events ({approvedEvents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={(id) => onNavigate('event-detail', id)}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </section>

      {/* FEATURED UNDERGROUND ARTISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#00f0ff] text-xs font-mono uppercase tracking-widest mb-1.5">
              <Users className="w-4 h-4" />
              <span>Domestic & Resident Talent</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Pioneering Polish Artists
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Follow your favorite producers and receive in-platform notifications when they announce warehouse appearances.
            </p>
          </div>
          <button
            onClick={() => onNavigate('artists')}
            className="text-xs font-mono text-neutral-400 hover:text-[#00f0ff] flex items-center space-x-1 transition self-start sm:self-auto"
          >
            <span>View all artists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.slice(0, 4).map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onSelect={(id) => onNavigate('artist-detail', id)}
            />
          ))}
        </div>
      </section>

      {/* LATEST MUSIC RELEASES & MIXES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="bg-gradient-to-br from-[#10131d] to-[#0c0e14] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8ff00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 relative z-10">
            <div>
              <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest mb-1.5">
                <Music className="w-4 h-4" />
                <span>Rave Nation Sound Vault</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                Latest Tracks & Live Sets
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Stream authentic modular sessions, studio singles, and marathon recordings from Polish clubs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('music')}
              className="text-xs font-mono text-neutral-400 hover:text-[#c8ff00] flex items-center space-x-1 transition self-start sm:self-auto"
            >
              <span>Explore music catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {tracks.slice(0, 6).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    if (isCurrent) togglePlay();
                    else playTrack(track);
                  }}
                  className={`flex items-center space-x-3 p-3 bg-black/40 hover:bg-black/70 border rounded-xl transition cursor-pointer group ${
                    isCurrent && isPlaying
                      ? 'border-[#c8ff00] bg-[#c8ff00]/10 shadow-[0_0_15px_rgba(200,255,0,0.15)]'
                      : 'border-white/10 hover:border-[#c8ff00]/40'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={track.artworkUrl}
                      alt={track.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 rounded-lg flex items-center justify-center transition">
                      {isCurrent && isPlaying ? (
                        <Pause className="w-5 h-5 text-[#c8ff00] fill-[#c8ff00]" />
                      ) : (
                        <Play className="w-5 h-5 text-white fill-white group-hover:text-[#c8ff00] group-hover:fill-[#c8ff00] transition group-hover:scale-110 ml-0.5" />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#c8ff00] mb-0.5">
                      <span>{track.format}</span>
                      {track.bpm && <span>• {track.bpm} BPM</span>}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#c8ff00] transition truncate">
                      {track.title}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate">
                      {track.artistName}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 pr-2">
                    {track.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POLISH RAVE JOURNALISM & SCENE EDITORIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#9945ff] text-xs font-mono uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Scene Journalism & Harm Reduction</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Underground Chronicles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('news')}
            className="text-xs font-mono text-neutral-400 hover:text-[#9945ff] flex items-center space-x-1 transition self-start sm:self-auto"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('news-detail', article.id)}
              className="group bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden hover:border-[#9945ff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
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

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 mb-2 font-mono">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#9945ff] transition leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
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
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAFE RAVE & AWARENESS PLEDGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1017] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Poland Safe Rave Manifesto</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Consent. Awareness. Radical Inclusion.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Rave Nation partners with leading awareness initiatives (including SIN - Społeczna Inicjatywa Narkopolityki)
              and Polish club awareness angels to ensure partygoers dance safely. Camera stickers protect everyone’s freedom on the dancefloor.
            </p>
          </div>

          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 rounded-xl border border-white/20 hover:border-[#c8ff00] text-white hover:text-[#c8ff00] font-mono text-xs uppercase tracking-wider transition whitespace-nowrap"
          >
            Read Safety & Etiquette Guide
          </button>
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131622] to-[#0a0b10] border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#c8ff00]/10 border border-[#c8ff00]/30 text-[#c8ff00] flex items-center justify-center mx-auto mb-4">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
            Rave Pulse Poland
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mt-2 mb-6">
            Get weekly secret lineup drops, early-bird ticket access, and Polish festival previews delivered straight to your inbox.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium inline-flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>You're locked into the pulse. Welcome to Rave Nation Poland.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your.email@underground.pl"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c8ff00]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(200,255,0,0.3)] flex items-center justify-center space-x-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-neutral-500 mt-4">
            No spam. GDPR compliant. One-click unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};
