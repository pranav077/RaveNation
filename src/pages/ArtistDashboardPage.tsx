import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Ticket, 
  Music, 
  Users, 
  Settings, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Edit3, 
  Upload, 
  Disc,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRave } from '../context/RaveContext';
import { CITIES, VENUES } from '../data/mockData';
import { RaveEvent, TicketTier, ArtistProfile } from '../types';
import { Lock, ArrowRight, Radio } from 'lucide-react';

interface ArtistDashboardPageProps {
  onNavigate: (view: string, id?: string) => void;
}

export const ArtistDashboardPage: React.FC<ArtistDashboardPageProps> = ({ onNavigate }) => {
  const { user, openAuthModal } = useAuth();
  const { events, addEvent, tracks, addTrack, artists, showToast } = useRave();

  const [activeTab, setActiveTab] = useState<'events' | 'releases' | 'profile'>('events');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showNewTrackModal, setShowNewTrackModal] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCity, setNewEventCity] = useState('Warsaw');
  const [newEventVenue, setNewEventVenue] = useState('Jasna 1');
  const [newEventDate, setNewEventDate] = useState('2026-10-03');
  const [newEventStartTime, setNewEventStartTime] = useState('23:00');
  const [newEventEndTime, setNewEventEndTime] = useState('08:00');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventGenres, setNewEventGenres] = useState('Industrial Techno, Acid');
  const [newEventAge, setNewEventAge] = useState('18+');
  const [newEventMinPrice, setNewEventMinPrice] = useState(60);

  // New Track Form State
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackGenre, setNewTrackGenre] = useState('Industrial Techno');
  const [newTrackBpm, setNewTrackBpm] = useState(142);
  const [newTrackDuration, setNewTrackDuration] = useState('06:45');
  const [newTrackLabel, setNewTrackLabel] = useState('Rave Nation Records');

  // Auth Guard
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-[#11131c] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-black text-2xl text-white mb-2">
            Artist Login Required
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Please log in with your verified artist credentials to publish upcoming club raves, issue digital tickets, and release tracks to the Polish underground vault.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login', 'artist')}
              className="w-full py-3 px-4 rounded-xl bg-[#00f0ff] hover:bg-[#00d4e3] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Log In as Artist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal('register', 'artist')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition"
            >
              Register Artist Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Find artist profile matching user
  const currentArtistName = user.artistProfile?.stageName || user.name;
  const currentArtistAvatar = user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
  const currentArtistCity = user.artistProfile?.city || user.cityPreference || 'Warsaw';
  const currentArtist: ArtistProfile = artists.find((a) => a.id === user.artistProfileId) || {
    id: user.artistProfileId || `artist-${user.id}`,
    slug: (user.artistProfile?.stageName || user.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: currentArtistName,
    realName: user.artistProfile?.realName || user.name,
    avatar: currentArtistAvatar,
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    bio: user.artistProfile?.bio || 'Polish underground electronic music producer and live performer.',
    genres: user.artistProfile?.genres || user.favoriteGenres || ['Industrial Techno', 'Modular Live'],
    city: currentArtistCity,
    labels: ['Independent'],
    socialLinks: {
      soundcloud: user.artistProfile?.soundcloudUrl,
      spotify: user.artistProfile?.spotifyUrl
    },
    followersCount: 1420,
    isVerified: true,
    upcomingEventsCount: 2
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const city = CITIES.find((c) => c.name === newEventCity) || CITIES[0];
    const venue = VENUES.find((v) => v.name === newEventVenue) || VENUES[0];

    const tiers: TicketTier[] = [
      {
        id: `tier-${Date.now()}-1`,
        name: 'Early Raver Pass',
        price: newEventMinPrice,
        available: 50,
        description: 'First batch online discount pass',
        status: 'available'
      },
      {
        id: `tier-${Date.now()}-2`,
        name: 'Standard General Entry',
        price: newEventMinPrice + 20,
        available: 150,
        description: 'General admission pass',
        status: 'available'
      }
    ];

    const createdEvent: RaveEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      slug: newEventTitle.toLowerCase().replace(/\s+/g, '-'),
      description: newEventDescription || 'Underground gathering curated by verified artist.',
      cityId: city.id,
      cityName: city.name,
      venueId: venue.id,
      venueName: venue.name,
      address: venue.address,
      date: newEventDate,
      startTime: newEventStartTime,
      endTime: newEventEndTime,
      posterUrl: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=800&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
      genres: newEventGenres.split(',').map((s) => s.trim()),
      minPrice: newEventMinPrice,
      ticketTiers: tiers,
      lineup: [
        {
          name: currentArtist.name,
          role: 'Headline Live / DJ',
          stage: 'Main Vault',
          setTime: '01:30 - 04:00',
          isHeadliner: true,
          artistId: currentArtist.id,
          avatar: currentArtist.avatar
        }
      ],
      organizerId: user?.id || 'artist-user',
      organizerName: currentArtist.name,
      status: 'pending', // Awaiting admin approval
      isFeatured: false,
      isThisWeekend: false,
      attendeesCount: 0,
      ageRestriction: newEventAge,
      createdAt: new Date().toISOString()
    };

    addEvent(createdEvent);
    setShowNewEventModal(false);
    showToast('Event submitted for underground curation review!');
  };

  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackTitle) return;

    addTrack({
      id: `track-${Date.now()}`,
      title: newTrackTitle,
      artistId: currentArtist.id,
      artistName: currentArtist.name,
      duration: newTrackDuration,
      audioUrl: `/audio/track-${Math.floor(Math.random() * 6) + 1}.mp3`,
      artworkUrl: currentArtist.avatar,
      genre: newTrackGenre,
      bpm: newTrackBpm,
      releaseYear: 2026,
      label: newTrackLabel,
      format: 'Digital Master'
    });

    setShowNewTrackModal(false);
    showToast('New track added to your artist sound vault!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-[#0f1118] border border-white/10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentArtist.avatar}
            alt={currentArtist.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#00f0ff]"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-black text-2xl text-white">
                {currentArtist.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#00f0ff]/20 text-[#00f0ff] font-bold">
                Artist & Organizer Hub
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Verified Polish Resident • {currentArtist.city}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowNewEventModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-[0_0_15px_rgba(200,255,0,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Rave Event</span>
          </button>
          <button
            onClick={() => setShowNewTrackModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Track</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Total Followers</span>
            <Users className="w-4 h-4 text-[#00f0ff]" />
          </div>
          <p className="text-2xl font-bold font-display text-white">{currentArtist.followersCount.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-mono">+18% this month</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Ticket Sales</span>
            <Ticket className="w-4 h-4 text-[#c8ff00]" />
          </div>
          <p className="text-2xl font-bold font-display text-white">412 Pass</p>
          <span className="text-[10px] text-emerald-400 font-mono">18,540 PLN Gross</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Sound Vault Plays</span>
            <Music className="w-4 h-4 text-[#9945ff]" />
          </div>
          <p className="text-2xl font-bold font-display text-white">8,430</p>
          <span className="text-[10px] text-neutral-400 font-mono">Streamed in App</span>
        </div>

        <div className="p-5 bg-[#0f1118] border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
            <span>Curation Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-display text-emerald-400">Verified</p>
          <span className="text-[10px] text-neutral-400 font-mono">Polish Electronic Tier 1</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'events'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          My Events & Submissions
        </button>
        <button
          onClick={() => setActiveTab('releases')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'releases'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Track Releases & Mixes
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 border-b-2 transition ${
            activeTab === 'profile'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Artist Bio & Tech Rider
        </button>
      </div>

      {/* TAB 1: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">
              Event Management & Door Listings
            </h3>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-display font-bold text-white text-base">
                        {event.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          event.approvalStatus === 'approved' || (event.status as string) === 'available'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {event.approvalStatus || event.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {event.date} • {event.venueName}, {event.cityName} • {event.attendeesCount} attendees
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto text-xs font-mono">
                  <button
                    onClick={() => onNavigate('event-detail', event.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                  >
                    View Live Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RELEASES */}
      {activeTab === 'releases' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-white">
            Audio Catalog in Sound Vault
          </h3>
          <div className="space-y-3">
            {tracks.filter((t) => t.artistId === currentArtist.id).map((track) => (
              <div
                key={track.id}
                className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={track.artworkUrl}
                    alt={track.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">{track.title}</h4>
                    <p className="text-xs text-neutral-400 font-mono">{track.genre} • {track.bpm} BPM • {track.format}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="font-display font-bold text-lg text-white">
            Public Artist Profile & Residencies
          </h3>
          <div className="space-y-3 text-xs text-neutral-300">
            <div>
              <label className="block text-neutral-400 mb-1 font-mono">Stage Name</label>
              <input
                type="text"
                disabled
                value={currentArtist.name}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1 font-mono">Bio & Sound Manifesto</label>
              <textarea
                rows={4}
                defaultValue={currentArtist.bio}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#c8ff00]"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1 font-mono">Home City</label>
              <input
                type="text"
                defaultValue={currentArtist.city}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#c8ff00]"
              />
            </div>
            <button
              onClick={() => showToast('Artist profile updated successfully!')}
              className="px-5 py-2.5 rounded-xl bg-[#c8ff00] text-black font-display font-bold text-xs uppercase"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT NEW EVENT */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#11131c] border border-white/20 rounded-3xl p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Submit Polish Rave for Curation
              </h3>
              <button
                onClick={() => setShowNewEventModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Event Title / Concept Name
                </label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. OBSCURE VAULT 004: MARATHON"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">City</label>
                  <select
                    value={newEventCity}
                    onChange={(e) => setNewEventCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.name} className="bg-[#11131c]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Venue / Club</label>
                  <select
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    {VENUES.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#11131c]">
                        {v.name} ({v.cityName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Doors Open</label>
                  <input
                    type="text"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">End Time</label>
                  <input
                    type="text"
                    value={newEventEndTime}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Genres (comma separated)
                </label>
                <input
                  type="text"
                  value={newEventGenres}
                  onChange={(e) => setNewEventGenres(e.target.value)}
                  placeholder="Industrial Techno, Hypnotic, Acid"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Early Bird Ticket Price (PLN)
                </label>
                <input
                  type="number"
                  min="20"
                  max="500"
                  value={newEventMinPrice}
                  onChange={(e) => setNewEventMinPrice(parseInt(e.target.value) || 50)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Description & Safe Space Rules
                </label>
                <textarea
                  rows={3}
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  placeholder="Outline the sonic vision, door selection, and safe space policy..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c8ff00] text-black font-display font-bold uppercase tracking-wider"
                >
                  Submit Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD TRACK */}
      {showNewTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#11131c] border border-white/20 rounded-3xl p-6 text-left space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Upload to Sound Vault
              </h3>
              <button
                onClick={() => setShowNewTrackModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTrack} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Track Title</label>
                <input
                  type="text"
                  required
                  value={newTrackTitle}
                  onChange={(e) => setNewTrackTitle(e.target.value)}
                  placeholder="e.g. Warsaw Concrete [Live Cut]"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Genre</label>
                  <input
                    type="text"
                    value={newTrackGenre}
                    onChange={(e) => setNewTrackGenre(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">BPM</label>
                  <input
                    type="number"
                    value={newTrackBpm}
                    onChange={(e) => setNewTrackBpm(parseInt(e.target.value) || 140)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Record Label</label>
                <input
                  type="text"
                  value={newTrackLabel}
                  onChange={(e) => setNewTrackLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTrackModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c8ff00] text-black font-display font-bold uppercase tracking-wider"
                >
                  Upload Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
