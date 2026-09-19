import React from 'react';
import { ShieldCheck, Heart, Camera, Radio, Users, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-left">
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#c8ff00]/15 text-[#c8ff00] border border-[#c8ff00]/30 inline-block">
          Polish Electronic Music Manifesto
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          RAVE NATION POLAND
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Uniting underground warehouses, communist-era bunkers, shipyards, and intimate club basements across Poland into a unified, safe, and progressive electronic ecosystem.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0f1118] border border-white/10 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c8ff00]/10 text-[#c8ff00] flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-display font-bold text-lg text-white">Underground Purity</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            No corporate commercialism. 100% focused on authentic techno, acid, hypnotic modular acts, and domestic Polish talent.
          </p>
        </div>

        <div className="p-6 bg-[#0f1118] border border-white/10 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-display font-bold text-lg text-white">Radical Inclusion</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Our dancefloors are safe sanctuaries for LGBTQ+, marginalized communities, and anyone expressing themselves through dance.
          </p>
        </div>

        <div className="p-6 bg-[#0f1118] border border-white/10 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#9945ff]/10 text-[#9945ff] flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-display font-bold text-lg text-white">Harm Reduction</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Direct collaboration with peer educators, free hydration stations, drug checking education, and non-judgmental assistance.
          </p>
        </div>
      </div>

      {/* Safe Space & Club Etiquette Guide */}
      <div className="bg-[#0f1118] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center space-x-2 text-[#c8ff00] text-xs font-mono uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>The Dancefloor Protocol</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
          Polish Rave Etiquette
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Camera className="w-4 h-4 text-[#00f0ff]" />
              <span>Camera Sticker Policy (Strictly Enforced)</span>
            </h4>
            <p className="text-neutral-400">
              At venues like Jasna 1, Schron, and Ciało, phone cameras are covered with colored security stickers at the door. Do not remove stickers on the dancefloor. People dance with total freedom when their privacy is respected.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Heart className="w-4 h-4 text-[#ff1e42]" />
              <span>Consent is Non-Negotiable</span>
            </h4>
            <p className="text-neutral-400">
              Physical touch, close dancing, and conversations require clear, enthusiastic consent. If someone seems uncomfortable or asks for space, honor it immediately. If you witness boundary crossing, speak to the Awareness Team (wearing designated badges/lights) or door crew.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#c8ff00]" />
              <span>Hydration & Pacing</span>
            </h4>
            <p className="text-neutral-400">
              Polish warehouse raves routinely run 12 to 24+ hours. Drink water regularly, use earplugs on high-SPL sound systems (Funktion-One / Lambda Labs), and look out for your friends and fellow ravers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
