import React, { useState } from 'react';
import { MapPin, ArrowRight, Search, Compass } from 'lucide-react';
import { CITIES, VENUES } from '../data/mockData';
import { useRave } from '../context/RaveContext';

interface CitiesPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const CitiesPage: React.FC<CitiesPageProps> = ({ onNavigate }) => {
  const { setSelectedCityFilter } = useRave();
  const [search, setSearch] = useState('');

  const filteredCities = CITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  const handleCityClick = (cityName: string) => {
    setSelectedCityFilter(cityName);
    onNavigate('events');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00f0ff] text-xs font-mono uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4" />
            <span>Geographic Underground Exploration</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
            Polish Rave Hubs & Cities
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Explore club communities, secret post-industrial warehouses, and grassroots scenes across Poland's 14 vibrant electronic music epicenters.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find city or voivodeship..."
            className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff]"
          />
        </div>
      </div>

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <div
            key={city.id}
            onClick={() => handleCityClick(city.name)}
            className="group relative bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00f0ff]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={city.heroImage}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-black/30" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#c8ff00] border border-[#c8ff00]/30">
                  {city.activeEventsCount} Active Events
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>{city.region}, Poland</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-[#00f0ff] transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed">
                  {city.description}
                </p>
              </div>

              {/* Famous Venues Tags */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                  Pivotal Underground Venues:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {city.famousClubs.map((club) => (
                    <span
                      key={club}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
                    >
                      {club}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#00f0ff] font-semibold">
                  <span>Browse {city.name} Raves</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
