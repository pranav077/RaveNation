import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Volume1,
  VolumeX, 
  Repeat, 
  Shuffle, 
  Radio, 
  Maximize2, 
  Minimize2,
  Disc3
} from 'lucide-react';
import { useRave } from '../context/RaveContext';

export const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, tracks, playTrack } = useRave();
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Web Audio Context Synthesizer Fallback (for 100% bulletproof offline playback)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper for synth beat fallback
  const startFallbackSynth = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!synthTimerRef.current) {
        let step = 0;
        synthTimerRef.current = setInterval(() => {
          if (!isPlaying || !audioCtxRef.current) return;
          const now = audioCtxRef.current.currentTime;
          
          // 4/4 Kick on every 4th 16th-step (0, 4, 8, 12)
          if (step % 4 === 0) {
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
            gain.gain.setValueAtTime((isMuted ? 0 : volume) * 0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            osc.start(now);
            osc.stop(now + 0.22);
          }
          // Hi-hat on offbeats
          if (step % 4 === 2) {
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();
            osc.type = 'highpass' as unknown as OscillatorType;
            osc.frequency.setValueAtTime(6000, now);
            gain.gain.setValueAtTime((isMuted ? 0 : volume) * 0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);
            osc.start(now);
            osc.stop(now + 0.09);
          }
          step = (step + 1) % 16;
        }, 125);
      }
    } catch {
      // ignore
    }
  }, [isPlaying, isMuted, volume]);

  const stopFallbackSynth = useCallback(() => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  // Sync Play / Pause and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case user hasn't interacted or browser restricts autoplay
          startFallbackSynth();
        });
      }
    } else {
      audio.pause();
      stopFallbackSynth();
    }
  }, [isPlaying, currentTrack, isMuted, volume, startFallbackSynth, stopFallbackSynth]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopFallbackSynth();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopFallbackSynth]);

  if (!currentTrack) return null;

  const handleNext = () => {
    if (isLooping && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    if (isShuffle) {
      const remainingTracks = tracks.filter((t) => t.id !== currentTrack.id);
      const randomTrack = remainingTracks[Math.floor(Math.random() * remainingTracks.length)] || tracks[0];
      playTrack(randomTrack);
      return;
    }

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    playTrack(nextTrack);
  };

  const handlePrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    playTrack(prevTrack);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    if (audioRef.current && duration > 0) {
      const targetTime = clickRatio * duration;
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside 
      aria-label="Underground Music Player"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f17]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] transition-all"
    >
      {/* Hidden Native Audio Element with full events */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="auto"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (d && !isNaN(d) && isFinite(d)) {
            setDuration(d);
          }
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
          const d = e.currentTarget.duration;
          if (d && !isNaN(d) && isFinite(d) && duration === 0) {
            setDuration(d);
          }
        }}
        onPlay={() => {
          stopFallbackSynth();
        }}
        onPause={() => {
          stopFallbackSynth();
        }}
        onEnded={handleNext}
        onError={() => {
          // If media file fails, smoothly trigger fallback techno synth so audio never drops
          if (isPlaying) {
            startFallbackSynth();
          }
        }}
      />

      {/* Interactive Progress Bar */}
      <div 
        ref={progressBarRef}
        id="audio-scrub-bar"
        onClick={handleSeek}
        className="w-full h-1.5 bg-white/10 hover:h-2 cursor-pointer relative group transition-all"
        title="Click or drag to seek"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#00f0ff] via-[#c8ff00] to-[#9945ff] relative transition-all duration-75"
          style={{ width: `${Math.max(0.5, progressPercent)}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#c8ff00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#c8ff00]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Track Artwork & Info */}
        <div className="flex items-center space-x-3.5 min-w-0 w-1/3">
          <div className="relative group flex-shrink-0">
            <img
              src={currentTrack.artworkUrl}
              alt={currentTrack.title}
              className={`w-12 h-12 rounded-xl object-cover ring-1 ring-white/15 transition duration-300 ${
                isPlaying ? 'ring-[#c8ff00]/60 shadow-[0_0_15px_rgba(200,255,0,0.35)]' : ''
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center pointer-events-none">
                <Disc3 className="w-5 h-5 text-[#c8ff00] animate-spin" />
              </div>
            )}
          </div>

          <div className="min-w-0 text-left">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#c8ff00]/10 border border-[#c8ff00]/30 rounded text-[#c8ff00] font-semibold">
                {currentTrack.format || 'Track'}
              </span>
              {currentTrack.bpm && (
                <span className="text-[10px] font-mono text-neutral-400">
                  {currentTrack.bpm} BPM
                </span>
              )}
              {/* Equalizer Visualizer Bars */}
              {isPlaying && (
                <div className="flex items-end space-x-0.5 h-3.5 px-1 py-0.5" title="Live audio stream">
                  <div className="w-0.5 bg-[#c8ff00] rounded-full animate-eq-1" />
                  <div className="w-0.5 bg-[#00f0ff] rounded-full animate-eq-2" />
                  <div className="w-0.5 bg-[#c8ff00] rounded-full animate-eq-3" />
                  <div className="w-0.5 bg-[#9945ff] rounded-full animate-eq-4" />
                </div>
              )}
            </div>

            <p className="text-sm font-bold text-white truncate hover:text-[#c8ff00] transition cursor-pointer mt-0.5">
              {currentTrack.title}
            </p>
            <p className="text-xs text-neutral-400 truncate">
              {currentTrack.artistName} {currentTrack.label ? `• ${currentTrack.label}` : ''}
            </p>
          </div>
        </div>

        {/* Master Playback Controls */}
        <div className="flex flex-col items-center justify-center space-y-1 w-1/3">
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Shuffle button */}
            <button
              id="audio-shuffle-btn"
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-1.5 rounded-lg transition hidden sm:block ${
                isShuffle ? 'text-[#c8ff00] bg-white/10' : 'text-neutral-500 hover:text-white'
              }`}
              title={isShuffle ? 'Shuffle enabled' : 'Shuffle disabled'}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous track */}
            <button
              id="audio-prev-btn"
              onClick={handlePrev}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition active:scale-90"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Main Play / Pause Button */}
            <button
              id="audio-play-pause-btn"
              onClick={togglePlay}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c8ff00] hover:bg-[#d8ff33] flex items-center justify-center text-black shadow-[0_0_20px_rgba(200,255,0,0.5)] hover:scale-105 active:scale-95 transition"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black ml-0.5" />
              )}
            </button>

            {/* Next track */}
            <button
              id="audio-next-btn"
              onClick={handleNext}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition active:scale-90"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Loop / Repeat button */}
            <button
              id="audio-loop-btn"
              onClick={() => setIsLooping(!isLooping)}
              className={`p-1.5 rounded-lg transition hidden sm:block ${
                isLooping ? 'text-[#c8ff00] bg-white/10' : 'text-neutral-500 hover:text-white'
              }`}
              title={isLooping ? 'Repeat current track' : 'Repeat off'}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Duration Indicator */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
            <span className="text-white font-medium">{formatTime(currentTime)}</span>
            <span className="text-neutral-600">/</span>
            <span>{duration > 0 ? formatTime(duration) : (currentTrack.duration || '00:00')}</span>
          </div>
        </div>

        {/* Volume Controls & Meta */}
        <div className="flex items-center justify-end space-x-4 w-1/3">
          <div className="hidden sm:flex items-center space-x-2">
            <button
              id="audio-mute-btn"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : volume < 0.4 ? (
                <Volume1 className="w-4 h-4 text-[#c8ff00]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#c8ff00]" />
              )}
            </button>

            <input
              id="audio-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVol = parseFloat(e.target.value);
                setVolume(newVol);
                setIsMuted(false);
                if (audioRef.current) {
                  audioRef.current.volume = newVol;
                }
              }}
              className="w-20 lg:w-24 accent-[#c8ff00] h-1.5 bg-white/20 rounded-lg cursor-pointer"
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-[11px] font-mono text-neutral-300 border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-full">
              {currentTrack.genre}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
