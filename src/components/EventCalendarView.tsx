import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Ticket } from 'lucide-react';
import { RaveEvent } from '../types';

interface EventCalendarViewProps {
  events: RaveEvent[];
  onSelectEvent: (eventId: string) => void;
  onBookEvent: (event: RaveEvent) => void;
}

export const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  events,
  onSelectEvent,
  onBookEvent
}) => {
  // Calendar base: September 2026
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-19');

  // Days in September 2026: starts on Tuesday (day 2)
  const daysInMonth = 30;
  const startDayOffset = 2; // Tuesday

  const eventsByDate = events.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {} as Record<string, RaveEvent[]>);

  const selectedDayEvents = eventsByDate[selectedDate] || [];

  return (
    <div className="bg-[#0f1118] border border-white/10 rounded-2xl p-6 shadow-xl text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-[#c8ff00]" />
            <h3 className="font-display font-bold text-xl text-white">
              Poland Rave Calendar
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            September 2026 • Discover underground gatherings by date
          </p>
        </div>

        {/* Quick Date Presets */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          <button
            onClick={() => setSelectedDate('2026-09-19')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              selectedDate === '2026-09-19'
                ? 'bg-[#c8ff00] text-black border-[#c8ff00] font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Tonight (Sep 19)
          </button>
          <button
            onClick={() => setSelectedDate('2026-09-20')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              selectedDate === '2026-09-20'
                ? 'bg-[#c8ff00] text-black border-[#c8ff00] font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Sunday (Sep 20)
          </button>
          <button
            onClick={() => setSelectedDate('2026-09-26')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              selectedDate === '2026-09-26'
                ? 'bg-[#c8ff00] text-black border-[#c8ff00] font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Next Weekend (Sep 26)
          </button>
        </div>
      </div>

      {/* Calendar Grid & Selected Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Calendar Matrix */}
        <div className="lg:col-span-7">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-xs font-mono font-bold text-neutral-400 mb-2">
            <span>SUN</span>
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1.5 text-sm">
            {/* Empty slots for month start offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16 rounded-xl bg-white/2 opacity-20" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-09-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
              const dayEvents = eventsByDate[dateStr] || [];
              const isSelected = selectedDate === dateStr;
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-16 p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all relative ${
                    isSelected
                      ? 'border-[#c8ff00] bg-[#c8ff00]/15 shadow-[0_0_15px_rgba(200,255,0,0.2)]'
                      : hasEvents
                      ? 'border-white/20 bg-white/5 hover:border-[#c8ff00]/50'
                      : 'border-white/5 bg-white/2 text-neutral-600 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected
                          ? 'text-[#c8ff00]'
                          : hasEvents
                          ? 'text-white'
                          : 'text-neutral-500'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {hasEvents && (
                      <span className="w-2 h-2 rounded-full bg-[#c8ff00] shadow-[0_0_6px_#c8ff00]" />
                    )}
                  </div>

                  {hasEvents && (
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#c8ff00] block truncate font-semibold">
                        {dayEvents.length} rave{dayEvents.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-[9px] text-neutral-400 block truncate">
                        {dayEvents[0].cityName}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Event List */}
        <div className="lg:col-span-5 bg-black/40 rounded-xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                  Selected Date
                </span>
                <h4 className="font-display font-bold text-lg text-white">
                  {selectedDate}
                </h4>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#c8ff00]/20 text-[#c8ff00]">
                {selectedDayEvents.length} event{selectedDayEvents.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {selectedDayEvents.length === 0 ? (
                <div className="py-12 text-center text-neutral-500">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No scheduled raves on this specific date.</p>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Try picking a weekend date like Sep 19, 20 or 26!
                  </p>
                </div>
              ) : (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => onSelectEvent(ev.id)}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#c8ff00]/40 transition cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5 text-[11px] text-[#00f0ff] mb-1">
                          <Clock className="w-3 h-3" />
                          <span>{ev.startTime} - {ev.endTime}</span>
                        </div>
                        <h5 className="font-display font-bold text-sm text-white group-hover:text-[#c8ff00] transition">
                          {ev.title}
                        </h5>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {ev.venueName}, {ev.cityName}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#c8ff00]">
                        {ev.minPrice} PLN
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex gap-1">
                        {ev.genres.slice(0, 2).map((g) => (
                          <span
                            key={g}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookEvent(ev);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#c8ff00] text-black font-bold text-[11px] uppercase tracking-wider hover:bg-[#b8ea00] transition flex items-center space-x-1"
                      >
                        <Ticket className="w-3 h-3" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-neutral-500 font-mono">
            Raves usually start at 23:00 and continue until Sunday morning.
          </div>
        </div>
      </div>
    </div>
  );
};
