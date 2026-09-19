import React from 'react';
import { MapPin, Volume2, ShieldCheck, Ticket, Users, ArrowRight } from 'lucide-react';
import { VENUES } from '../data/mockData';
import { useRave } from '../context/RaveContext';

interface VenuesPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const VenuesPage: React.FC<VenuesPageProps> = ({ onNavigate }) => {
  const { setSelectedCityFilter } = useRave();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[#9945ff] text-xs font-mono uppercase tracking-widest mb-1">
          <MapPin className="w-4 h-4" />
          <span>Physical Dancefloor Sanctuaries</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Underground Polish Venues & Clubs
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          From former nuclear fallout shelters in Poznań to converted Baltic shipyard carpentry workshops and Warsaw basement vaults.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VENUES.map((venue) => (
          <div
            key={venue.id}
            className="bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden hover:border-[#9945ff]/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] via-transparent to-black/30" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-black/60 backdrop-blur-md text-[#9945ff] border border-[#9945ff]/30">
                  {venue.cityName}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-display font-black text-2xl text-white">
                  {venue.name}
                </h3>
                <p className="text-xs text-neutral-400 flex items-center space-x-1 mt-1 font-mono">
                  <MapPin className="w-3 h-3 text-[#00f0ff]" />
                  <span>{venue.address}</span>
                </p>

                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  {venue.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-2 text-neutral-300">
                  <Volume2 className="w-3.5 h-3.5 text-[#c8ff00] flex-shrink-0" />
                  <span className="truncate">{venue.soundSystem}</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-300">
                  <Users className="w-3.5 h-3.5 text-[#00f0ff] flex-shrink-0" />
                  <span>Capacity: ~{venue.capacity} attendees</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{venue.cameraPolicy || (venue.rules && venue.rules[0]) || 'Strict Safe Space & Door Selection'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCityFilter(venue.cityName);
                  onNavigate('events');
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#9945ff] hover:text-white border border-white/10 text-neutral-300 text-xs font-display font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
              >
                <span>View {venue.name} Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
