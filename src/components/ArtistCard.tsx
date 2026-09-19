import React from 'react';
import { ShieldCheck, Play, UserPlus, UserCheck, MapPin } from 'lucide-react';
import { ArtistProfile } from '../types';
import { useRave } from '../context/RaveContext';

interface ArtistCardProps {
  artist: ArtistProfile;
  onSelect: (artistId: string) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onSelect }) => {
  const { isFollowingArtist, toggleFollowArtist, tracks, playTrack } = useRave();
  const following = isFollowingArtist(artist.id);

  const artistTrack = tracks.find((t) => t.artistId === artist.id) || tracks[0];

  return (
    <div 
      onClick={() => onSelect(artist.id)}
      className="group relative bg-[#0f1118] rounded-2xl border border-white/10 overflow-hidden hover:border-[#00f0ff]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] cursor-pointer text-left flex flex-col justify-between"
    >
      {/* Banner / Avatar Header */}
      <div className="relative h-24 w-full bg-neutral-800 overflow-hidden">
        <img
          src={artist.banner}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1118] to-transparent" />
      </div>

      <div className="px-5 pb-5 -mt-10 relative flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-end justify-between mb-3">
            <div className="relative">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-18 h-18 rounded-2xl object-cover ring-2 ring-[#0f1118] shadow-xl"
              />
              {artist.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-[#00f0ff] text-black p-0.5 rounded-full" title="Verified Underground Artist">
                  <ShieldCheck className="w-4 h-4 fill-black" />
                </div>
              )}
            </div>

            {/* Quick Play button */}
            {artistTrack && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(artistTrack);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#c8ff00] text-white hover:text-black transition"
                title={`Play latest release by ${artist.name}`}
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1 text-xs text-neutral-400 mb-1">
            <MapPin className="w-3 h-3 text-[#00f0ff]" />
            <span>{artist.city}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors">
            {artist.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {artist.bio}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {artist.genres.map((g) => (
              <span
                key={g}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">
            {artist.followersCount.toLocaleString()} followers
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowArtist(artist.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              following
                ? 'bg-white/10 text-[#00f0ff] border border-[#00f0ff]/40'
                : 'bg-white/5 hover:bg-white/15 text-white'
            }`}
          >
            {following ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
            <span>{following ? 'Following' : 'Follow'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
