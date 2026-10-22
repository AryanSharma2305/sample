import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Layers, 
  ShieldCheck, 
  MessageCircle,
  Gem,
  Building2,
  Pill,
  Brain,
  Scissors,
  Store
} from 'lucide-react';
import { SiteConfig } from '../types';

interface CinematicPortfolioCarouselProps {
  config: SiteConfig;
  onOpenInquiry: (projectName: string) => void;
}

interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  icon: React.ReactNode;
  tagline: string;
  metrics: { label: string; value: string };
  deliverables: string[];
  gradient: string;
  accentBorder: string;
  badge: string;
  techStack: string[];
}

export const CinematicPortfolioCarousel: React.FC<CinematicPortfolioCarouselProps> = ({
  config,
  onOpenInquiry,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const projects: PortfolioProject[] = [
    {
      id: 'aura-jewellery',
      title: 'Aura Grand Jewellery & Bullion Portal',
      client: 'Luxury Ornament & Bullion Retailer',
      category: 'Retail & E-Commerce',
      icon: <Gem className="w-6 h-6 text-amber-400" />,
      tagline: 'High-conversion digital showroom featuring automated live gold/silver rate updates and instant WhatsApp bridal reservation.',
      metrics: { label: 'Inquiry Growth', value: '+48% Walk-ins' },
      deliverables: ['Live 22K/24K API Ticker', 'HD Bridal Zoom Catalog', 'Instant WhatsApp Reserve', 'Hallmark Verifier'],
      gradient: 'from-amber-500/20 via-yellow-500/5 to-transparent',
      accentBorder: 'border-amber-500/40 shadow-amber-500/10',
      badge: 'Live Client Case',
      techStack: ['React', 'TypeScript', 'Tailwind', 'WhatsApp API'],
    },
    {
      id: 'apex-realty',
      title: 'Apex Horizon Luxury Towers & Residences',
      client: 'Commercial Builder & Developer',
      category: 'Builders & Real Estate',
      icon: <Building2 className="w-6 h-6 text-cyan-400" />,
      tagline: 'Architectural interactive 3D floor plan explorer with WebGL unit walkthroughs, EMI calculations, and CRM auto-qualification.',
      metrics: { label: 'Pre-Booking Velocity', value: '3.8x Faster' },
      deliverables: ['3D WebGL Floor Plan Canvas', 'Virtual Unit Tour', 'RERA Documentation Hub', 'WhatsApp Brochure Dispatch'],
      gradient: 'from-cyan-500/20 via-sky-500/5 to-transparent',
      accentBorder: 'border-cyan-500/40 shadow-cyan-500/10',
      badge: 'Architecture 3D',
      techStack: ['Three.js', 'WebGL', 'React 19', 'Express'],
    },
    {
      id: 'medpulse',
      title: 'MedPulse 24/7 Smart Pharmacy System',
      client: 'Medical Store & Healthcare Chain',
      category: 'Retail & Healthcare',
      icon: <Pill className="w-6 h-6 text-emerald-400" />,
      tagline: 'Prescription camera upload and urgent doorstep medicine delivery engine with integrated inventory and GST billing view.',
      metrics: { label: 'Repeat Orders', value: '94% Retention' },
      deliverables: ['Prescription Upload (Camera/PDF)', 'Emergency 24/7 Dispatch', 'Google Maps Auto-Route', 'Zero Fee Direct Orders'],
      gradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
      accentBorder: 'border-emerald-500/40 shadow-emerald-500/10',
      badge: 'Healthcare Ops',
      techStack: ['React', 'Node.js', 'Tailwind', 'Cloud Storage'],
    },
    {
      id: 'neuralvision',
      title: 'NeuralVision AI Capstone Research Suite',
      client: 'B.Tech CS Engineering Final Year Group',
      category: 'Academic & College Capstone',
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      tagline: 'Deep learning autonomous vision system delivered with 100% runnable code, IEEE format documentation, and viva defense coaching.',
      metrics: { label: 'Viva Evaluation', value: 'Grade A+ (98/100)' },
      deliverables: ['100% Tested Python/React Code', 'IEEE Format Project Report', 'Synopsis & UML Diagrams', 'Ready PPT + Viva Q&A Guide'],
      gradient: 'from-purple-500/20 via-fuchsia-500/5 to-transparent',
      accentBorder: 'border-purple-500/40 shadow-purple-500/10',
      badge: 'Viva Defense Ready',
      techStack: ['Python', 'PyTorch', 'React', 'FastAPI'],
    },
    {
      id: 'velvet-blade',
      title: 'Velvet & Blade Luxury Grooming & Spa',
      client: 'Premium Salon & Aesthetic Clinic',
      category: 'Lifestyle & Booking',
      icon: <Scissors className="w-6 h-6 text-rose-400" />,
      tagline: 'Automated 24/7 slot booking engine, stylist portfolio showcase, and automated WhatsApp appointment reminders.',
      metrics: { label: 'No-Show Reduction', value: '-85% No-Shows' },
      deliverables: ['Real-Time Slot Calendar', 'Stylist Work Showcase', 'Bridal Package Configurator', 'WhatsApp Reminders'],
      gradient: 'from-rose-500/20 via-pink-500/5 to-transparent',
      accentBorder: 'border-rose-500/40 shadow-rose-500/10',
      badge: 'Automated Booking',
      techStack: ['React', 'Vite', 'Tailwind', 'WhatsApp Bot'],
    },
    {
      id: 'novamart',
      title: 'NovaSupermarket Direct Kirana Storefront',
      client: 'Local Supermarket & General Store',
      category: 'Retail & Supermarkets',
      icon: <Store className="w-6 h-6 text-blue-400" />,
      tagline: 'Custom digital shopping cart sending doorstep orders directly to the owner via WhatsApp without paying 20% platform commissions.',
      metrics: { label: 'Commission Saved', value: '100% Kept by Shop' },
      deliverables: ['WhatsApp Smart Grocery List', 'Daily Discount Flyer Engine', 'Owner Price Update App', 'Counter Standee QR Art'],
      gradient: 'from-blue-500/20 via-indigo-500/5 to-transparent',
      accentBorder: 'border-blue-500/40 shadow-blue-500/10',
      badge: 'Zero Commission',
      techStack: ['React', 'TypeScript', 'Node.js', 'WhatsApp Web'],
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, projects.length]);

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const activeProject = projects[activeIndex];
  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  return (
    <section id="portfolio" className="relative py-28 bg-[#040508] border-t border-slate-900 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cinematic 3D Portfolio Showcase</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Proven Systems Delivered to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Real Clients
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Inspect our featured deployments across commercial retail, architectural builders, and academic engineering juries.
          </p>
        </div>

        {/* 3D Cinematic Showcase Stage */}
        <div
          className="relative perspective-1500"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Active Card Featured Display */}
          <div className="relative rounded-3xl obsidian-card border border-slate-700/80 p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden transition-all duration-700">
            
            {/* Top ambient color wash matching card theme */}
            <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${activeProject.gradient} pointer-events-none opacity-60`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Client Case & Details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-md">
                    {activeProject.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {activeProject.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 font-semibold">
                        {activeProject.badge}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">
                      {activeProject.title}
                    </h3>
                  </div>
                </div>

                <div className="text-xs font-medium text-slate-400">
                  Client: <span className="text-white font-semibold">{activeProject.client}</span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeProject.tagline}
                </p>

                {/* Key Deliverables Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeProject.deliverables.map((del, didx) => (
                    <div key={didx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">Stack:</span>
                  {activeProject.techStack.map((tech, tidx) => (
                    <span key={tidx} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hi A3T Solutions! I saw your portfolio case "${activeProject.title}". Can you build something similar for my business / project?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire About This Setup</span>
                  </a>

                  <button
                    onClick={() => onOpenInquiry(activeProject.title)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Customize For My Needs</span>
                  </button>
                </div>

              </div>

              {/* Right Column: High-Tech Telemetry Card */}
              <div className="lg:col-span-5 text-left">
                <div className="p-7 rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-xl relative overflow-hidden">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Benchmark Result
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                      Production Verified
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs text-slate-400 mb-1">{activeProject.metrics.label}</div>
                    <div className="font-heading text-3xl font-extrabold text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {activeProject.metrics.value}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery Sprint</span>
                      <span className="font-semibold text-white">3–7 Days Handover</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Source Code</span>
                      <span className="font-semibold text-cyan-400">100% Handover / Full Ownership</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Platform Hosting</span>
                      <span className="font-semibold text-emerald-400">Vercel & Cloudflare Edge</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Client Support</span>
                      <span className="font-semibold text-slate-200">Direct Co-Founders WhatsApp</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Case Study #{activeIndex + 1} of {projects.length}</span>
                    <span className="text-[11px] text-cyan-400 font-mono">Status: ACTIVE</span>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* Magnetic Carousel Controls */}
          <div className="flex items-center justify-between mt-8 max-w-md mx-auto">
            <button
              onClick={prevProject}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2">
              {projects.map((p, pidx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(pidx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === pidx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Slide to ${p.title}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all active:scale-95 shadow-md"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
