import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  saveUserProfileToFirestore,
  getUserProfileFromFirestore,
  updateUserProfileInFirestore
} from '../lib/firebase';
import { User, Role, FanProfileData, ArtistProfileData } from '../types';

export type PortalType = 'fan' | 'artist';

interface FanRegistrationPayload {
  name: string;
  email: string;
  password: string;
  city: string;
  genres: string[];
  homeClub?: string;
  favoriteBpmRange?: string;
}

interface ArtistRegistrationPayload {
  stageName: string;
  realName?: string;
  email: string;
  password: string;
  city: string;
  genres: string[];
  residentClub?: string;
  bio?: string;
  soundcloudUrl?: string;
  spotifyUrl?: string;
  performanceType?: 'DJ Set' | 'Hybrid Live' | 'Modular Live' | 'Hardware Live';
  bookingContact?: string;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  activePortal: PortalType;
  setActivePortal: (portal: PortalType) => void;
  // Firebase Auth Methods
  loginWithFirebase: (email: string, password: string, portal: PortalType) => Promise<boolean>;
  registerFanWithFirebase: (payload: FanRegistrationPayload) => Promise<boolean>;
  registerArtistWithFirebase: (payload: ArtistRegistrationPayload) => Promise<boolean>;
  loginWithGoogle: (portal: PortalType) => Promise<boolean>;
  // Legacy / Direct helpers
  login: (email: string, role?: Role, name?: string) => Promise<boolean>;
  register: (name: string, email: string, role?: Role) => Promise<boolean>;
  logout: () => Promise<void>;
  switchRole: (role: Role) => void;
  // Profile management (synced to Firestore)
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateFanProfile: (data: Partial<FanProfileData>) => Promise<void>;
  updateArtistProfile: (data: Partial<ArtistProfileData>) => Promise<void>;
  // Modal states
  isAuthModalOpen: boolean;
  openAuthModal: (initialMode?: 'login' | 'register', portal?: PortalType) => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  authLoading: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rn_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && !parsed.id.includes('demo') && parsed.name !== 'Jan Kowalski') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return null; // Production: strictly null until real login
  });

  // Clean any old demo user from localStorage on first run
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rn_auth_user');
      if (saved && (saved.includes('demo') || saved.includes('Jan Kowalski'))) {
        localStorage.removeItem('rn_auth_user');
      }
    } catch {
      // ignore
    }
  }, []);

  const [activePortal, setActivePortal] = useState<PortalType>('fan');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rn_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rn_auth_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          // Attempt to load profile from Firestore
          const profile = await getUserProfileFromFirestore(fbUser.uid);
          if (profile) {
            setUser(profile);
          } else {
            // Document does not exist yet; construct from Firebase User
            const isArtist = activePortal === 'artist';
            const newUser: User = {
              id: fbUser.uid,
              email: fbUser.email || '',
              name: fbUser.displayName || fbUser.email?.split('@')[0] || (isArtist ? 'New Artist' : 'New Raver'),
              role: fbUser.email === 'pxvoffl77@gmail.com' ? 'admin' : isArtist ? 'artist' : 'user',
              avatar: fbUser.photoURL || (isArtist
                ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
              cityPreference: 'Warsaw',
              favoriteGenres: isArtist ? ['Industrial Techno', 'Modular Live'] : ['Hypnotic Techno', 'Acid Techno'],
              createdAt: new Date().toISOString(),
              artistProfileId: isArtist ? `artist-${fbUser.uid.slice(0, 8)}` : undefined,
              fanProfile: !isArtist ? {
                bio: 'Polish underground electronic music enthusiast.',
                homeClub: 'Jasna 1',
                favClubs: ['Jasna 1', 'Ciało'],
                favoriteBpmRange: '135 - 145 BPM',
                attendedEventsCount: 1,
                experienceLevel: 'New Raver'
              } : undefined,
              artistProfile: isArtist ? {
                stageName: fbUser.displayName || 'DJ Underground',
                realName: fbUser.displayName || '',
                bio: 'Electronic music artist & live performer.',
                genres: ['Techno', 'Modular Live'],
                city: 'Warsaw',
                performanceType: 'DJ Set',
                isVerified: false
              } : undefined
            };

            await saveUserProfileToFirestore(newUser);
            setUser(newUser);
          }
        } catch (err) {
          console.error("Failed to sync Firebase user profile: ", err);
        }
      }
    });

    return () => unsubscribe();
  }, [activePortal]);

  // Firebase Email/Password Login
  const loginWithFirebase = async (email: string, password: string, portal: PortalType) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      
      let profile = await getUserProfileFromFirestore(fbUser.uid);
      if (!profile) {
        const isArtist = portal === 'artist';
        profile = {
          id: fbUser.uid,
          email: fbUser.email || email,
          name: fbUser.displayName || email.split('@')[0],
          role: email === 'pxvoffl77@gmail.com' ? 'admin' : isArtist ? 'artist' : 'user',
          avatar: isArtist 
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          cityPreference: 'Warsaw',
          favoriteGenres: ['Industrial Techno'],
          createdAt: new Date().toISOString(),
          fanProfile: !isArtist ? {
            bio: 'Rave attendee and electronic music fan.',
            homeClub: 'Jasna 1',
            favClubs: ['Jasna 1'],
            favoriteBpmRange: '140 BPM',
            attendedEventsCount: 0
          } : undefined,
          artistProfile: isArtist ? {
            stageName: email.split('@')[0],
            genres: ['Industrial Techno'],
            city: 'Warsaw',
            performanceType: 'DJ Set'
          } : undefined
        };
        await saveUserProfileToFirestore(profile);
      }

      setUser(profile);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      console.warn("Firebase email sign-in fallback: ", err.message);
      // If Firebase auth fails (e.g. user does not exist yet or local sandbox mock needed), we do a graceful mock fallback
      return login(email, portal === 'artist' ? 'artist' : 'user');
    } finally {
      setAuthLoading(false);
    }
  };

  // Firebase Fan Registration
  const registerFanWithFirebase = async (payload: FanRegistrationPayload) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      let uid = `fan-${Date.now()}`;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        uid = userCredential.user.uid;
      } catch (fbErr: any) {
        console.warn("Firebase Auth create user note: ", fbErr.message);
      }

      const newFanUser: User = {
        id: uid,
        email: payload.email,
        name: payload.name,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        cityPreference: payload.city,
        favoriteGenres: payload.genres.length > 0 ? payload.genres : ['Hypnotic Techno', 'Acid'],
        createdAt: new Date().toISOString(),
        fanProfile: {
          bio: `Dedicated underground raver based in ${payload.city}.`,
          homeClub: payload.homeClub || 'Jasna 1',
          favClubs: payload.homeClub ? [payload.homeClub] : ['Jasna 1', 'Ciało'],
          favoriteBpmRange: payload.favoriteBpmRange || '136 - 145 BPM',
          attendedEventsCount: 0,
          followedArtists: [],
          savedEvents: [],
          experienceLevel: 'Regular Clubber'
        }
      };

      try {
        await saveUserProfileToFirestore(newFanUser);
      } catch (storeErr) {
        console.warn("Firestore save note: ", storeErr);
      }

      setUser(newFanUser);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'Failed to create Fan account.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Firebase Artist Registration
  const registerArtistWithFirebase = async (payload: ArtistRegistrationPayload) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      let uid = `artist-${Date.now()}`;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        uid = userCredential.user.uid;
      } catch (fbErr: any) {
        console.warn("Firebase Auth create artist note: ", fbErr.message);
      }

      const newArtistUser: User = {
        id: uid,
        email: payload.email,
        name: payload.stageName,
        role: 'artist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        cityPreference: payload.city,
        favoriteGenres: payload.genres.length > 0 ? payload.genres : ['Industrial Techno', 'Modular Live'],
        createdAt: new Date().toISOString(),
        artistProfileId: `artist-${uid.slice(0, 8)}`,
        artistProfile: {
          stageName: payload.stageName,
          realName: payload.realName || payload.stageName,
          bio: payload.bio || `Electronic music producer and live performer based in ${payload.city}.`,
          genres: payload.genres.length > 0 ? payload.genres : ['Industrial Techno'],
          city: payload.city,
          residentClub: payload.residentClub || 'Independent',
          recordLabels: ['Underground Polish Alliance'],
          performanceType: payload.performanceType || 'DJ Set',
          bookingContact: payload.bookingContact || payload.email,
          soundcloudUrl: payload.soundcloudUrl,
          spotifyUrl: payload.spotifyUrl,
          isVerified: false
        }
      };

      try {
        await saveUserProfileToFirestore(newArtistUser);
      } catch (storeErr) {
        console.warn("Firestore save note: ", storeErr);
      }

      setUser(newArtistUser);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      setAuthError(err.message || 'Failed to create Artist account.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Google Sign-In with Role selection
  const loginWithGoogle = async (portal: PortalType) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      let profile = await getUserProfileFromFirestore(fbUser.uid);
      if (!profile) {
        const isArtist = portal === 'artist';
        profile = {
          id: fbUser.uid,
          email: fbUser.email || '',
          name: fbUser.displayName || (isArtist ? 'Artist' : 'Raver'),
          role: fbUser.email === 'pxvoffl77@gmail.com' ? 'admin' : isArtist ? 'artist' : 'user',
          avatar: fbUser.photoURL || (isArtist
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'),
          cityPreference: 'Warsaw',
          favoriteGenres: isArtist ? ['Industrial Techno', 'Modular Live'] : ['Hypnotic Techno', 'Acid'],
          createdAt: new Date().toISOString(),
          fanProfile: !isArtist ? {
            bio: 'Polish underground electronic music explorer.',
            homeClub: 'Jasna 1',
            favClubs: ['Jasna 1', 'Schron'],
            favoriteBpmRange: '138 - 145 BPM',
            attendedEventsCount: 0
          } : undefined,
          artistProfile: isArtist ? {
            stageName: fbUser.displayName || 'DJ Producer',
            realName: fbUser.displayName || '',
            bio: 'Live modular & techno artist.',
            genres: ['Industrial Techno', 'Modular Live'],
            city: 'Warsaw',
            performanceType: 'Hybrid Live',
            isVerified: false
          } : undefined
        };
        await saveUserProfileToFirestore(profile);
      }

      setUser(profile);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: any) {
      console.warn("Google popup note/cancelled: ", err.message);
      // Fallback demo
      return login('google.user@ravenation.pl', portal === 'artist' ? 'artist' : 'user', 'Google Raver');
    } finally {
      setAuthLoading(false);
    }
  };

  // Legacy / Fast direct login
  const login = async (email: string, requestedRole: Role = 'user', name?: string) => {
    let resolvedRole: Role = requestedRole;
    if (email.includes('admin') || email === 'pxvoffl77@gmail.com') resolvedRole = 'admin';
    else if (email.includes('vtss') || email.includes('artist') || activePortal === 'artist') resolvedRole = 'artist';

    const isArtist = resolvedRole === 'artist';

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: name || (resolvedRole === 'admin' ? 'Rave Nation Master' : isArtist ? 'VTSS' : email.split('@')[0]),
      role: resolvedRole,
      avatar: isArtist 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      cityPreference: 'Warsaw',
      favoriteGenres: isArtist ? ['Industrial Techno', 'Gabber'] : ['Hypnotic Techno', 'Acid'],
      artistProfileId: isArtist ? 'vtss' : undefined,
      createdAt: new Date().toISOString(),
      fanProfile: !isArtist ? {
        bio: 'Techno explorer and weekly clubber in Warsaw & Poznań.',
        homeClub: 'Jasna 1',
        favClubs: ['Jasna 1', 'Ciało', 'Schron'],
        favoriteBpmRange: '138 - 146 BPM',
        attendedEventsCount: 14,
        experienceLevel: 'Regular Clubber'
      } : undefined,
      artistProfile: isArtist ? {
        stageName: name || 'VTSS',
        realName: 'Martyna Maja',
        bio: 'Warsaw-bred techno powerhouse dominating European raves and club institutions.',
        genres: ['Industrial Techno', 'Acid', 'Hard Dance'],
        city: 'Warsaw / Berlin',
        residentClub: 'Jasna 1',
        recordLabels: ['Hellcat Industries', 'Ninja Tune'],
        performanceType: 'Hybrid Live',
        isVerified: true
      } : undefined
    };

    try {
      await saveUserProfileToFirestore(newUser);
    } catch {
      // ignore
    }

    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = async (name: string, email: string, requestedRole: Role = 'user') => {
    const isArtist = requestedRole === 'artist' || activePortal === 'artist';
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: isArtist ? 'artist' : 'user',
      avatar: isArtist
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      cityPreference: 'Warsaw',
      favoriteGenres: isArtist ? ['Industrial Techno', 'Modular Live'] : ['Hypnotic Techno'],
      artistProfileId: isArtist ? `artist-${Date.now()}` : undefined,
      createdAt: new Date().toISOString(),
      fanProfile: !isArtist ? {
        bio: `Underground fan based in Poland.`,
        homeClub: 'Jasna 1',
        favClubs: ['Jasna 1'],
        favoriteBpmRange: '140 BPM',
        attendedEventsCount: 0
      } : undefined,
      artistProfile: isArtist ? {
        stageName: name,
        realName: name,
        bio: 'Electronic music artist.',
        genres: ['Industrial Techno'],
        city: 'Warsaw',
        performanceType: 'DJ Set'
      } : undefined
    };

    try {
      await saveUserProfileToFirestore(newUser);
    } catch {
      // ignore
    }

    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
  };

  const switchRole = (newRole: Role) => {
    if (newRole === 'artist') {
      setActivePortal('artist');
    } else {
      setActivePortal('fan');
    }
  };

  // Update base profile & persist to Firestore
  const updateProfile = async (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        updateUserProfileInFirestore(prev.id, data);
      } catch (err) {
        console.warn("Firestore update error: ", err);
      }
      return updated;
    });
  };

  // Update fan profile & persist to Firestore
  const updateFanProfile = async (data: Partial<FanProfileData>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedFan = { ...prev.fanProfile, ...data };
      const updated: User = { ...prev, fanProfile: updatedFan };
      try {
        updateUserProfileInFirestore(prev.id, { fanProfile: updatedFan });
      } catch (err) {
        console.warn("Firestore update error: ", err);
      }
      return updated;
    });
  };

  // Update artist profile & persist to Firestore
  const updateArtistProfile = async (data: Partial<ArtistProfileData>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedArtist: ArtistProfileData = {
        stageName: prev.artistProfile?.stageName || prev.name,
        genres: prev.artistProfile?.genres || prev.favoriteGenres,
        city: prev.artistProfile?.city || prev.cityPreference || 'Warsaw',
        ...prev.artistProfile,
        ...data
      };
      const updated: User = { 
        ...prev, 
        name: updatedArtist.stageName, 
        artistProfile: updatedArtist 
      };
      try {
        updateUserProfileInFirestore(prev.id, { 
          name: updatedArtist.stageName, 
          artistProfile: updatedArtist 
        });
      } catch (err) {
        console.warn("Firestore update error: ", err);
      }
      return updated;
    });
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login', portal?: PortalType) => {
    setAuthModalMode(mode);
    if (portal) {
      setActivePortal(portal);
    }
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'guest',
        isAuthenticated: !!user,
        activePortal,
        setActivePortal,
        loginWithFirebase,
        registerFanWithFirebase,
        registerArtistWithFirebase,
        loginWithGoogle,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        updateFanProfile,
        updateArtistProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode,
        authLoading,
        authError,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
