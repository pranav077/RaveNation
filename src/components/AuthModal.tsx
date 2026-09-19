import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Radio, 
  Headphones, 
  Disc, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Sliders, 
  Globe, 
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useAuth, PortalType } from '../context/AuthContext';
import { Role } from '../types';

const POLISH_CITIES = ['Warsaw', 'Kraków', 'Poznań', 'Wrocław', 'Gdańsk', 'Katowice', 'Łódź', 'Szczecin'];

const GENRES = [
  'Industrial Techno',
  'Acid Techno',
  'Hypnotic Techno',
  'Hard Dance / Gabber',
  'EBM & Darkwave',
  'Modular Live',
  'Dub & Deep Techno',
  'Psytrance'
];

const POLISH_CLUBS = [
  'Jasna 1 (Warsaw)',
  'Schron (Poznań)',
  'Ciało (Wrocław)',
  'Tama (Poznań)',
  'Crackhouse (Gdańsk)',
  'P23 (Katowice)',
  'Szpitalna 1 (Kraków)',
  'Smolna (Warsaw)'
];

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    activePortal, 
    setActivePortal,
    loginWithFirebase,
    registerFanWithFirebase,
    registerArtistWithFirebase,
    loginWithGoogle,
    switchRole,
    authLoading,
    authError,
    setAuthError
  } = useAuth();

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Fan Specific Fields
  const [fanName, setFanName] = useState('');
  const [fanCity, setFanCity] = useState('Warsaw');
  const [fanSelectedGenres, setFanSelectedGenres] = useState<string[]>(['Hypnotic Techno', 'Acid Techno']);
  const [fanClub, setFanClub] = useState('Jasna 1 (Warsaw)');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Artist Specific Fields
  const [stageName, setStageName] = useState('');
  const [realName, setRealName] = useState('');
  const [artistCity, setArtistCity] = useState('Warsaw');
  const [artistGenres, setArtistGenres] = useState<string[]>(['Industrial Techno', 'Modular Live']);
  const [residentClub, setResidentClub] = useState('');
  const [performanceType, setPerformanceType] = useState<'DJ Set' | 'Hybrid Live' | 'Modular Live' | 'Hardware Live'>('DJ Set');
  const [soundcloudUrl, setSoundcloudUrl] = useState('');
  const [artistBio, setArtistBio] = useState('');

  // Password reset message
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setAuthError(null);
      setResetSent(false);
    }
  }, [isAuthModalOpen, activePortal, authModalMode]);

  if (!isAuthModalOpen) return null;

  const toggleGenre = (genre: string, target: 'fan' | 'artist') => {
    if (target === 'fan') {
      setFanSelectedGenres((prev) => 
        prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
      );
    } else {
      setArtistGenres((prev) => 
        prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    if (authModalMode === 'login') {
      await loginWithFirebase(email, password, activePortal);
    } else {
      if (activePortal === 'fan') {
        if (!fanName.trim()) {
          setAuthError('Please enter your full name or raver handle.');
          return;
        }
        if (!acceptedTerms) {
          setAuthError('Please accept the Rave Safe Space & Polish Club Protocol.');
          return;
        }
        await registerFanWithFirebase({
          name: fanName,
          email,
          password,
          city: fanCity,
          genres: fanSelectedGenres,
          homeClub: fanClub
        });
      } else {
        // Artist registration
        if (!stageName.trim()) {
          setAuthError('Please enter your DJ / Artist Stage Name.');
          return;
        }
        if (artistGenres.length === 0) {
          setAuthError('Please pick at least one primary musical genre.');
          return;
        }
        await registerArtistWithFirebase({
          stageName,
          realName,
          email,
          password,
          city: artistCity,
          genres: artistGenres,
          residentClub,
          performanceType,
          soundcloudUrl,
          bio: artistBio
        });
      }
    }
  };

  const isFan = activePortal === 'fan';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#0f111a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden relative text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Ribbon */}
        <div className={`h-1.5 w-full transition-colors duration-300 ${
          isFan ? 'bg-gradient-to-r from-[#c8ff00] to-emerald-400' : 'bg-gradient-to-r from-[#00f0ff] to-[#9945ff]'
        }`} />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black font-display text-sm transition-all ${
              isFan ? 'bg-[#c8ff00] text-black shadow-[0_0_15px_rgba(200,255,0,0.4)]' : 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
            }`}>
              {isFan ? <Headphones className="w-5 h-5" /> : <Radio className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-extrabold text-lg text-white">
                  {isFan ? 'FAN & RAVER PORTAL' : 'ARTIST & PRODUCER HUB'}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isFan ? 'bg-[#c8ff00]/15 text-[#c8ff00]' : 'bg-[#00f0ff]/15 text-[#00f0ff]'
                }`}>
                  Firebase Auth
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {isFan 
                  ? 'Book tickets, unlock digital door passes & track Polish raves'
                  : 'Manage DJ releases, club bookings, sound specs & lineups'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Switcher Selector (Fan vs Artist) */}
        <div className="p-3 bg-white/2 border-b border-white/10">
          <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => { setActivePortal('fan'); setAuthError(null); }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition ${
                isFan 
                  ? 'bg-[#c8ff00] text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Raver / Fan Portal</span>
            </button>
            <button
              type="button"
              onClick={() => { setActivePortal('artist'); setAuthError(null); }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition ${
                !isFan 
                  ? 'bg-[#00f0ff] text-black shadow-md' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>Artist / DJ Portal</span>
            </button>
          </div>
        </div>

        {/* Mode Selector (Login vs Register) */}
        <div className="flex border-b border-white/10 px-6 pt-3">
          <button
            type="button"
            onClick={() => { setAuthModalMode('login'); setAuthError(null); }}
            className={`pb-3 text-xs font-display font-bold tracking-wider uppercase border-b-2 mr-6 transition ${
              authModalMode === 'login'
                ? isFan ? 'border-[#c8ff00] text-[#c8ff00]' : 'border-[#00f0ff] text-[#00f0ff]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {isFan ? 'Fan Log In' : 'Artist Log In'}
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('register'); setAuthError(null); }}
            className={`pb-3 text-xs font-display font-bold tracking-wider uppercase border-b-2 transition ${
              authModalMode === 'register'
                ? isFan ? 'border-[#c8ff00] text-[#c8ff00]' : 'border-[#00f0ff] text-[#00f0ff]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {isFan ? 'Create Raver Account' : 'Register Artist Profile'}
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[68vh] overflow-y-auto">
          {/* Error Banner */}
          {authError && (
            <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl flex items-center space-x-2 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {resetSent && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Password recovery instructions sent to your email.</span>
            </div>
          )}

          {/* Social Sign-in Button */}
          <button
            type="button"
            onClick={() => loginWithGoogle(activePortal)}
            disabled={authLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
            </svg>
            <span>Continue with Google as {isFan ? 'Raver Fan' : 'Artist'}</span>
          </button>

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-[11px] font-mono text-neutral-500 uppercase">Or with Email</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* FAN REGISTRATION EXTRA FIELDS */}
          {authModalMode === 'register' && isFan && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Name / Raver Handle <span className="text-[#c8ff00]">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    placeholder="e.g. Jan Kowalski or TechnoNomad"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c8ff00]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Primary Rave City
                  </label>
                  <select
                    value={fanCity}
                    onChange={(e) => setFanCity(e.target.value)}
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
                    value={fanClub}
                    onChange={(e) => setFanClub(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#c8ff00]"
                  >
                    {POLISH_CLUBS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Subgenre Preferences
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES.map((g) => {
                    const selected = fanSelectedGenres.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => toggleGenre(g, 'fan')}
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
          )}

          {/* ARTIST REGISTRATION EXTRA FIELDS */}
          {authModalMode === 'register' && !isFan && (
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Stage Name / DJ Alias <span className="text-[#00f0ff]">*</span>
                  </label>
                  <div className="relative">
                    <Disc className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={stageName}
                      onChange={(e) => setStageName(e.target.value)}
                      placeholder="e.g. VTSS, Sept, Naked Relaxing"
                      className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Legal / Real Name (Private)
                  </label>
                  <input
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    placeholder="e.g. Martyna Maja"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Base City
                  </label>
                  <select
                    value={artistCity}
                    onChange={(e) => setArtistCity(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  >
                    {POLISH_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="Berlin / Warsaw">Berlin / Warsaw</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Performance Format
                  </label>
                  <select
                    value={performanceType}
                    onChange={(e) => setPerformanceType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="DJ Set">DJ Set (CDJ / Vinyl)</option>
                    <option value="Hybrid Live">Hybrid Live (DJ + Hardware)</option>
                    <option value="Modular Live">Modular Live Synth</option>
                    <option value="Hardware Live">Hardware Live Set</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Resident Club / Collective Affiliation
                </label>
                <input
                  type="text"
                  value={residentClub}
                  onChange={(e) => setResidentClub(e.target.value)}
                  placeholder="e.g. Jasna 1 Resident / Revive Collective"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Soundcloud / Mixcloud / Portfolio Link
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={soundcloudUrl}
                    onChange={(e) => setSoundcloudUrl(e.target.value)}
                    placeholder="https://soundcloud.com/your-alias"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Musical Style & Genres <span className="text-[#00f0ff]">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES.map((g) => {
                    const selected = artistGenres.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => toggleGenre(g, 'artist')}
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

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Artist Bio / Sound Manifesto
                </label>
                <textarea
                  rows={2}
                  value={artistBio}
                  onChange={(e) => setArtistBio(e.target.value)}
                  placeholder="Describe your sonic philosophy, live hardware setup, and label releases..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>
          )}

          {/* Email field (Common) */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              {isFan ? 'Raver Email' : 'Artist / Booking Email'} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFan ? 'raver@underground.pl' : 'artist@booking.pl'}
                className={`w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none ${
                  isFan ? 'focus:border-[#c8ff00]' : 'focus:border-[#00f0ff]'
                }`}
                required
              />
            </div>
          </div>

          {/* Password field (Common) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-neutral-300">
                Password <span className="text-red-400">*</span>
              </label>
              {authModalMode === 'login' && (
                <button
                  type="button"
                  onClick={() => setResetSent(true)}
                  className={`text-[11px] hover:underline ${isFan ? 'text-[#c8ff00]' : 'text-[#00f0ff]'}`}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none ${
                  isFan ? 'focus:border-[#c8ff00]' : 'focus:border-[#00f0ff]'
                }`}
                required
              />
            </div>
          </div>

          {/* Protocol consent check */}
          {authModalMode === 'register' && (
            <div className="flex items-start space-x-2.5 pt-1">
              <input
                type="checkbox"
                id="terms-check"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className={`mt-1 rounded ${isFan ? 'accent-[#c8ff00]' : 'accent-[#00f0ff]'}`}
              />
              <label htmlFor="terms-check" className="text-[11px] text-neutral-400 leading-relaxed">
                I agree to the Rave Nation Polish Club Protocol: safe dance floors, photo camera tape policy, mutual consent, and zero tolerance for harassment.
              </label>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={authLoading}
            className={`w-full py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 disabled:opacity-50 ${
              isFan
                ? 'bg-[#c8ff00] hover:bg-[#b8ea00] text-black shadow-[0_0_20px_rgba(200,255,0,0.3)]'
                : 'bg-[#00f0ff] hover:bg-[#00d4e3] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]'
            }`}
          >
            {authLoading ? (
              <span>Authenticating with Firebase...</span>
            ) : (
              <>
                <span>
                  {authModalMode === 'login'
                    ? isFan ? 'Sign In as Raver' : 'Sign In to Artist Hub'
                    : isFan ? 'Join Rave Nation Poland' : 'Submit Artist Registration'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch */}
        <div className="px-6 py-4 bg-white/2 border-t border-white/10 text-center text-xs text-neutral-400 flex items-center justify-between">
          <span>
            {authModalMode === 'login' ? "Need a separate account?" : "Already registered?"}
          </span>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode(authModalMode === 'login' ? 'register' : 'login');
              setAuthError(null);
            }}
            className={`font-semibold hover:underline ${isFan ? 'text-[#c8ff00]' : 'text-[#00f0ff]'}`}
          >
            {authModalMode === 'login'
              ? isFan ? 'Sign Up as Fan' : 'Create Artist Profile'
              : 'Sign In Instead'}
          </button>
        </div>
      </div>
    </div>
  );
};
