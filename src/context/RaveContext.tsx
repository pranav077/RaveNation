import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  RaveEvent, 
  Booking, 
  NotificationItem, 
  NewsArticle, 
  MusicTrack, 
  ArtistProfile,
  ArtistUpdate
} from '../types';
import { 
  EVENTS as INITIAL_EVENTS, 
  SAMPLE_BOOKINGS, 
  INITIAL_NOTIFICATIONS, 
  NEWS_ARTICLES as INITIAL_NEWS, 
  MUSIC_TRACKS, 
  ARTISTS, 
  ARTIST_UPDATES 
} from '../data/mockData';

interface RaveContextType {
  events: RaveEvent[];
  approvedEvents: RaveEvent[];
  pendingEvents: RaveEvent[];
  artists: ArtistProfile[];
  tracks: MusicTrack[];
  news: NewsArticle[];
  bookings: Booking[];
  notifications: NotificationItem[];
  artistUpdates: ArtistUpdate[];
  favourites: string[];
  followedArtists: string[];
  newsletterSubscribers: string[];
  
  // Actions
  toggleFavourite: (eventId: string) => void;
  isFavourite: (eventId: string) => boolean;
  toggleFollowArtist: (artistId: string) => void;
  isFollowingArtist: (artistId: string) => boolean;
  
  createBooking: (
    eventId: string, 
    attendee: { fullName: string; email: string; phone: string }, 
    items: Array<{ tierId: string; tierName: string; quantity: number; price: number }>
  ) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
  
  addEvent: (eventData: any) => RaveEvent;
  updateEventStatus: (eventId: string, status: any) => void;
  toggleFeatureEvent: (eventId: string) => void;
  approveEvent: (eventId: string) => void;
  rejectEvent: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  addTrack: (track: MusicTrack) => void;
  
  addArtistUpdate: (artistId: string, content: string, tag?: string) => void;
  addNewsArticle: (article: Omit<NewsArticle, 'id' | 'publishedAt'>) => void;
  subscribeNewsletter: (email: string) => boolean;
  
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Audio Player State
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  playTrack: (track: MusicTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  
  // Global Modals & Toasts
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Filter presets
  selectedCityFilter: string | null;
  setSelectedCityFilter: (city: string | null) => void;
  selectedGenreFilter: string | null;
  setSelectedGenreFilter: (genre: string | null) => void;
}

const RaveContext = createContext<RaveContextType | undefined>(undefined);

export const RaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Events
  const [events, setEvents] = useState<RaveEvent[]>(() => {
    try {
      const saved = localStorage.getItem('rn_events');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_EVENTS;
  });

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('rn_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_BOOKINGS;
  });

