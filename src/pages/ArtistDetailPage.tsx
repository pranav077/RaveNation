import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  UserPlus, 
  UserCheck, 
  Play, 
  Calendar, 
  Ticket, 
  Radio, 
  ExternalLink,
  Volume2,
  Disc
} from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { RaveEvent } from '../types';

interface ArtistDetailPageProps {
  artistId: string;
  onBack: () => void;
  onNavigate: (view: string, id?: string) => void;
  onBookNow: (event: RaveEvent) => void;
}

export const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({
  artistId,
  onBack,
  onNavigate,
  onBookNow
}) => {
  const { artists, events, tracks, isFollowingArtist, toggleFollowArtist, playTrack, currentTrack, isPlaying } = useRave();
  
  const artist = artists.find((a) => a.id === artistId) || artists[0];
  const following = isFollowingArtist(artist.id);

  // Artist's tracks
  const artistTracks = tracks.filter((t) => t.artistId === artist.id);

  // Events featuring this artist
  const upcomingEvents = events.filter((e) =>
    e.lineup.some((l) => l.artistId === artist.id || l.name.toLowerCase() === artist.name.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 text-left">
      {/* Top back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to artists</span>
      </button>

      {/* HERO BANNER & AVATAR PROFILE */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0e1017]">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={artist.banner}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/50 to-black/30" />
        </div>

        <div className="p-6 sm:p-10 -mt-24 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-[#0e1017] shadow-2xl"
              />
              {artist.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-[#00f0ff] text-black p-1.5 rounded-full shadow-lg" title="Verified Underground Artist">
                  <ShieldCheck className="w-5 h-5 fill-black" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{artist.city}, Poland</span>
                <span>•</span>
                <span>{artist.followersCount.toLocaleString()} followers</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
                {artist.name}
              </h1>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {artist.genres.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => toggleFollowArtist(artist.id)}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition ${
                following
                  ? 'bg-white/10 text-[#00f0ff] border border-[#00f0ff]/40'
                  : 'bg-[#00f0ff] hover:bg-[#00d4e0] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
              }`}
            >
              {following ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              <span>{following ? 'Following Artist' : 'Follow Artist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROFILE CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Biography & Discography */}
        <div className="lg:col-span-8 space-y-8">
          {/* Biography */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">
              Artist Profile & Sound Philosophy
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>

          {/* Discography & Sound Recordings */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider flex items-center space-x-2">
                  <Disc className="w-5 h-5 text-[#c8ff00]" />
                  <span>Releases & Live Sets</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Stream studio releases and recorded club sessions in the Rave Player
                </p>
              </div>
            </div>

            {artistTracks.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4">No audio tracks currently uploaded for this artist profile.</p>
            ) : (
              <div className="space-y-3">
                {artistTracks.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 cursor-pointer group ${
                        isCurrent
                          ? 'border-[#c8ff00] bg-[#c8ff00]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={track.artworkUrl}
                            alt={track.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center group-hover:bg-black/20">
                            <Play className={`w-5 h-5 ${isCurrent && isPlaying ? 'text-[#c8ff00] fill-[#c8ff00]' : 'text-white fill-white'}`} />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#c8ff00]">
                            <span>{track.format}</span>
                            {track.bpm && <span>• {track.bpm} BPM</span>}
                            {track.label && <span>• {track.label}</span>}
                          </div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#c8ff00] transition truncate">
                            {track.title}
                          </h4>
                          <p className="text-xs text-neutral-400">{track.genre}</p>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs text-neutral-400">
                        {track.duration}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Gigs & Socials */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Appearances */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#c8ff00]" />
              <span>Upcoming Dates</span>
            </h3>

            {upcomingEvents.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4">No upcoming tour dates announced yet.</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => onNavigate('event-detail', ev.id)}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#c8ff00]/40 transition cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>{ev.date}</span>
                      <span className="text-[#00f0ff]">{ev.cityName}</span>
                    </div>
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-[#c8ff00] transition">
                      {ev.title}
                    </h5>
                    <p className="text-xs text-neutral-400">{ev.venueName}</p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookNow(ev);
                      }}
                      className="w-full py-2 mt-1 rounded-lg bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-[11px] uppercase tracking-wider transition flex items-center justify-center space-x-1"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Book Ticket ({ev.minPrice} PLN)</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Profiles */}
          <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400">
              External Channels
            </h4>
            <div className="space-y-2 text-xs">
              {artist.socialLinks.residentAdvisor && (
                <a
                  href={artist.socialLinks.residentAdvisor}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
                >
                  <span>Resident Advisor Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {artist.socialLinks.soundcloud && (
                <a
                  href={artist.socialLinks.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
                >
                  <span>SoundCloud Recordings</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {artist.socialLinks.instagram && (
                <a
                  href={artist.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
                >
                  <span>Instagram Updates</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
