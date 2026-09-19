import React, { useState } from 'react';
import { 
  Ticket, 
  Heart, 
  UserCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Download,
  Trash2,
  Sparkles,
  Headphones,
  Disc
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRave } from '../context/RaveContext';
import { Booking, RaveEvent } from '../types';
import { Lock, ArrowRight } from 'lucide-react';

interface UserDashboardPageProps {
  onNavigate: (view: string, id?: string) => void;
  defaultTab?: 'tickets' | 'favourites' | 'artists';
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  onNavigate,
  defaultTab = 'tickets'
}) => {
  const { user, openAuthModal } = useAuth();
  const { bookings, cancelBooking, events, favourites, artists, followedArtists, toggleFavourite, toggleFollowArtist } = useRave();

  const [activeTab, setActiveTab] = useState<'tickets' | 'favourites' | 'artists'>(defaultTab);
  const [selectedPass, setSelectedPass] = useState<Booking | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // If not logged in, require authentication
  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md w-full bg-[#11131c] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#c8ff00]/10 border border-[#c8ff00]/30 text-[#c8ff00] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(200,255,0,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-black text-2xl text-white mb-2">
            Sign In to View Passes
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Sign in to view your purchased rave tickets, entry QR door passes, event reminders, and followed underground artists.
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
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User's bookings
  const userBookings = bookings.filter((b) => b.userId === user.id || b.attendee.email === user.email);

  // Favourited events
  const favouritedEvents = events.filter((e) => favourites.includes(e.id));

  // Followed artists
  const userFollowedArtists = artists.filter((a) => followedArtists.includes(a.id));

  const handleCancel = async (bookingId: string) => {
    await cancelBooking(bookingId);
    setConfirmCancelId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-[#0f1118] border border-white/10 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#c8ff00]"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#c8ff00] rounded-full border-2 border-[#0f1118]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-black text-2xl text-white">
                {user.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 text-neutral-300">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Dashboard Quick Stats & Profile Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-6 text-center font-mono border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-xl font-bold text-[#c8ff00] block">{userBookings.length}</span>
              <span className="text-[10px] text-neutral-400 uppercase">My Tickets</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#00f0ff] block">{favourites.length}</span>
              <span className="text-[10px] text-neutral-400 uppercase">Saved Raves</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#9945ff] block">{followedArtists.length}</span>
              <span className="text-[10px] text-neutral-400 uppercase">Followed DJs</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('fan-profile')}
              className="px-3 py-1.5 rounded-xl bg-[#c8ff00]/10 hover:bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/30 text-xs font-mono font-bold flex items-center space-x-1.5 transition"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Fan Profile</span>
            </button>
            <button
              onClick={() => onNavigate('artist-profile')}
              className="px-3 py-1.5 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 text-xs font-mono font-bold flex items-center space-x-1.5 transition"
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Artist Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition ${
            activeTab === 'tickets'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Tickets & Passes ({userBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favourites')}
          className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition ${
            activeTab === 'favourites'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Raves ({favouritedEvents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition ${
            activeTab === 'artists'
              ? 'border-[#c8ff00] text-[#c8ff00] font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Followed Artists ({userFollowedArtists.length})</span>
        </button>
      </div>

      {/* TAB 1: TICKETS & DIGITAL PASSES */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {userBookings.length === 0 ? (
            <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <Ticket className="w-8 h-8 text-neutral-500 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">No Tickets Booked Yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Explore Polish warehouse raves and club gatherings to secure your digital entry passes.
              </p>
              <button
                onClick={() => onNavigate('events')}
                className="px-5 py-2.5 rounded-xl bg-[#c8ff00] text-black font-bold text-xs uppercase font-display"
              >
                Browse Upcoming Raves
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userBookings.map((booking) => {
                const event = events.find((e) => e.id === booking.eventId);
                const isCancelled = booking.status === 'cancelled';

                return (
                  <div
                    key={booking.id}
                    className={`bg-[#0f1118] border rounded-2xl p-5 flex flex-col justify-between transition ${
                      isCancelled
                        ? 'border-red-500/30 opacity-60'
                        : 'border-white/15 hover:border-[#c8ff00]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between pb-3 border-b border-white/10">
                        <div>
                          <span className="text-[10px] font-mono text-[#c8ff00] uppercase font-bold">
                            {booking.orderRef}
                          </span>
                          <h4 className="font-display font-bold text-base text-white mt-0.5">
                            {event?.title || 'Polish Underground Rave'}
                          </h4>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            isCancelled
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="py-3 space-y-1.5 text-xs text-neutral-300 font-mono">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-[#c8ff00]" />
                          <span>{event?.date} • Doors: {event?.startTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                          <span>{event?.venueName}, {event?.cityName}</span>
                        </div>
                        <p className="text-neutral-400 pt-1">
                          Items: {booking.items.map((i) => `${i.tierName} x${i.quantity}`).join(', ')}
                        </p>
                        <p className="text-white font-bold">
                          Paid: {booking.totalAmount} PLN (via {booking.paymentMethod ? booking.paymentMethod.toUpperCase() : 'BLIK / CARD'})
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      {!isCancelled && (
                        <button
                          onClick={() => setSelectedPass(booking)}
                          className="px-3 py-1.5 rounded-lg bg-[#c8ff00] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#b8ea00] transition flex items-center space-x-1"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View QR Pass</span>
                        </button>
                      )}

                      {!isCancelled && (
                        <button
                          onClick={() => setConfirmCancelId(booking.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono transition"
                        >
                          Cancel / Refund
                        </button>
                      )}

                      {isCancelled && (
                        <span className="text-xs font-mono text-red-400">
                          Refund Processed: {booking.totalAmount} PLN
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FAVOURITES */}
      {activeTab === 'favourites' && (
        <div className="space-y-4">
          {favouritedEvents.length === 0 ? (
            <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <Heart className="w-8 h-8 text-neutral-500 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">No Saved Raves</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Click the heart icon on any rave event card to bookmark it for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favouritedEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onNavigate('event-detail', event.id)}
                  className="bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(event.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-600 rounded-full text-white"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-[#00f0ff] font-mono">{event.date} • {event.cityName}</p>
                    <h4 className="font-display font-bold text-white text-base group-hover:text-[#c8ff00] transition">
                      {event.title}
                    </h4>
                    <p className="text-xs text-neutral-400">{event.venueName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FOLLOWED ARTISTS */}
      {activeTab === 'artists' && (
        <div className="space-y-4">
          {userFollowedArtists.length === 0 ? (
            <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <UserCheck className="w-8 h-8 text-neutral-500 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white">No Followed Artists</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Follow DJs and live producers to get notified when they drop new tour dates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userFollowedArtists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => onNavigate('artist-detail', artist.id)}
                  className="p-4 bg-[#0f1118] border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#00f0ff]/40 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/20"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">
                        {artist.name}
                      </h4>
                      <p className="text-xs text-neutral-400">{artist.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowArtist(artist.id);
                    }}
                    className="p-2 text-neutral-400 hover:text-red-400 transition"
                    title="Unfollow artist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: QR DIGITAL PASS INSPECTION */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div 
            className="w-full max-w-sm bg-[#0b0c13] border-2 border-[#c8ff00] rounded-3xl p-6 text-center space-y-4 shadow-[0_0_40px_rgba(200,255,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono text-[#c8ff00] uppercase font-bold">
                Official Door Pass
              </span>
              <button
                onClick={() => setSelectedPass(null)}
                className="text-neutral-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-lg text-white">
                {events.find((e) => e.id === selectedPass.eventId)?.title}
              </h3>
              <p className="text-xs text-neutral-400">
                Attendee: <span className="text-white font-bold">{selectedPass.attendee.fullName}</span>
              </p>
            </div>

            {/* QR Code Graphic */}
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-xl">
              <svg viewBox="0 0 100 100" className="w-36 h-36">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="28" height="28" fill="black" />
                <rect x="9" y="9" width="20" height="20" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="black" />
                <rect x="67" y="5" width="28" height="28" fill="black" />
                <rect x="71" y="9" width="20" height="20" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="black" />
                <rect x="5" y="67" width="28" height="28" fill="black" />
                <rect x="9" y="71" width="20" height="20" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="black" />
                <rect x="38" y="10" width="8" height="8" fill="black" />
                <rect x="50" y="10" width="8" height="8" fill="black" />
                <rect x="38" y="24" width="8" height="8" fill="black" />
                <rect x="42" y="38" width="16" height="8" fill="black" />
                <rect x="10" y="42" width="8" height="16" fill="black" />
                <rect x="24" y="48" width="8" height="8" fill="black" />
                <rect x="38" y="50" width="8" height="16" fill="black" />
                <rect x="50" y="66" width="16" height="8" fill="black" />
                <rect x="70" y="42" width="8" height="8" fill="black" />
                <rect x="80" y="50" width="8" height="16" fill="black" />
                <rect x="66" y="80" width="16" height="8" fill="black" />
                <rect x="45" y="80" width="8" height="10" fill="black" />
              </svg>
              <span className="font-mono font-bold text-xs text-black block mt-1">
                {selectedPass.orderRef}
              </span>
            </div>

            <div className="text-[11px] text-neutral-400 space-y-1">
              <p>Show this screen with 18+ ID at the club entrance door.</p>
              <p className="text-[#c8ff00] font-mono font-bold">1 TICKET • GUARANTEED ENTRY</p>
            </div>

            <button
              onClick={() => setSelectedPass(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM CANCELLATION MODAL */}
      {confirmCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#11131c] border border-red-500/40 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <h4 className="font-display font-bold text-lg text-white">Cancel Booking & Request Refund?</h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to cancel this booking? The full ticket amount will be returned to your original payment method within 2-3 business days, and the QR door pass will be deactivated immediately.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="w-1/2 py-2.5 rounded-xl border border-white/15 text-white text-xs font-semibold"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancel(confirmCancelId)}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-display uppercase tracking-wider"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
