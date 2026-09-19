import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  MapPin, 
  Heart, 
  Ticket, 
  Calendar, 
  ShieldCheck, 
  Flame, 
  Edit3, 
  Check, 
  X, 
  Sliders, 
  QrCode, 
  Sparkles,
  ExternalLink,
  Award,
  Music2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRave } from '../context/RaveContext';
import { FanProfileData } from '../types';

interface FanProfilePageProps {
  onNavigate: (view: string, id?: string) => void;
}

const POLISH_CITIES = ['Warsaw', 'Kraków', 'Poznań', 'Wrocław', 'Gdańsk', 'Katowice', 'Łódź'];
const POLISH_CLUBS = ['Jasna 1', 'Schron', 'Ciało', 'Tama', 'P23', 'Crackhouse', 'Szpitalna 1', 'Smolna'];
const GENRES = ['Industrial Techno', 'Acid Techno', 'Hypnotic Techno', 'Hard Dance / Gabber', 'EBM & Darkwave', 'Modular Live', 'Dub & Deep Techno', 'Psytrance'];

export const FanProfilePage: React.FC<FanProfilePageProps> = ({ onNavigate }) => {
  const { user, updateFanProfile, updateProfile, openAuthModal } = useAuth();
  const { bookings, favourites, events, artists, followedArtists, showToast } = useRave();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editCity, setEditCity] = useState(user?.cityPreference || 'Warsaw');
  const [editBio, setEditBio] = useState(user?.fanProfile?.bio || '');
  const [editHomeClub, setEditHomeClub] = useState(user?.fanProfile?.homeClub || 'Jasna 1');
  const [editBpmRange, setEditBpmRange] = useState(user?.fanProfile?.favoriteBpmRange || '138 - 146 BPM');
  const [editGenres, setEditGenres] = useState<string[]>(user?.favoriteGenres || ['Hypnotic Techno', 'Acid Techno']);
  const [editLevel, setEditLevel] = useState<FanProfileData['experienceLevel']>(user?.fanProfile?.experienceLevel || 'Regular Clubber');

  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditCity(user.cityPreference || 'Warsaw');
      setEditBio(user.fanProfile?.bio || '');
      setEditHomeClub(user.fanProfile?.homeClub || 'Jasna 1');
      setEditBpmRange(user.fanProfile?.favoriteBpmRange || '138 - 146 BPM');
      setEditGenres(user.favoriteGenres || ['Hypnotic Techno', 'Acid Techno']);
      setEditLevel(user.fanProfile?.experienceLevel || 'Regular Clubber');
    }
  }, [user]);

  // If unauthenticated, show Auth Wall - profiles must be shown ONLY after login
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-[#11131c] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8ff00]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-[#c8ff00]/10 border border-[#c8ff00]/30 text-[#c8ff00] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(200,255,0,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-mono text-[11px] mb-3">
            <Headphones className="w-3.5 h-3.5 text-[#c8ff00]" />
            <span>Raver Fan Portal</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mb-2">
            Profile Sign-In Required
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Please log in to your Rave Nation account to access your personal raver profile, digital door passes, sound preferences, and club attendance records.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login', 'fan')}
              className="w-full py-3 px-4 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(200,255,0,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Log In as Raver Fan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal('register', 'fan')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition"
            >
              Create New Raver Account
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="w-full text-center text-xs text-neutral-400 hover:text-white pt-2 transition"
            >
              ← Back to Upcoming Raves
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bookings
  const userBookings = bookings.filter((b) => b.userId === user.id || b.attendee.email === user.email);
  const userFavourites = events.filter((e) => favourites.includes(e.id));
  const userFollowed = artists.filter((a) => followedArtists.includes(a.id));

  const toggleGenre = (genre: string) => {
    setEditGenres((prev) => 
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    await updateProfile({
      name: editName,
      cityPreference: editCity,
      favoriteGenres: editGenres
    });

    await updateFanProfile({
      bio: editBio,
      homeClub: editHomeClub,
      favoriteBpmRange: editBpmRange,
      experienceLevel: editLevel
    });

    setIsEditing(false);
    showToast('Fan profile updated and synced to Firestore!');
  };

  return (
    <div className="min-h-screen bg-[#07080c] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb & Portal Identifier */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <span>/</span>
            <span className="text-[#c8ff00]">Fan & Raver Profile</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#c8ff00]/10 border border-[#c8ff00]/30 text-[#c8ff00] text-xs font-mono font-bold flex items-center space-x-1.5">
              <Headphones className="w-3.5 h-3.5" />
              <span>Raver Portal (Verified)</span>
            </span>
          </div>
        </div>

        {/* Hero Profile Card */}
        <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8ff00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center space-x-5">
              <div className="relative">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                  alt={user.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#c8ff00]/40 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-[#c8ff00] text-black font-display font-black text-[10px] uppercase tracking-wider shadow">
                  FAN
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 text-xs font-mono">
                    {user.fanProfile?.experienceLevel || 'Rave Enthusiast'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono mb-2 flex items-center space-x-2">
                  <span>{user.email}</span>
                  <span>•</span>
                  <span className="text-[#c8ff00] flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{user.cityPreference || 'Warsaw'}</span>
                  </span>
                </p>
                <p className="text-xs text-neutral-300 max-w-xl line-clamp-2">
                  {user.fanProfile?.bio || 'Dedicated Polish underground electronic music listener and club attendee.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center space-x-2 transition border border-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#c8ff00]" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Fan Profile'}</span>
              </button>
              <button
                onClick={() => onNavigate('user-dashboard')}
                className="px-4 py-2 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(200,255,0,0.3)] flex items-center space-x-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>My Door Passes ({userBookings.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-left">
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Raves Attended</p>
              <p className="font-display font-black text-xl text-white mt-0.5">
                {user.fanProfile?.attendedEventsCount ?? userBookings.length}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Active Door Passes</p>
              <p className="font-display font-black text-xl text-[#c8ff00] mt-0.5">
                {userBookings.filter((b) => b.status === 'confirmed').length}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Home Sanctuary</p>
              <p className="font-display font-bold text-sm text-white mt-1 truncate">
                {user?.fanProfile?.homeClub || 'Jasna 1 (Warsaw)'}
              </p>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/5">
              <p className="text-[11px] font-mono text-neutral-400">Preferred BPM</p>
              <p className="font-display font-bold text-sm text-white mt-1">
                {user?.fanProfile?.favoriteBpmRange || '138 - 146 BPM'}
              </p>
            </div>
          </div>
        </div>

        {/* EDIT PROFILE DRAWER / PANEL */}
        {isEditing && (
          <div className="bg-[#151824] border border-[#c8ff00]/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#c8ff00]" />
                <h3 className="font-display font-bold text-base text-white">Customize Fan Profile</h3>
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
                  Raver Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Primary Polish City
                </label>
                <select
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                >
                  {POLISH_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Home Sanctuary Club
                </label>
                <select
                  value={editHomeClub}
                  onChange={(e) => setEditHomeClub(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                >
                  {POLISH_CLUBS.map((club) => (
                    <option key={club} value={club}>{club}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Preferred BPM Range
                </label>
                <input
                  type="text"
                  value={editBpmRange}
                  onChange={(e) => setEditBpmRange(e.target.value)}
                  placeholder="e.g. 138 - 146 BPM"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Rave Manifesto / Bio
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell other ravers what sound moves you and which club floors you haunt..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Favorite Underground Subgenres
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
                            ? 'bg-[#c8ff00] text-black font-bold'
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
                className="px-5 py-2 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save to Firestore</span>
              </button>
            </div>
          </div>
        )}

        {/* Detail Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 & 2: Music Taste & Badges */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Preferred Soundscape */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <Music2 className="w-4 h-4 text-[#c8ff00]" />
                  <h3 className="font-display font-bold text-base text-white">Sonic Fingerprint & Taste</h3>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {user?.favoriteGenres?.length || 2} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(user?.favoriteGenres || ['Hypnotic Techno', 'Acid Techno', 'Modular Live']).map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-[#c8ff00]/30 text-[#c8ff00] text-xs font-mono font-medium flex items-center space-x-1.5"
                  >
                    <Flame className="w-3 h-3 text-[#c8ff00]" />
                    <span>{genre}</span>
                  </span>
                ))}
              </div>

              <p className="text-xs text-neutral-400">
                Your selected genres dynamically personalize the <strong className="text-white">"For You"</strong> event recommendations and Sound Vault recommendations.
              </p>
            </div>

            {/* Clubber Badges & Community Status */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
                <Award className="w-4 h-4 text-[#c8ff00]" />
                <h3 className="font-display font-bold text-base text-white">Rave Badges & Club Protocol</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-start space-x-3">
                  <div className="p-2 bg-[#c8ff00]/10 rounded-lg text-[#c8ff00] flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Safe Space Pledge</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Signed club etiquette & consent code.</p>
                  </div>
                </div>

                <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-start space-x-3">
                  <div className="p-2 bg-[#00f0ff]/10 rounded-lg text-[#00f0ff] flex-shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Night Owl Raver</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Attended 20+ warehouse & club sessions.</p>
                  </div>
                </div>

                <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-start space-x-3">
                  <div className="p-2 bg-[#9945ff]/10 rounded-lg text-[#9945ff] flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Early Bird Supporter</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Regular pre-sale tier patron for underground promoters.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Followed Polish Artists */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="font-display font-bold text-base text-white">Followed DJs & Producers</h3>
                <button 
                  onClick={() => onNavigate('artists')}
                  className="text-xs text-[#c8ff00] hover:underline"
                >
                  Explore Artists
                </button>
              </div>

              {userFollowed.length === 0 ? (
                <p className="text-xs text-neutral-400 py-3">You haven't followed any DJs yet. Explore the Artists directory to track upcoming sets.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {userFollowed.map((artist) => (
                    <div
                      key={artist.id}
                      onClick={() => onNavigate('artist-detail', artist.id)}
                      className="p-3 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl text-center cursor-pointer transition"
                    >
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-12 h-12 rounded-full mx-auto object-cover mb-2 ring-1 ring-white/20"
                      />
                      <p className="text-xs font-bold text-white truncate">{artist.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono truncate">{artist.city}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Quick Door Passes & Saved Events */}
          <div className="space-y-6">
            {/* Quick Passes Preview */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-[#c8ff00]" />
                  <h3 className="font-display font-bold text-base text-white">Digital Door Passes</h3>
                </div>
                <button
                  onClick={() => onNavigate('user-dashboard')}
                  className="text-xs text-[#c8ff00] hover:underline"
                >
                  View all ({userBookings.length})
                </button>
              </div>

              {userBookings.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-400">
                  <p>No active door passes booked yet.</p>
                  <button
                    onClick={() => onNavigate('events')}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-[11px]"
                  >
                    Browse Weekend Lineups
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userBookings.slice(0, 3).map((booking) => (
                    <div 
                      key={booking.id}
                      className="p-3 bg-white/3 border border-white/5 rounded-xl hover:border-white/20 transition"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                        <span className="text-[#c8ff00] font-bold">{booking.orderRef}</span>
                        <span>{booking.eventDate}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1">{booking.eventTitle}</p>
                      <p className="text-[11px] text-neutral-400">{booking.eventVenue} • {booking.cityName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Events */}
            <div className="bg-[#11131c] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#ff1e42]" />
                  <h3 className="font-display font-bold text-base text-white">Saved Raves</h3>
                </div>
                <span className="text-xs text-neutral-400 font-mono">{userFavourites.length}</span>
              </div>

              {userFavourites.length === 0 ? (
                <p className="text-xs text-neutral-400 py-3">No saved raves. Heart any event to save it to your calendar.</p>
              ) : (
                <div className="space-y-2.5">
                  {userFavourites.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onNavigate('event-detail', ev.id)}
                      className="p-2.5 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl cursor-pointer transition flex items-center space-x-3"
                    >
                      <img
                        src={ev.posterUrl}
                        alt={ev.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{ev.title}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{ev.date} • {ev.cityName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
