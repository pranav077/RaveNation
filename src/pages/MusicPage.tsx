import React, { useState } from 'react';
import { Play, Pause, Music, Radio, Disc, Search, Volume2 } from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { Track } from '../types';

interface MusicPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onNavigate }) => {
  const { tracks, currentTrack, isPlaying, playTrack, togglePlay } = useRave();
  const [formatFilter, setFormatFilter] = useState<'all' | 'digital' | 'vinyl' | 'live'>('all');
  const [search, setSearch] = useState('');

  const filteredTracks = tracks.filter((t) => {
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchArtist = t.artistName.toLowerCase().includes(q);
      const matchLabel = t.label?.toLowerCase().includes(q);
      if (!matchTitle && !matchArtist && !matchLabel) return false;
    }

    if (formatFilter === 'vinyl' && (t.format as string) !== '12" Vinyl EP') return false;
    if (formatFilter === 'digital' && (t.format as string) !== 'Digital Master') return false;
    if (formatFilter === 'live' && !(t.format as string).includes('Live') && !(t.format as string).includes('Modular')) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4" />
            <span>Rave Nation Sound Vault</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
            Polish Underground Releases
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Stream vinyl pressings, modular synth recordings, and club tapes straight from Poland’s foremost electronic music labels.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracks, artists, labels..."
            className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#c8ff00]"
          />
        </div>
      </div>

      {/* Format Filter Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {[
          { id: 'all', label: 'All Releases' },
          { id: 'digital', label: 'Digital Masters' },
          { id: 'vinyl', label: '12" Vinyl EPs' },
          { id: 'live', label: 'Modular Live Sets' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFormatFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              formatFilter === f.id
                ? 'bg-[#c8ff00] text-black border-[#c8ff00] font-bold shadow-[0_0_10px_rgba(200,255,0,0.3)]'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tracks Table / Grid */}
      <div className="space-y-3">
        {filteredTracks.map((track) => {
          const isCurrent = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              onClick={() => {
                if (isCurrent) togglePlay();
                else playTrack(track);
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group ${
                isCurrent
                  ? 'bg-[#c8ff00]/10 border-[#c8ff00] shadow-[0_0_20px_rgba(200,255,0,0.15)]'
                  : 'bg-[#0f1118] border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={track.artworkUrl}
                    alt={track.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center group-hover:bg-black/20">
                    {isCurrent && isPlaying ? (
                      <Pause className="w-6 h-6 text-[#c8ff00] fill-[#c8ff00]" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-white ml-0.5 group-hover:text-[#c8ff00] group-hover:fill-[#c8ff00]" />
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#c8ff00] mb-0.5">
                    <span className="px-1.5 py-0.2 bg-white/10 rounded">{track.format}</span>
                    {track.bpm && <span>{track.bpm} BPM</span>}
                    {(track.releaseYear || track.releaseDate) && <span>• {track.releaseYear || track.releaseDate?.slice(0, 4)}</span>}
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#c8ff00] transition truncate">
                    {track.title}
                  </h3>
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('artist-detail', track.artistId);
                    }}
                    className="text-xs text-neutral-400 hover:text-white transition truncate hover:underline"
                  >
                    {track.artistName} {track.label ? `• ${track.label}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono">
                <span className="hidden sm:inline px-2 py-1 rounded bg-white/5 text-neutral-400 border border-white/5">
                  {track.genre}
                </span>
                <span className="text-neutral-400">{track.duration}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrent) togglePlay();
                    else playTrack(track);
                  }}
                  className={`p-2 rounded-full transition ${
                    isCurrent && isPlaying
                      ? 'bg-[#c8ff00] text-black'
                      : 'bg-white/10 text-white hover:bg-[#c8ff00] hover:text-black'
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
