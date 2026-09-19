import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Disc, 
  MapPin, 
  Globe, 
  Music2, 
  Calendar, 
  Edit3, 
  Check, 
  X, 
  ShieldCheck, 
  Sliders, 
  ExternalLink, 
  Users, 
  Play, 
  Plus, 
  Sparkles,
  SlidersHorizontal,
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRave } from '../context/RaveContext';
import { ArtistProfileData } from '../types';

interface ArtistProfilePageProps {
  onNavigate: (view: string, id?: string) => void;
}

const POLISH_CITIES = ['Warsaw', 'Kraków', 'Poznań', 'Wrocław', 'Gdańsk', 'Katowice', 'Łódź', 'Berlin / Warsaw'];
const GENRES = ['Industrial Techno', 'Acid Techno', 'Hypnotic Techno', 'Hard Dance / Gabber', 'EBM & Darkwave', 'Modular Live', 'Dub & Deep Techno', 'Psytrance'];

export const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({ onNavigate }) => {
  const { user, updateArtistProfile, updateProfile, openAuthModal } = useAuth();
  const { tracks, events, playTrack, currentTrack, isPlaying, showToast } = useRave();

  const artistData = user?.artistProfile;

  const [isEditing, setIsEditing] = useState(false);
  const [editStageName, setEditStageName] = useState(artistData?.stageName || user?.name || '');
  const [editRealName, setEditRealName] = useState(artistData?.realName || '');
  const [editCity, setEditCity] = useState(artistData?.city || user?.cityPreference || 'Warsaw');
  const [editBio, setEditBio] = useState(artistData?.bio || '');
  const [editResidentClub, setEditResidentClub] = useState(artistData?.residentClub || 'Independent');
  const [editPerformanceType, setEditPerformanceType] = useState<ArtistProfileData['performanceType']>(
    artistData?.performanceType || 'DJ Set'
  );
  const [editEquipment, setEditEquipment] = useState(
    artistData?.equipmentSpecs || '2x Pioneer CDJ-3000, 1x DJM-900NXS2'
  );
  const [editBookingContact, setEditBookingContact] = useState(artistData?.bookingContact || user?.email || '');
  const [editSoundcloud, setEditSoundcloud] = useState(artistData?.soundcloudUrl || '');
  const [editSpotify, setEditSpotify] = useState(artistData?.spotifyUrl || '');
  const [editGenres, setEditGenres] = useState<string[]>(
    artistData?.genres || user?.favoriteGenres || ['Industrial Techno', 'Modular Live']
  );

  useEffect(() => {
    if (user) {
      setEditStageName(user.artistProfile?.stageName || user.name || '');
      setEditRealName(user.artistProfile?.realName || '');
      setEditCity(user.artistProfile?.city || user.cityPreference || 'Warsaw');
      setEditBio(user.artistProfile?.bio || '');
      setEditResidentClub(user.artistProfile?.residentClub || 'Independent');
      setEditPerformanceType(user.artistProfile?.performanceType || 'DJ Set');
      setEditEquipment(user.artistProfile?.equipmentSpecs || '2x Pioneer CDJ-3000, 1x DJM-900NXS2');
      setEditBookingContact(user.artistProfile?.bookingContact || user.email || '');
      setEditSoundcloud(user.artistProfile?.soundcloudUrl || '');
      setEditSpotify(user.artistProfile?.spotifyUrl || '');
      setEditGenres(user.artistProfile?.genres || user.favoriteGenres || ['Industrial Techno']);
    }
  }, [user]);

  // Auth Guard: If not logged in, show Auth Wall
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-[#11131c] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-mono text-[11px] mb-3">
            <Radio className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Artist & Producer Portal</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mb-2">
            Artist Login Required
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Please log in with your verified artist credentials to manage your DJ alias, sound vault releases, technical rider specifications, and club bookings.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login', 'artist')}
              className="w-full py-3 px-4 rounded-xl bg-[#00f0ff] hover:bg-[#00d4e3] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Log In to Artist Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal('register', 'artist')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition"
            >
              Register New Artist Profile
            </button>
            <button
              onClick={() => onNavigate('artists')}
              className="w-full text-center text-xs text-neutral-400 hover:text-white pt-2 transition"
            >
              ← Explore Polish Resident Artists
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Artist's tracks and events
  const artistTracks = tracks.filter((t) => 
    t.artistId === user?.artistProfileId || 
    t.artistName.toLowerCase().includes((artistData?.stageName || user?.name || '').toLowerCase())
  );

  const artistEvents = events.filter((e) => 
    e.organizerId === user?.id || 
    e.lineup.some((l) => l.name.toLowerCase().includes((artistData?.stageName || user?.name || '').toLowerCase()))
  );

  const toggleGenre = (genre: string) => {
    setEditGenres((prev) => 
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    await updateProfile({
      name: editStageName,
      cityPreference: editCity,
      favoriteGenres: editGenres
    });

    await updateArtistProfile({
      stageName: editStageName,
      realName: editRealName,
      city: editCity,
      bio: editBio,
      residentClub: editResidentClub,
      performanceType: editPerformanceType,
      equipmentSpecs: editEquipment,
      bookingContact: editBookingContact,
      soundcloudUrl: editSoundcloud,
      spotifyUrl: editSpotify,
      genres: editGenres
    });

    setIsEditing(false);
    showToast('Artist profile & technical rider updated in Firestore!');
  };

  return (
    <div className="min-h-screen bg-[#07080c] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb & Portal Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <span>/</span>
            <span className="text-[#00f0ff]">Artist & Producer Hub</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono font-bold flex items-center space-x-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>Artist Portal (Verified DJ / Producer)</span>
            </span>
          </div>
        </div>

        {/* Hero Artist Header Card */}
        <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center space-x-5">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={artistData?.stageName || user?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#00f0ff]/40 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-[#00f0ff] text-black font-display font-black text-[10px] uppercase tracking-wider shadow">
                  PRO
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {artistData?.stageName || user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] text-xs font-mono font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Polish Artist</span>
                  </span>
                </div>
                
                <p className="text-xs text-neutral-400 font-mono mb-2 flex items-center space-x-2">
                  <span>{artistData?.realName ? `${artistData.realName} • ` : ''}{user.email}</span>
                  <span>•</span>
                  <span className="text-[#00f0ff] flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{artistData?.city || user.cityPreference || 'Warsaw'}</span>
                  </span>
                </p>

                <p className="text-xs text-neutral-300 max-w-xl line-clamp-2">
                  {artistData?.bio || 'Polish underground electronic music producer and live performer.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center space-x-2 transition border border-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Artist Profile'}</span>
              </button>
              <button
                onClick={() => onNavigate('artist-dashboard')}
                className="px-4 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#00d4e3] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center space-x-1.5"
              >
                <Sliders className="w-4 h-4" />
                <span>Artist Studio & Upload</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-left">
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Performance Format</p>
              <p className="font-display font-black text-base text-[#00f0ff] mt-0.5">
                {artistData?.performanceType || 'Hybrid Live'}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Club Residency</p>
              <p className="font-display font-bold text-sm text-white mt-1 truncate">
                {artistData?.residentClub || 'Jasna 1 (Warsaw)'}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Sound Vault Tracks</p>
              <p className="font-display font-black text-xl text-white mt-0.5">
                {artistTracks.length > 0 ? artistTracks.length : 3}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Upcoming Gigs</p>
              <p className="font-display font-black text-xl text-[#c8ff00] mt-0.5">
                {artistEvents.length > 0 ? artistEvents.length : 2}
              </p>
            </div>
          </div>
        </div>

        {/* EDIT ARTIST PROFILE DRAWER */}
        {isEditing && (
          <div className="bg-[#151824] border border-[#00f0ff]/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="font-display font-bold text-base text-white">Edit Artist Profile & Technical Rider</h3>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Stage Name / DJ Alias
                </label>
                <input
                  type="text"
                  value={editStageName}
                  onChange={(e) => setEditStageName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Legal / Real Name
                </label>
                <input
                  type="text"
                  value={editRealName}
                  onChange={(e) => setEditRealName(e.target.value)}
                  placeholder="e.g. Martyna Maja"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Base City
                </label>
                <select
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                >
                  {POLISH_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Performance Format
                </label>
                <select
                  value={editPerformanceType}
                  onChange={(e) => setEditPerformanceType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="DJ Set">DJ Set (CDJ / Vinyl)</option>
                  <option value="Hybrid Live">Hybrid Live (DJ + Hardware)</option>
                  <option value="Modular Live">Modular Live Synth</option>
                  <option value="Hardware Live">Hardware Live Set</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Resident Club / Collective Affiliation
                </label>
                <input
                  type="text"
                  value={editResidentClub}
                  onChange={(e) => setEditResidentClub(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Booking Contact / Agent Email
                </label>
                <input
                  type="email"
                  value={editBookingContact}
                  onChange={(e) => setEditBookingContact(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Soundcloud / Mixcloud URL
                </label>
                <input
                  type="url"
                  value={editSoundcloud}
                  onChange={(e) => setEditSoundcloud(e.target.value)}
                  placeholder="https://soundcloud.com/..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Spotify Artist URL
                </label>
                <input
                  type="url"
                  value={editSpotify}
                  onChange={(e) => setEditSpotify(e.target.value)}
                  placeholder="https://open.spotify.com/artist/..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Technical Equipment Specs & Stage Rider
                </label>
                <input
                  type="text"
                  value={editEquipment}
                  onChange={(e) => setEditEquipment(e.target.value)}
                  placeholder="e.g. 2x CDJ-3000, Pioneer DJM-900NXS2, Boss RE-20, Roland TR-8S"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Artist Bio / Sound Philosophy
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Musical Subgenres
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES.map((g) => {
                    const selected = editGenres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGenre(g)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                          selected
                            ? 'bg-[#00f0ff] text-black font-bold'
                            : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#00d4e3] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save to Firestore</span>
              </button>
            </div>
          </div>
        )}

        {/* Detailed Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Sound Vault Tracks & Technical Rider */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Technical Rider & Hardware Specs */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="font-display font-bold text-base text-white">Technical Rider & Stage Setup</h3>
              </div>

              <div className="p-4 bg-white/3 border border-white/5 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Format:</span>
                  <span className="text-[#00f0ff] font-bold">{artistData?.performanceType || 'Hybrid Live'}</span>
                </div>
                <div className="text-xs">
                  <span className="text-neutral-400 font-mono block mb-1">Equipment Rider:</span>
                  <p className="text-neutral-200 bg-black/40 p-2.5 rounded-lg border border-white/5 font-mono text-[11px]">
                    {artistData?.equipmentSpecs || '2x CDJ-3000, Pioneer DJM-900NXS2, Roland TR-8S, Space Echo RE-20'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-neutral-400">Monitoring:</span>
                  <span className="text-white">2x L-Acoustics or d&b wedge stereo monitors (ear level)</span>
                </div>
              </div>
            </div>

            {/* Sound Vault Tracks */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <Music2 className="w-4 h-4 text-[#00f0ff]" />
                  <h3 className="font-display font-bold text-base text-white">Sound Vault Discography</h3>
                </div>
                <button
                  onClick={() => onNavigate('artist-dashboard')}
                  className="text-xs text-[#00f0ff] hover:underline flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Upload Track</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {tracks.slice(0, 4).map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      className="p-3 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group transition"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <button
                          onClick={() => playTrack(track)}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                            isCurrent && isPlaying
                              ? 'bg-[#00f0ff] text-black'
                              : 'bg-white/10 text-white group-hover:bg-[#00f0ff] group-hover:text-black'
                          }`}
                        >
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        </button>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{track.title}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            {track.artistName} • {track.genre} {track.bpm ? `• ${track.bpm} BPM` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">{track.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Gigs */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#c8ff00]" />
                  <h3 className="font-display font-bold text-base text-white">Upcoming Gigs & Lineups</h3>
                </div>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-xs text-[#c8ff00] hover:underline"
                >
                  View all raves
                </button>
              </div>

              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onNavigate('event-detail', event.id)}
                    className="p-3 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-center w-12 py-1 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-[10px] uppercase font-mono text-neutral-400">{event.date.slice(5, 7)}</p>
                        <p className="text-sm font-bold text-white">{event.date.slice(8, 10)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{event.title}</p>
                        <p className="text-[11px] text-neutral-400">{event.venueName} • {event.cityName}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#c8ff00] font-bold">
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column: Booking & Agency Information */}
          <div className="space-y-6">
            {/* Booking & Management Card */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
                <Mail className="w-4 h-4 text-[#00f0ff]" />
                <h3 className="font-display font-bold text-base text-white">Booking & Inquiries</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase">Official Contact</span>
                  <p className="text-white font-mono mt-0.5">{artistData?.bookingContact || user?.email || 'booking@ravenation.pl'}</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase">Roster Agency</span>
                  <p className="text-white mt-0.5">Underground Polish Booking Alliance</p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-[10px] uppercase">Available Territories</span>
                  <p className="text-white mt-0.5">Poland, Germany, Czechia, Europe-wide</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <a
                  href={artistData?.soundcloudUrl || 'https://soundcloud.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs flex items-center justify-between transition"
                >
                  <span className="flex items-center space-x-2">
                    <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>Soundcloud Profile</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>

                <a
                  href={artistData?.spotifyUrl || 'https://spotify.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs flex items-center justify-between transition"
                >
                  <span className="flex items-center space-x-2">
                    <Music2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Spotify Catalogue</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Record Labels */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
                <Disc className="w-4 h-4 text-[#c8ff00]" />
                <h3 className="font-display font-bold text-base text-white">Record Label Affiliations</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Hellcat Industries', 'Ninja Tune', 'Monnom Black', 'Intrepid Skin'].map((label) => (
                  <span
                    key={label}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
