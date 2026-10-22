import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, MessageCircle, MonitorPlay, Film } from 'lucide-react';
import { SiteConfig } from '../types';

interface VideoSectionProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ config, onOpenInquiry }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<0 | 1>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      title: 'Idea to Reality: Concept to Launch',
      tagline: 'See how A3T Solutions transforms concepts into production web systems',
      src: '/assets/aistudio/WhatsApp_Video_2026-10-19_at_16.57.35_d9e6be15.mp4',
      badge: 'Featured Showcase',
    },
    {
      title: 'Your Business. Your Website.',
      tagline: 'Custom engineered architectures built around your exact commercial needs',
      src: '/assets/aistudio/WhatsApp_Video_2026-10-19_at_17.04.05_1353c049.mp4',
      badge: 'Brand Manifesto',
    },
  ];

  const currentVideo = videos[activeVideoIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSwitchVideo = (index: 0 | 1) => {
    setActiveVideoIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello A3T Solutions! I watched your website showcase video (${currentVideo.title}) and want to start my project!`
  )}`;

  return (
    <section id="video-showcase" className="relative py-20 bg-[#020617] border-y border-cyan-950/40 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-3">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>Official Video Showcase</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Watch How We Turn <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Your Ideas</span> Into Reality
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            See the exact digital transformation we deliver for shops, retail enterprises, and college project presentations.
          </p>

          {/* Video Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mt-6 shadow-inner">
            {videos.map((vid, idx) => (
              <button
                key={idx}
                onClick={() => handleSwitchVideo(idx as 0 | 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeVideoIndex === idx
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>{vid.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High-Tech Futuristic Video Player Shell */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl shadow-cyan-950/60 group">
            
            {/* Branded Corner Watermark Logo (Per user request to edit/place logo in videos wherever we put) */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-500/40 pointer-events-none shadow-md">
              <img
                src="/assets/aistudio/image_eeedbc0a.png"
                alt="A3T Logo Overlay"
                className="w-6 h-6 object-contain"
              />
              <span className="font-heading text-xs font-black tracking-wider text-white">
                A3T <span className="text-cyan-400 font-normal">SOLUTIONS</span>
              </span>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              src={currentVideo.src}
              className="w-full aspect-video object-contain bg-black cursor-pointer"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
            />

            {/* Ambient Bottom Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex items-center justify-between opacity-95 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-transform active:scale-95 shadow-md shadow-cyan-500/40"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                  title={isMuted ? 'Unmute Audio' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>

                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-white tracking-wide">{currentVideo.title}</div>
                  <div className="text-[11px] text-slate-400">{currentVideo.tagline}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order This Quality</span>
                </a>

                <button
                  onClick={handleFullscreen}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick interactive callout below player */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Have a specific reference video or design in mind? We recreate & engineer it from scratch!</span>
            </div>
            <button
              onClick={onOpenInquiry}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
            >
              Send Reference Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
