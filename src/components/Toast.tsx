import React from 'react';
import { useRave } from '../context/RaveContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useRave();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center space-x-2.5 px-4 py-3 bg-[#13151f] border border-[#c8ff00]/40 rounded-xl shadow-[0_0_20px_rgba(200,255,0,0.2)] text-white text-xs font-medium">
        <div className="w-2 h-2 rounded-full bg-[#c8ff00] animate-ping" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
