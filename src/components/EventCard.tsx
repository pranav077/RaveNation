import React from 'react';
import { Calendar, MapPin, Heart, ArrowUpRight, Ticket, Users } from 'lucide-react';
import { RaveEvent } from '../types';
import { useRave } from '../context/RaveContext';

interface EventCardProps {
  event: RaveEvent;
  onSelect: (eventId: string) => void;
  onBookNow: (event: RaveEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onBookNow }) => {
  const { isFavourite, toggleFavourite } = useRave();
  const favourited = isFavourite(event.id);

  const getStatusBadge = () => {
    if (event.status === 'sold_out') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/25 text-red-400 border border-red-500/30">
          Sold Out
        </span>
      );
    }
    if (event.status === 'selling_fast') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/25 text-amber-300 border border-amber-500/30">
          Selling Fast
        </span>
      );
    }
    if (event.isThisWeekend) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#c8ff00]/25 text-[#c8ff00] border border-[#c8ff00]/30">
          This Weekend
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-neutral-300 border border-white/15">
        Tickets Available
      </span>
    );
  };

  return (
    <div 
      onClick={() => onSelect(event.id)}
      className="group relative bg-[#0f1118] rounded-2xl border border-white/10 overflow-hidden hover:border-[#c8ff00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,255,0,0.12)] flex flex-col cursor-pointer text-left"
    >
      {/* Poster Image & Overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        <img
          src={event.posterUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            {getStatusBadge()}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 text-white border border-white/10">
              {event.ageRestriction}
            </span>
          </div>

          {/* Favourite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourite(event.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition ${
              favourited 
                ? 'bg-[#ff1e42] text-white' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            title={favourited ? 'Remove from saved' : 'Save event'}
          >
            <Heart className={`w-4 h-4 ${favourited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Date Tag Overlay on image */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-[#c8ff00]" />
          <span>{event.date}</span>
          <span>•</span>
          <span>{event.startTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location / Venue */}
          <div className="flex items-center space-x-1.5 text-xs text-neutral-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="font-semibold text-white">{event.venueName}</span>
            <span>•</span>
            <span>{event.cityName}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-white group-hover:text-[#c8ff00] transition-colors leading-snug line-clamp-1">
            {event.title}
          </h3>

          {/* Lineup Highlights */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {event.lineup.slice(0, 3).map((artist, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
              >
                {artist.name}
              </span>
            ))}
            {event.lineup.length > 3 && (
              <span className="text-[10px] font-mono text-neutral-500 self-center">
                +{event.lineup.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer: Price & Book Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block">
              Tickets From
            </span>
            <span className="font-mono font-extrabold text-white text-base">
              {event.minPrice} <span className="text-[#c8ff00] text-xs font-bold">PLN</span>
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(event);
            }}
            disabled={event.status === 'sold_out'}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#c8ff00] text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 group-hover:bg-[#c8ff00] group-hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{event.status === 'sold_out' ? 'Sold Out' : 'Book Ticket'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
