import React from 'react';
import { Radio, ShieldCheck, Heart } from 'lucide-react';
import { CITIES } from '../data/mockData';

interface FooterProps {
  onNavigate: (view: string, id?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0a0b10] border-t border-white/10 text-left pt-16 pb-28 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#c8ff00] text-black font-display font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(200,255,0,0.4)] group-hover:scale-105 transition">
                RN
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                RAVE NATION <span className="text-[#c8ff00] text-xs font-mono">PL</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Poland’s dedicated electronic music, warehouse party, and underground culture network. 
              Connecting clubs, independent artists, label collectives, and ravers across the country.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe Space Certified • Harm Reduction Aligned</span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-white font-bold tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-[#c8ff00] transition">
                  Upcoming Raves
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('artists')} className="hover:text-[#c8ff00] transition">
                  Polish DJs & Live Acts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('venues')} className="hover:text-[#c8ff00] transition">
                  Clubs & Warehouses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('music')} className="hover:text-[#c8ff00] transition">
                  Sound Vault & Tracks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-[#c8ff00] transition">
                  Scene Chronicles & Editorial
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Polish Cities */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-white font-bold tracking-wider">
              Polish Hubs
            </h4>
            <ul className="space-y-2">
              {CITIES.slice(0, 6).map((city) => (
                <li key={city.id}>
                  <button 
                    onClick={() => onNavigate('cities', city.id)}
                    className="hover:text-[#00f0ff] transition"
                  >
                    {city.name} Scene
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Col 3: Community & Safety */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-white font-bold tracking-wider">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#9945ff] transition">
                  Safe Rave Manifesto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#9945ff] transition">
                  Camera Sticker Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('artist-dashboard')} className="hover:text-[#c8ff00] transition">
                  Organizer Event Submission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('user-dashboard')} className="hover:text-[#c8ff00] transition">
                  My Digital Tickets
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px] font-mono">
          <p>© 2026 RAVE NATION POLAND. All rights reserved. Warsaw • Kraków • Poznań • Wrocław • Gdańsk.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-300">Privacy & GDPR</button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-300">Terms of Service</button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-300">Door Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
