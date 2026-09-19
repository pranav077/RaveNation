import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Grid, 
  MapPin, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useRave } from '../context/RaveContext';
import { EventCard } from '../components/EventCard';
import { EventCalendarView } from '../components/EventCalendarView';
import { CITIES } from '../data/mockData';
import { RaveEvent } from '../types';

interface EventsPageProps {
  onNavigate: (view: string, id?: string) => void;
  onBookNow: (event: RaveEvent) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onBookNow }) => {
  const { 
    approvedEvents, 
    selectedCityFilter, 
    setSelectedCityFilter, 
    selectedGenreFilter, 
    setSelectedGenreFilter 
  } = useRave();

  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState(selectedCityFilter || '');
  const [genreFilter, setGenreFilter] = useState(selectedGenreFilter || '');
  const [dateFilter, setDateFilter] = useState<'all' | 'tonight' | 'weekend' | 'next_weekend' | 'month'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'selling_fast'>('all');
  const [sortBy, setSortBy] = useState<'date_asc' | 'popularity' | 'price_asc'>('date_asc');

  // Available genres
  const allGenres = [
    'Industrial Techno',
    'Hypnotic Techno',
    'Acid Techno',
    'Modular Live',
    'Raw Techno',
    'Peak Time Techno',
    'EBM',
    'Hard Dance',
    'Ambient'
  ];

  // Filtered and sorted events
  const filteredEvents = useMemo(() => {
    return approvedEvents
      .filter((event) => {
        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchVenue = event.venueName.toLowerCase().includes(q);
          const matchCity = event.cityName.toLowerCase().includes(q);
          const matchLineup = event.lineup.some((l) => l.name.toLowerCase().includes(q));
          if (!matchTitle && !matchVenue && !matchCity && !matchLineup) return false;
        }

        // City
        if (cityFilter && event.cityName.toLowerCase() !== cityFilter.toLowerCase()) {
          return false;
        }

        // Genre
        if (genreFilter && !event.genres.some((g) => g.toLowerCase() === genreFilter.toLowerCase())) {
          return false;
        }

        // Date Preset
        if (dateFilter === 'tonight' && event.date !== '2026-09-19') {
          return false;
        }
        if (dateFilter === 'weekend' && !event.isThisWeekend) {
          return false;
        }
        if (dateFilter === 'next_weekend' && event.date !== '2026-09-26') {
          return false;
        }

        // Availability
        if (availabilityFilter === 'available' && event.status === 'sold_out') {
          return false;
        }
        if (availabilityFilter === 'selling_fast' && event.status !== 'selling_fast') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_asc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === 'price_asc') {
          return a.minPrice - b.minPrice;
        }
        if (sortBy === 'popularity') {
          return b.attendeesCount - a.attendeesCount;
        }
        return 0;
      });
  }, [approvedEvents, searchQuery, cityFilter, genreFilter, dateFilter, availabilityFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setCityFilter('');
    setGenreFilter('');
    setDateFilter('all');
    setAvailabilityFilter('all');
    setSelectedCityFilter(null);
    setSelectedGenreFilter(null);
  };

  const activeFiltersCount = 
    (cityFilter ? 1 : 0) + 
    (genreFilter ? 1 : 0) + 
    (dateFilter !== 'all' ? 1 : 0) + 
    (availabilityFilter !== 'all' ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Page Header & View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest mb-1">
            <span>Rave Nation Event Directory</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
            Underground Events in Poland
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Filter by Polish city, date, musical sub-genre, or switch to the interactive monthly calendar.
          </p>
        </div>

        {/* Grid vs Calendar Toggle */}
        <div className="flex items-center space-x-1 bg-[#11131c] border border-white/10 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'grid'
                ? 'bg-[#c8ff00] text-black shadow-[0_0_10px_rgba(200,255,0,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Card Grid</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'calendar'
                ? 'bg-[#c8ff00] text-black shadow-[0_0_10px_rgba(200,255,0,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      {/* SEARCH & ADVANCED FILTER BAR */}
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Top Row: Search input & Quick Date Pills */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title, lineup artists, venues..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#c8ff00]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Date Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: 'All Dates' },
              { id: 'tonight', label: 'Tonight' },
              { id: 'weekend', label: 'This Weekend' },
              { id: 'next_weekend', label: 'Next Weekend' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDateFilter(d.id as any)}
                className={`px-3 py-2 rounded-xl border transition ${
                  dateFilter === d.id
                    ? 'bg-[#c8ff00] text-black border-[#c8ff00] font-bold'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row: City, Genre, Availability & Sort */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/5 text-xs">
          {/* City Selector */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
              City
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#c8ff00]"
            >
              <option value="">All Polish Cities</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.name} className="bg-[#11131c]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Selector */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
              Genre
            </label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#c8ff00]"
            >
              <option value="">All Electronic Genres</option>
              {allGenres.map((g) => (
                <option key={g} value={g} className="bg-[#11131c]">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
              Ticket Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#c8ff00]"
            >
              <option value="all">All Tiers</option>
              <option value="available" className="bg-[#11131c]">Tickets Available</option>
              <option value="selling_fast" className="bg-[#11131c]">Selling Fast Only</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-[#c8ff00]"
            >
              <option value="date_asc" className="bg-[#11131c]">Date (Earliest First)</option>
              <option value="popularity" className="bg-[#11131c]">Popularity (Most Ravers)</option>
              <option value="price_asc" className="bg-[#11131c]">Price (Lowest First)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Bar & Reset */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-500">Active filters:</span>
              {cityFilter && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] flex items-center space-x-1">
                  <span>City: {cityFilter}</span>
                  <button onClick={() => setCityFilter('')}>&times;</button>
                </span>
              )}
              {genreFilter && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] flex items-center space-x-1">
                  <span>Genre: {genreFilter}</span>
                  <button onClick={() => setGenreFilter('')}>&times;</button>
                </span>
              )}
              {dateFilter !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] flex items-center space-x-1">
                  <span>Date: {dateFilter}</span>
                  <button onClick={() => setDateFilter('all')}>&times;</button>
                </span>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="text-[11px] font-mono text-[#c8ff00] hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* RESULTS SECTION */}
      {viewMode === 'calendar' ? (
        <EventCalendarView
          events={filteredEvents}
          onSelectEvent={(id) => onNavigate('event-detail', id)}
          onBookEvent={onBookNow}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-neutral-400">
              Showing <span className="text-white font-bold">{filteredEvents.length}</span> curated Polish underground events
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 text-neutral-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">No Raves Found</h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto">
                No events currently match your selected filters. Try choosing a different city or clearing filter parameters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-xl bg-[#c8ff00] text-black font-bold text-xs uppercase font-display"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={(id) => onNavigate('event-detail', id)}
                  onBookNow={onBookNow}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
