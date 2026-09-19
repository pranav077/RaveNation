import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Ticket, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Volume2, 
  AlertTriangle, 
  Users, 
  Radio, 
  Compass, 
  ExternalLink,
  CheckCircle2,
  Play
} from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { RaveEvent } from '../types';

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
  onNavigate: (view: string, id?: string) => void;
  onBookNow: (event: RaveEvent) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId,
  onBack,
  onNavigate,
  onBookNow
}) => {
  const { events, isFavourite, toggleFavourite, tracks, playTrack, showToast } = useRave();
  const event = events.find((e) => e.id === eventId) || events[0];
  const favourited = isFavourite(event.id);

  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Event link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Find any track associated with lineup artists
  const lineupArtistIds = event.lineup.map((l) => l.artistId).filter(Boolean);
  const featuredLineupTracks = tracks.filter((t) => lineupArtistIds.includes(t.artistId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to events</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFavourite(event.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              favourited
                ? 'bg-[#ff1e42]/20 border-[#ff1e42] text-[#ff1e42]'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favourited ? 'fill-current' : ''}`} />
            <span>{favourited ? 'Saved in Favourites' : 'Save Event'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 text-xs font-semibold transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0e1017]">
        <div className="relative aspect-[21/9] sm:aspect-[24/10] w-full overflow-hidden">
          <img
            src={event.coverUrl || event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/60 to-black/30" />
        </div>

        {/* Content Overlaid onto Hero Base */}
        <div className="p-6 sm:p-10 -mt-24 sm:-mt-32 relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#c8ff00] text-black shadow-[0_0_15px_rgba(200,255,0,0.3)]">
              {event.status === 'sold_out' ? 'Sold Out' : event.status === 'selling_fast' ? 'Selling Fast' : 'Tickets On Sale'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-white border border-white/20">
              {event.ageRestriction} Strictly Enforced
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30">
              {event.cityName}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase leading-tight tracking-tight">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-neutral-300 text-xs sm:text-sm font-mono border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#c8ff00]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#00f0ff]" />
              <span>{event.startTime} – {event.endTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#9945ff]" />
              <span>{event.venueName}, {event.cityName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT & STICKY BOOKING SIDEBAR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: DESCRIPTION, LINEUP, VENUE & SOUND */}
        <div className="lg:col-span-8 space-y-10">
          {/* About Event Description */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider flex items-center space-x-2">
              <span>About The Gathering</span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>

            {/* Genre tags */}
            <div className="pt-3 flex flex-wrap gap-2">
              {event.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                >
                  #{genre}
                </span>
              ))}
            </div>
          </div>

          {/* TIMETABLE & LINEUP BREAKDOWN */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">
                  Full Lineup & Timetable
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {event.lineup.length} artists appearing across multiple stages
                </p>
              </div>
              <span className="text-xs font-mono text-[#c8ff00] bg-[#c8ff00]/10 px-2.5 py-1 rounded-lg">
                Official Running Order
              </span>
            </div>

            <div className="space-y-3">
              {event.lineup.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.artistId && onNavigate('artist-detail', item.artistId)}
                  className={`p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between gap-4 transition ${
                    item.artistId ? 'hover:border-[#00f0ff]/50 hover:bg-white/10 cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-white text-sm font-display">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-display font-bold text-base text-white">
                          {item.name}
                        </h4>
                        {item.isHeadliner && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#c8ff00]/20 text-[#c8ff00] font-bold">
                            Headliner
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {item.role || 'Live / DJ'} {item.stage ? `• ${item.stage}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs font-bold text-[#00f0ff] bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 block">
                      {item.setTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIO PREVIEWS FROM LINEUP */}
          {featuredLineupTracks.length > 0 && (
            <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-[#c8ff00]" />
                <span>Lineup Sound Previews</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Preview releases from artists headlining this gathering before the night begins:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredLineupTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#c8ff00]/40 flex items-center space-x-3 cursor-pointer group transition"
                  >
                    <img
                      src={track.artworkUrl}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white group-hover:text-[#c8ff00] truncate">
                        {track.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate">{track.artistName}</p>
                    </div>
                    <Play className="w-4 h-4 text-[#c8ff00] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VENUE & DOOR PROTOCOL */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#9945ff]" />
              <span>Venue, Transit & Safe Space Protocol</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-mono text-neutral-400 uppercase text-[10px]">Location & Address</span>
                <p className="font-bold text-white text-sm">{event.venueName}</p>
                <p className="text-neutral-300">{event.address}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-mono text-neutral-400 uppercase text-[10px]">Sound Architecture</span>
                <p className="font-bold text-white text-sm">Acoustic Engineering</p>
                <p className="text-neutral-300">Custom 4-Point Funktion-One Resolution System + Infrazero Bass Subs.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-mono text-neutral-400 uppercase text-[10px]">No Photo / Sticker Policy</span>
                <p className="font-bold text-white text-sm">Protected Dancefloor</p>
                <p className="text-neutral-300">Phone cameras are stickered upon entry. Strictly no flash photography.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-mono text-neutral-400 uppercase text-[10px]">Door Selection</span>
                <p className="font-bold text-white text-sm">Curated Crowd</p>
                <p className="text-neutral-300">Pre-booked tickets guarantee queue priority. Dress code: underground / dark expressive.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY TICKET BOOKING WIDGET */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-[#11131c] border-2 border-[#c8ff00]/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(200,255,0,0.15)] space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                  Official Tickets
                </span>
                <div className="font-display font-extrabold text-2xl text-white">
                  from {event.minPrice} <span className="text-[#c8ff00] text-sm">PLN</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 block">Attending</span>
                <span className="text-xs font-mono font-bold text-white">
                  {event.attendeesCount} ravers
                </span>
              </div>
            </div>

            {/* Ticket Tiers Breakdown */}
            <div className="space-y-2.5">
              <p className="text-xs font-mono uppercase text-neutral-400">Available Tiers:</p>
              {event.ticketTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{tier.name}</p>
                    <p className="text-[11px] text-neutral-400">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-[#c8ff00]">{tier.price} PLN</p>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {tier.available > 0 ? `${tier.available} left` : 'Sold out'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Book Now Primary Button */}
            <button
              onClick={() => onBookNow(event)}
              disabled={event.status === 'sold_out'}
              className="w-full py-3.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-black text-sm uppercase tracking-wider transition shadow-[0_0_20px_rgba(200,255,0,0.4)] disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>{event.status === 'sold_out' ? 'Event Sold Out' : 'Book Tickets Now'}</span>
            </button>

            <div className="pt-2 border-t border-white/10 space-y-2 text-[11px] text-neutral-400">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant Digital QR Pass with Apple/Google Wallet support</span>
              </div>
              <p>Official Rave Nation verified ticket. Refunds available up to 48 hours prior to door opening.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
