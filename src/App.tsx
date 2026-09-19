/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { RaveProvider } from './context/RaveContext';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { TicketBookingModal } from './components/TicketBookingModal';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';
import { CitiesPage } from './pages/CitiesPage';
import { VenuesPage } from './pages/VenuesPage';
import { MusicPage } from './pages/MusicPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { ArtistDashboardPage } from './pages/ArtistDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { FanProfilePage } from './pages/FanProfilePage';
import { ArtistProfilePage } from './pages/ArtistProfilePage';
import { AboutPage } from './pages/AboutPage';

import { RaveEvent } from './types';

export function MainLayout() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeEventId, setActiveEventId] = useState<string>('ev-1');
  const [activeArtistId, setActiveArtistId] = useState<string>('artist-1');
  const [activeArticleId, setActiveArticleId] = useState<string>('news-1');
  const [bookingEvent, setBookingEvent] = useState<RaveEvent | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeEventId, activeArtistId, activeArticleId]);

  const handleNavigate = (view: string, id?: string) => {
    if (view === 'event-detail' && id) {
      setActiveEventId(id);
    } else if (view === 'artist-detail' && id) {
      setActiveArtistId(id);
    } else if (view === 'news-detail' && id) {
      setActiveArticleId(id);
    }
    setCurrentView(view);
  };

  const handleBookNow = (event: RaveEvent) => {
    setBookingEvent(event);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col font-sans selection:bg-[#c8ff00] selection:text-black">
      {/* Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Page Routing Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {currentView === 'home' && (
              <HomePage onNavigate={handleNavigate} onBookNow={handleBookNow} />
            )}

            {currentView === 'events' && (
              <EventsPage onNavigate={handleNavigate} onBookNow={handleBookNow} />
            )}

            {currentView === 'event-detail' && (
              <EventDetailPage
                eventId={activeEventId}
                onBack={() => setCurrentView('events')}
                onNavigate={handleNavigate}
                onBookNow={handleBookNow}
              />
            )}

            {currentView === 'artists' && (
              <ArtistsPage onNavigate={handleNavigate} />
            )}

            {currentView === 'artist-detail' && (
              <ArtistDetailPage
                artistId={activeArtistId}
                onBack={() => setCurrentView('artists')}
                onNavigate={handleNavigate}
                onBookNow={handleBookNow}
              />
            )}

            {currentView === 'cities' && (
              <CitiesPage onNavigate={handleNavigate} />
            )}

            {currentView === 'venues' && (
              <VenuesPage onNavigate={handleNavigate} />
            )}

            {currentView === 'music' && (
              <MusicPage onNavigate={handleNavigate} />
            )}

            {currentView === 'news' && (
              <NewsPage onNavigate={handleNavigate} />
            )}

            {currentView === 'news-detail' && (
              <NewsDetailPage
                articleId={activeArticleId}
                onBack={() => setCurrentView('news')}
                onNavigate={handleNavigate}
              />
            )}

            {(currentView === 'user-dashboard' || currentView === 'dashboard') && (
              <UserDashboardPage onNavigate={handleNavigate} />
            )}

            {currentView === 'fan-profile' && (
              <FanProfilePage onNavigate={handleNavigate} />
            )}

            {currentView === 'artist-profile' && (
              <ArtistProfilePage onNavigate={handleNavigate} />
            )}

            {currentView === 'artist-dashboard' && (
              <ArtistDashboardPage onNavigate={handleNavigate} />
            )}

            {currentView === 'admin-dashboard' && (
              <AdminDashboardPage onNavigate={handleNavigate} />
            )}

            {currentView === 'about' && (
              <AboutPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />


      {/* Persistent Audio Player */}
      <AudioPlayer />

      {/* Global Modals */}
      <SearchModal onNavigate={handleNavigate} />
      <AuthModal />
      <Toast />

      {/* Real Ticket Booking Checkout Modal */}
      {bookingEvent && (
        <TicketBookingModal
          event={bookingEvent}
          onClose={() => setBookingEvent(null)}
          onViewTickets={() => {
            setBookingEvent(null);
            setCurrentView('user-dashboard');
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RaveProvider>
        <MainLayout />
      </RaveProvider>
    </AuthProvider>
  );
}