  // Favourites
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rn_favourites');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['ev-jasna-24h', 'ev-smolna-vtss'];
  });

  // Followed artists
  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rn_followed_artists');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['vtss', 'sept'];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('rn_notifications');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Artists
  const [artists, setArtists] = useState<ArtistProfile[]>(ARTISTS);
  const [artistUpdates, setArtistUpdates] = useState<ArtistUpdate[]>(ARTIST_UPDATES);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [tracks, setTracks] = useState<MusicTrack[]>(() => {
    try {
      const saved = localStorage.getItem('rn_tracks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((t: MusicTrack, idx: number) => {
            if (!t.audioUrl || t.audioUrl.includes('freesound.org')) {
              return { ...t, audioUrl: `/audio/track-${(idx % 6) + 1}.mp3` };
            }
            return t;
          });
        }
      }
    } catch {}
    return MUSIC_TRACKS;
  });

  // Audio Player
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(() => {
    try {
      const saved = localStorage.getItem('rn_current_track');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) {
          if (!parsed.audioUrl || parsed.audioUrl.includes('freesound.org')) {
            parsed.audioUrl = '/audio/track-1.mp3';
          }
          return parsed;
        }
      }
    } catch {}
    return MUSIC_TRACKS[0];
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Search modal & Toast
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick filters
  const [selectedCityFilter, setSelectedCityFilter] = useState<string | null>(null);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string | null>(null);

  // Newsletter
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>(['raver@underground.pl']);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rn_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('rn_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('rn_favourites', JSON.stringify(favourites));
    } catch {}
  }, [favourites]);

  useEffect(() => {
    try {
      localStorage.setItem('rn_followed_artists', JSON.stringify(followedArtists));
    } catch {}
  }, [followedArtists]);

  useEffect(() => {
    try {
      localStorage.setItem('rn_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  const toggleFavourite = (eventId: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Removed event from your saved list');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Saved to your favourites list');
        return [...prev, eventId];
      }
    });
  };

  const isFavourite = (eventId: string) => favourites.includes(eventId);

  const toggleFollowArtist = (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    setFollowedArtists((prev) => {
      const exists = prev.includes(artistId);
      if (exists) {
        showToast(`Unfollowed ${artist ? artist.name : 'artist'}`);
        // update follower count
        setArtists((list) =>
          list.map((a) => (a.id === artistId ? { ...a, followersCount: Math.max(0, a.followersCount - 1) } : a))
        );
        return prev.filter((id) => id !== artistId);
      } else {
        showToast(`Now following ${artist ? artist.name : 'artist'}! You will receive set announcements.`);
        setArtists((list) =>
          list.map((a) => (a.id === artistId ? { ...a, followersCount: a.followersCount + 1 } : a))
        );
        return [...prev, artistId];
      }
    });
  };

  const isFollowingArtist = (artistId: string) => followedArtists.includes(artistId);

  const createBooking = async (
    eventId: string,
    attendee: { fullName: string; email: string; phone: string },
    items: Array<{ tierId: string; tierName: string; quantity: number; price: number }>
  ): Promise<Booking> => {
    const event = events.find((e) => e.id === eventId);
    if (!event) throw new Error('Event not found');

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cityCode = (event.cityName || 'PL').slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderRef = `RN-${cityCode}-${randomSuffix}`;
    const qrData = `RAVENATION:${orderRef}:${event.id}:QTY${items.reduce((s, i) => s + i.quantity, 0)}:AUTH_VALID`;

    // Deduct inventory safely
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const updatedTiers = ev.ticketTiers.map((tier) => {
          const bookedItem = items.find((i) => i.tierId === tier.id);
          if (!bookedItem) return tier;
          const remaining = Math.max(0, tier.available - bookedItem.quantity);
          return {
            ...tier,
            available: remaining,
            status: (remaining === 0 ? 'sold_out' : remaining <= 10 ? 'selling_fast' : 'available') as 'sold_out' | 'selling_fast' | 'available'
          };
        });
        return {
          ...ev,
          ticketTiers: updatedTiers,
          attendeesCount: ev.attendeesCount + items.reduce((s, i) => s + i.quantity, 0)
        };
      })
    );

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      orderRef,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: `${event.startTime} - ${event.endTime}`,
      eventVenue: event.venueName,
      cityName: event.cityName,
      eventPoster: event.posterUrl,
      attendee,
      items,
      totalAmount,
      currency: 'PLN',
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      qrCodeData: qrData
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'current-user',
      title: `Booking Confirmed: ${event.title}`,
      message: `Your ticket order ${orderRef} is confirmed. Digital QR pass is ready in My Tickets.`,
      type: 'ticket_booked',
      read: false,
      createdAt: new Date().toISOString(),
      link: 'user:tickets'
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Order ${orderRef} confirmed! Digital pass issued.`);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    showToast('Booking cancelled. Refund request logged.');
  };

  const addEvent = (eventData: Omit<RaveEvent, 'id' | 'createdAt' | 'approvalStatus' | 'attendeesCount'>) => {
    const newId = `ev-custom-${Date.now()}`;
    const newEvent: RaveEvent = {
      ...eventData,
      id: newId,
      attendeesCount: 0,
      approvalStatus: 'approved', // auto approved if added from admin or submitted
      createdAt: new Date().toISOString()
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`);
    return newEvent;
  };

  const updateEventStatus = (eventId: string, status: any) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status, approvalStatus: status === 'approved' ? 'approved' : 'rejected' } : e))
    );
  };

  const toggleFeatureEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isFeatured: !e.isFeatured } : e))
    );
    showToast('Featured status updated!');
  };

  const addTrack = (track: MusicTrack) => {
    setTracks((prev) => [track, ...prev]);
  };

  const approveEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, approvalStatus: 'approved', status: 'approved' } : e))
    );
    showToast('Event approved and now visible on public calendar!');
  };

  const rejectEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, approvalStatus: 'rejected', status: 'cancelled' } : e))
    );
    showToast('Event rejected.');
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    showToast('Event removed from platform.');
  };

  const addArtistUpdate = (artistId: string, content: string, tag?: string) => {
    const artist = artists.find((a) => a.id === artistId);
    const newUpdate: ArtistUpdate = {
      id: `upd-${Date.now()}`,
      artistId,
      artistName: artist ? artist.name : 'Artist',
      artistAvatar: artist ? artist.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content,
      createdAt: new Date().toISOString(),
      likesCount: 1,
      tag: tag || 'Scene Update'
    };
    setArtistUpdates((prev) => [newUpdate, ...prev]);
    showToast('Update broadcasted to your followers!');
  };

  const addNewsArticle = (articleData: Omit<NewsArticle, 'id' | 'publishedAt'>) => {
    const newArticle: NewsArticle = {
      ...articleData,
      id: `art-${Date.now()}`,
      publishedAt: new Date().toISOString().slice(0, 10)
    };
    setNews((prev) => [newArticle, ...prev]);
    showToast(`Article "${articleData.title}" published!`);
  };

  const subscribeNewsletter = (email: string) => {
    if (!email || !email.includes('@')) return false;
    setNewsletterSubscribers((prev) => [...prev, email]);
    showToast('Subscribed to Rave Pulse Poland newsletter!');
    return true;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Audio player methods
  const playTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    showToast(`Now Playing: ${track.artistName} - ${track.title}`);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const approvedEvents = events.filter((e) => e.approvalStatus === 'approved');
  const pendingEvents = events.filter((e) => e.approvalStatus === 'pending');

  return (
    <RaveContext.Provider
      value={{
        events,
        approvedEvents,
        pendingEvents,
        artists,
        tracks,
        news,
        bookings,
        notifications,
        artistUpdates,
        favourites,
        followedArtists,
        newsletterSubscribers,
        toggleFavourite,
        isFavourite,
        toggleFollowArtist,
        isFollowingArtist,
        createBooking,
        cancelBooking,
        addEvent,
        updateEventStatus,
        toggleFeatureEvent,
        approveEvent,
        rejectEvent,
        deleteEvent,
        addTrack,
        addArtistUpdate,
        addNewsArticle,
        subscribeNewsletter,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlay,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        toastMessage,
        showToast,
        selectedCityFilter,
        setSelectedCityFilter,
        selectedGenreFilter,
        setSelectedGenreFilter
      }}
    >
      {children}
    </RaveContext.Provider>
  );
};

export const useRave = () => {
  const context = useContext(RaveContext);
  if (!context) throw new Error('useRave must be used within a RaveProvider');
  return context;
};
