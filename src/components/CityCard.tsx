import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { City } from '../types';

interface CityCardProps {
  city: City;
  onSelect: (cityId: string) => void;
}

export const CityCard: React.FC<CityCardProps> = ({ city, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(city.id)}
      className="group relative h-64 rounded-2xl border border-white/10 overflow-hidden hover:border-[#c8ff00]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(200,255,0,0.15)] cursor-pointer text-left"
    >
      <img
        src={city.heroImage}
        alt={city.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-[#090a10]/50 to-transparent" />

      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[#c8ff00] border border-[#c8ff00]/30 font-bold uppercase tracking-wider">
            {city.activeEventsCount} active raves
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-1.5 text-xs text-neutral-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{city.region}</span>
          </div>

          <h3 className="font-display font-black text-2xl text-white group-hover:text-[#c8ff00] transition">
            {city.name}
          </h3>

          <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
            {city.description}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-white/15">
            <span className="text-neutral-400 font-mono text-[11px]">
              Clubs: {city.famousClubs.slice(0, 2).join(', ')}
            </span>
            <span className="text-[#c8ff00] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
