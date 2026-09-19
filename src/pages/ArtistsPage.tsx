import React, { useState, useMemo } from 'react';
import { Search, Users, MapPin, SlidersHorizontal, Music } from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { ArtistCard } from '../components/ArtistCard';
import { CITIES } from '../data/mockData';

interface ArtistsPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({ onNavigate }) => {
  const { artists } = useRave();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = [
    'Industrial Techno',
    'Hard Dance',
    'Hypnotic Techno',
    'Acid Techno',
    'Modular Live',
    'Ambient / Drone',
    'EBM'
  ];

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      if (search && !artist.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedCity && artist.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedGenre && !artist.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [artists, search, selectedCity, selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[#00f0ff] text-xs font-mono uppercase tracking-widest mb-1">
          <Users className="w-4 h-4" />
          <span>Underground Artist Registry</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Polish DJs, Producers & Live Acts
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
          Discover resident innovators shaping warehouse rave culture in Warsaw, Kraków, Poznań, Wrocław, and the Tri-City.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artist name..."
            className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff]"
          />
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff]"
          >
            <option value="">All Polish Hubs</option>
            {CITIES.map((c) => (
              <option key={c.id} value={c.name} className="bg-[#11131c]">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f0ff]"
          >
            <option value="">All Electronic Sub-genres</option>
            {genres.map((g) => (
              <option key={g} value={g} className="bg-[#11131c]">
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-neutral-400">
            Showing <span className="text-white font-bold">{filteredArtists.length}</span> verified Polish artists
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onSelect={(id) => onNavigate('artist-detail', id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
