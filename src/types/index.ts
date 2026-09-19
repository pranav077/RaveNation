export type Role = 'guest' | 'user' | 'artist' | 'editor' | 'admin';

export interface FanProfileData {
  bio?: string;
  homeClub?: string;
  favClubs?: string[];
  favoriteBpmRange?: string;
  attendedEventsCount?: number;
  followedArtists?: string[];
  savedEvents?: string[];
  experienceLevel?: 'New Raver' | 'Regular Clubber' | 'Underground Veteran' | 'Acid Nomad';
}

export interface ArtistProfileData {
  stageName: string;
  realName?: string;
  bio?: string;
  genres: string[];
  city: string;
  residentClub?: string;
  recordLabels?: string[];
  performanceType?: 'DJ Set' | 'Hybrid Live' | 'Modular Live' | 'Hardware Live';
  equipmentSpecs?: string;
  bookingContact?: string;
  soundcloudUrl?: string;
  spotifyUrl?: string;
  instagramHandle?: string;
  bandcampUrl?: string;
  isVerified?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  cityPreference?: string;
  favoriteGenres: string[];
  createdAt: string;
  artistProfileId?: string;
  fanProfile?: FanProfileData;
  artistProfile?: ArtistProfileData;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  available: number;
  total?: number;
  status: 'available' | 'selling_fast' | 'sold_out';
}

export interface LineupArtist {
  artistId?: string;
  name: string;
  setTime?: string;
  isHeadliner?: boolean;
  avatar?: string;
  role?: string;
  stage?: string;
}

export interface RaveEvent {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  venueId: string;
  venueName: string;
  cityId: string;
  cityName: string;
  address: string;
  description: string;
  genres: string[];
  lineup: LineupArtist[];
  posterUrl: string;
  coverUrl?: string;
  galleryImages?: string[];
  ticketTiers: TicketTier[];
  minPrice: number;
  status: 'available' | 'selling_fast' | 'sold_out' | 'cancelled' | 'pending' | 'approved';
  organizerId: string;
  organizerName: string;
  ageRestriction: string;
  dressCode?: string;
  awarenessPolicy?: string;
  links?: {
    facebook?: string;
    residentAdvisor?: string;
    website?: string;
  };
  isFeatured?: boolean;
  isThisWeekend?: boolean;
  attendeesCount: number;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: string;
  famousClubs: string[];
  activeEventsCount: number;
  topVenuesCount: number;
  coordinates: { lat: number; lng: number };
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  cityName: string;
  address: string;
  description: string;
  image: string;
  capacity: number;
  soundSystem: string;
  cameraPolicy?: string;
  rules: string[];
  links?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface ArtistProfile {
  id: string;
  slug: string;
  name: string;
  realName?: string;
  avatar: string;
  banner: string;
  bio: string;
  genres: string[];
  city: string;
  labels: string[];
  socialLinks: {
    spotify?: string;
    soundcloud?: string;
    instagram?: string;
    residentAdvisor?: string;
    youtube?: string;
    mixcloud?: string;
  };
  followersCount: number;
  isVerified: boolean;
  monthlyListeners?: number;
  upcomingEventsCount: number;
  latestRelease?: string;
}

export interface ArtistUpdate {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  content: string;
  createdAt: string;
  likesCount: number;
  tag?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  genre: string;
  duration: string;
  bpm?: number;
  releaseYear?: number;
  releaseDate?: string;
  artworkUrl: string;
  audioUrl: string;
  embedUrl?: string;
  streamCount?: number;
  format: 'Track' | 'DJ Mix' | 'Live Set' | 'Remix' | 'Digital Master' | '12" Vinyl EP';
  label?: string;
}

export type Track = MusicTrack;

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  category: 'Scene News' | 'Interviews' | 'Festival Guide' | 'Club Culture' | 'Harm Reduction' | 'Music Reviews' | 'Festival Report' | 'Scene Journalism' | 'Club Heritage';
  readingTime: string;
  isExclusive?: boolean;
  tags: string[];
}

export interface Booking {
  id: string;
  orderRef: string;
  userId?: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  cityName: string;
  eventPoster: string;
  attendee: {
    fullName: string;
    email: string;
    phone: string;
  };
  items: Array<{
    tierId: string;
    tierName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  currency: string;
  paymentMethod?: string;
  status: 'confirmed' | 'cancelled' | 'refunded';
  bookedAt: string;
  qrCodeData: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'artist_update' | 'ticket_booked' | 'event_announcement' | 'lineup_update' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}
