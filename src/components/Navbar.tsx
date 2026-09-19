import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Bell, 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  Music2, 
  Newspaper, 
  Menu, 
  X, 
  Ticket, 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  Radio,
  Headphones,
  Disc
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRave } from '../context/RaveContext';
import { Role } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, id?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, role, logout, openAuthModal } = useAuth();
  const { notifications, markNotificationAsRead, openSearch, favourites, bookings } = useRave();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'cities', label: 'Cities' },
    { id: 'venues', label: 'Venues' },
    { id: 'artists', label: 'Artists' },
    { id: 'music', label: 'Music' },
    { id: 'news', label: 'News' },
    { id: 'about', label: 'About & Safety' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#08090d]/90 backdrop-blur-md border-b border-white/10">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-[#c8ff00] flex items-center justify-center text-black font-black font-display text-lg tracking-tighter shadow-[0_0_20px_rgba(200,255,0,0.4)] group-hover:scale-105 transition-transform">
                RN
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="font-display font-extrabold text-xl tracking-wider text-white">
                    RAVE<span className="text-[#c8ff00]">NATION</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 tracking-widest">
                    POLAND
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
                  Techno & Underground
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? 'text-[#c8ff00] bg-white/5 font-semibold' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              {user && (
                <button
                  onClick={() => handleNavClick('discover')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                    currentView === 'discover'
                      ? 'text-[#9945ff] bg-white/5 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9945ff]" />
                  <span>For You</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center space-x-3">
            {/* Global Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 text-xs transition"
              title="Search events, artists, cities (Cmd+K)"
            >
              <Search className="w-4 h-4 text-neutral-300" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-black/40 border border-white/10 rounded font-mono text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Organizer Quick Submit */}
            <button
              onClick={() => handleNavClick('submit-event')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium transition"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Submit Event</span>
            </button>

            {/* Notifications Popover */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#c8ff00] rounded-full ring-2 ring-[#08090d]" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#12141c] border border-white/10 rounded-xl shadow-2xl p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className="font-display font-bold text-sm text-white">Notifications</span>
                        <span className="text-[11px] px-2 py-0.5 bg-[#c8ff00]/20 text-[#c8ff00] rounded-full font-mono">
                          {unreadNotifications.length} new
                        </span>
                      </div>
                      <button 
                        onClick={() => handleNavClick('dashboard')}
                        className="text-xs text-neutral-400 hover:text-[#c8ff00] transition"
                      >
                        View all
                      </button>
                    </div>

                    <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-neutral-500 py-4 text-center">No notifications yet</p>
                      ) : (
                        notifications.slice(0, 4).map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.link?.startsWith('event:')) {
                                onNavigate('event-detail', notif.link.split(':')[1]);
                              } else {
                                onNavigate('dashboard');
                              }
                              setNotificationsOpen(false);
                            }}
                            className={`p-2.5 rounded-lg transition cursor-pointer text-left ${
                              notif.read ? 'bg-white/2 opacity-70 hover:bg-white/5' : 'bg-white/10 hover:bg-white/15'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                              <span className="font-semibold text-[#c8ff00]">{notif.title}</span>
                            </div>
                            <p className="text-xs text-neutral-200 line-clamp-2">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Account / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#c8ff00]/50"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-white max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <span className={`hidden md:inline px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                    user.role === 'artist' 
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff]' 
                      : user.role === 'admin'
                      ? 'bg-[#9945ff]/20 text-[#9945ff]'
                      : 'bg-[#c8ff00]/20 text-[#c8ff00]'
                  }`}>
                    {user.role}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#12141c] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-left">
                    <div className="px-4 py-2.5 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded font-bold ${
                          user.role === 'artist' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-[#c8ff00]/20 text-[#c8ff00]'
                        }`}>
                          {user.role === 'artist' ? 'Artist Account' : 'Raver Account'}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">Firebase Synced</span>
                      </div>
                    </div>

                    <div className="py-1">
                      {/* Separate Fan Profile */}
                      <button
                        onClick={() => { onNavigate('fan-profile'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-neutral-200 hover:bg-white/5 group"
                      >
                        <Headphones className="w-4 h-4 text-[#c8ff00] group-hover:scale-110 transition" />
                        <div className="text-left">
                          <p className="font-semibold text-white">Fan Profile</p>
                          <p className="text-[10px] text-neutral-400">Club taste, badges & preferences</p>
                        </div>
                      </button>

                      {/* Separate Artist Profile */}
                      <button
                        onClick={() => { onNavigate('artist-profile'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-neutral-200 hover:bg-white/5 group"
                      >
                        <Disc className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition" />
                        <div className="text-left">
                          <p className="font-semibold text-white">Artist Profile</p>
                          <p className="text-[10px] text-neutral-400">DJ alias, rider & Sound Vault</p>
                        </div>
                      </button>

                      <button
                        onClick={() => { onNavigate('user-dashboard'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-neutral-200 hover:bg-white/5"
                      >
                        <Ticket className="w-4 h-4 text-[#c8ff00]" />
                        <span>My Door Passes ({bookings.length})</span>
                      </button>

                      {user.role === 'artist' && (
                        <button
                          onClick={() => { onNavigate('artist-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-[#00f0ff] hover:bg-white/5 font-semibold"
                        >
                          <Radio className="w-4 h-4" />
                          <span>Artist Studio & Gigs</span>
                        </button>
                      )}

                      {user.role === 'admin' && (
                        <button
                          onClick={() => { onNavigate('admin-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-[#c8ff00] hover:bg-white/5 font-semibold"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          <span>Admin Control Center</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-white/10 pt-1">
                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-red-400 hover:bg-white/5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal('login', 'fan')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-medium text-xs border border-white/10 transition"
                >
                  Fan Login
                </button>
                <button
                  onClick={() => openAuthModal('login', 'artist')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00f0ff] hover:bg-[#00d4e3] text-black font-display font-bold text-xs tracking-wider uppercase transition shadow-[0_0_12px_rgba(0,240,255,0.3)] flex items-center space-x-1"
                >
                  <Disc className="w-3.5 h-3.5" />
                  <span>Artist Hub</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f17] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-sm rounded-md ${
                  currentView === link.id ? 'bg-[#c8ff00]/10 text-[#c8ff00] font-bold' : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user && (
              <button
                onClick={() => handleNavClick('discover')}
                className="text-left px-3 py-2 text-sm rounded-md text-[#9945ff] font-bold hover:bg-white/5 flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>For You</span>
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => handleNavClick('submit-event')}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-white/10 text-white text-xs font-semibold"
            >
              <Calendar className="w-4 h-4 text-[#00f0ff]" />
              <span>Submit Event (Promoter Portal)</span>
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#c8ff00]/20 text-[#c8ff00] text-xs font-bold"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
