import React, { useState, useRef } from 'react';
import { 
  Store, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  RotateCw, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ArrowRight,
  Code2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { SiteConfig } from '../types';

interface Interactive3DServicesProps {
  config: SiteConfig;
  onOpenInquiry: (category?: string) => void;
}

interface ServiceTier {
  id: string;
  category: string;
  title: string;
  tagline: string;
  timeline: string;
  themeColor: string;
  borderGlow: string;
  gradient: string;
  icon: React.ReactNode;
  frontHighlights: string[];
  backDeliverables: string[];
  techStack: string[];
  stats: { label: string; value: string };
  inquiryLabel: string;
}

export const Interactive3DServices: React.FC<Interactive3DServicesProps> = ({ config, onOpenInquiry }) => {
  const [viewMode, setViewMode] = useState<'stack' | 'horizon'>('horizon');
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  
  // Card Mouse Parallax Tilt state
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const tiers: ServiceTier[] = [
    {
      id: 'retail',
      category: 'Client Tier 01',
      title: 'Retail & E-Commerce Shops',
      tagline: 'High-converting digital storefronts for jewellery showrooms, pharmacies, general stores & beauty salons.',
      timeline: '3–5 Day Sprints',
      themeColor: 'amber',
      borderGlow: 'from-amber-400 via-yellow-500 to-amber-600',
      gradient: 'from-amber-500/20 via-yellow-500/5 to-transparent',
      icon: <Store className="w-8 h-8 text-amber-400" />,
      frontHighlights: [
        'Live 22K/24K Gold & Silver daily rate ticker for jewellers',
        'Direct WhatsApp Cart & prescription upload portal',
        'Contactless QR code menus & local doorstep delivery checkout',
        'Salon 24/7 appointment slot booking with stylist lookbook',
      ],
      backDeliverables: [
        'Custom Mobile-First Web Application with Zero Aggregator Fees',
        'Owner Admin Panel to update prices, stock, and promo banners',
        'Direct 1-Tap WhatsApp Ordering Pipeline',
        'Local SEO & Google Business Profile Integration',
        'Printed QR Standee Artwork for counter placement',
      ],
      techStack: ['React 19', 'Tailwind CSS', 'Vite', 'Express API', 'WhatsApp API'],
      stats: { label: 'Conversion Lift', value: '+42% Sales' },
      inquiryLabel: 'Retail & Shop Website',
    },
    {
      id: 'realestate',
      category: 'Client Tier 02',
      title: 'Builders & Real Estate Developers',
      tagline: 'Immersive digital platforms for commercial builders, luxury residences, and architectural developments.',
      timeline: '5–7 Day Sprints',
      themeColor: 'cyan',
      borderGlow: 'from-cyan-400 via-sky-500 to-blue-600',
      gradient: 'from-cyan-500/20 via-sky-500/5 to-transparent',
      icon: <Building2 className="w-8 h-8 text-cyan-400" />,
      frontHighlights: [
        'Interactive 3D architectural floor plan & unit selector',
        'Virtual masterplan tour with high-fidelity WebGL rendering',
        'Automated buyer lead qualification and instant WhatsApp brochures',
        'RERA compliance documentation and construction milestone timeline',
      ],
      backDeliverables: [
        'Interactive 3D / WebGL Building Exploration Canvas',
        'Ultra-Luxury Project Landing Microsite',
        'Direct CRM Lead Capture & WhatsApp Auto-Responder',
        'Interactive Unit Pricing & EMI Calculator',
        'High-Speed CDN Hosting with 99.9% Uptime Guarantee',
      ],
      techStack: ['Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS', 'Cloudflare CDN'],
      stats: { label: 'Lead Velocity', value: '3.4x Inquiries' },
      inquiryLabel: 'Real Estate Developer Platform',
    },
    {
      id: 'corporate',
      category: 'Client Tier 03',
      title: 'Corporate Businesses & Enterprises',
      tagline: 'High-performance bespoke portals, internal CRM/ERP suites, and mission-critical cloud software.',
      timeline: '5–10 Day Sprints',
      themeColor: 'purple',
      borderGlow: 'from-purple-400 via-fuchsia-500 to-indigo-600',
      gradient: 'from-purple-500/20 via-indigo-500/5 to-transparent',
      icon: <Briefcase className="w-8 h-8 text-purple-400" />,
      frontHighlights: [
        'Multi-role access control (Admin, Managers, Staff, Clients)',
        'Custom business logic, automated invoice generation & reporting',
        'Real-time data visualization dashboards with exportable analytics',
        'Zero vendor lock-in with 100% full source code ownership',
      ],
      backDeliverables: [
        'End-to-End Enterprise Web Platform Architecture',
        'Secure Role-Based Authentication & Audit Logging',
        'PostgreSQL / SQLite High-Throughput Database Schemas',
        'REST / GraphQL API Endpoints for third-party connectors',
        'Complete CI/CD Deployment on Vercel, Cloud Run, or AWS',
      ],
      techStack: ['Node.js', 'Express', 'React', 'TypeScript', 'Docker', 'PostgreSQL'],
      stats: { label: 'Audit Score', value: '100% Lighthouse' },
      inquiryLabel: 'Corporate Web Application',
    },
    {
      id: 'student',
      category: 'Client Tier 04',
      title: 'Advanced Academic & Student Projects',
      tagline: 'Final year B.Tech, BCA, MCA & Diploma capstone projects with IEEE documentation and viva readiness.',
      timeline: '3–5 Day Sprints',
      themeColor: 'emerald',
      borderGlow: 'from-emerald-400 via-teal-500 to-cyan-600',
      gradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
      icon: <GraduationCap className="w-8 h-8 text-emerald-400" />,
      frontHighlights: [
        'Full-Stack MERN, Python AI/ML, NLP, Computer Vision & IoT systems',
        '100% working, error-free source code tested on live host',
        'IEEE-standard research report, synopsis & architecture diagrams',
        'Ready PPT presentation slides + 1-on-1 Viva question coaching',
      ],
      backDeliverables: [
        'Complete Annotated Source Code with GitHub Repository',
        'Official IEEE Format Project Documentation (PDF & Word)',
        'Comprehensive Synopsis & Flowchart Diagrams',
        'Key Viva Defense Questions & Guide Rubric Answers',
        'Live Cloud Hosted Prototype for External Examiner Demo',
      ],
      techStack: ['Python', 'React', 'TensorFlow', 'FastAPI', 'Node.js', 'MongoDB'],
      stats: { label: 'Viva Success', value: '100% Approved' },
      inquiryLabel: 'College Capstone Project',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((x - centerX) / centerX) * 8; // Max 8 deg
    const tiltY = -((y - centerY) / centerY) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  return (
    <section id="services" className="relative py-28 bg-[#05060a] border-t border-slate-900 overflow-hidden">
      
      {/* Ambient glow mesh */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scroll-Driven 3D Interactive Showcase</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Engineered For High-Value{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                Client Tiers
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Hover to trigger dynamic 3D depth tilt. Click any card to execute a 3D flip revealing technical deliverables, timelines, and architectures.
            </p>
          </div>

          {/* Mode Switcher: 3D Horizon Slider vs 3D Scroll-Deck */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 self-start md:self-auto shadow-inner">
            <button
              onClick={() => setViewMode('horizon')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'horizon'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Horizon Depth Slider</span>
            </button>

            <button
              onClick={() => setViewMode('stack')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'stack'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Layered Deck Stack</span>
            </button>
          </div>
        </div>

        {/* ================= OPTION B: 3D HORIZON DEPTH SLIDER ================= */}
        {viewMode === 'horizon' && (
          <div className="relative">
            
            {/* Horizon Track Container */}
            <div className="flex items-center justify-center gap-6 py-6 perspective-1500 overflow-hidden min-h-[580px]">
              {tiers.map((tier, idx) => {
                const isActive = idx === activeIndex;
                const isFlipped = !!flippedCards[tier.id];
                const offset = idx - activeIndex;

                // 3D horizon positioning calculations
                let zTranslate = 0;
                let xTranslate = 0;
                let rotateY = 0;
                let opacity = 1;
                let scale = 1;
                let filterBlur = 'none';

                if (isActive) {
                  zTranslate = 40;
                  scale = 1.02;
                  opacity = 1;
                } else {
                  zTranslate = -120;
                  xTranslate = offset * 280;
                  rotateY = offset > 0 ? -18 : 18;
                  scale = 0.88;
                  opacity = 0.35;
                  filterBlur = 'blur(2px)';
                }

                // If not adjacent on mobile, hide
                const isNearby = Math.abs(offset) <= 1;

                return (
                  <div
                    key={tier.id}
                    onClick={() => setActiveIndex(idx)}
                    onMouseMove={isActive ? handleMouseMove : undefined}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transform: isActive
                        ? `translateZ(${zTranslate}px) scale(${scale}) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
                        : `translateX(${xTranslate}px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      filter: filterBlur,
                      transition: 'all 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className={`cursor-pointer w-full max-w-[420px] h-[540px] shrink-0 rounded-3xl perspective-1000 ${
                      isActive ? 'z-30' : 'z-10 hidden md:block'
                    }`}
                  >
                    {/* The 3D Flipping Card Body */}
                    <div
                      className={`relative w-full h-full rounded-3xl transform-style-3d transition-transform duration-700 shadow-2xl ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* ============ FRONT FACE ============ */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl obsidian-card p-7 flex flex-col justify-between overflow-hidden border border-slate-700/80 group">
                        
                        {/* Dynamic Neon Border Trace */}
                        {isActive && (
                          <div
                            className={`absolute -inset-[1px] bg-gradient-to-r ${tier.borderGlow} rounded-3xl opacity-80 -z-10 animate-border-glow blur-[1px]`}
                          />
                        )}

                        {/* Top Gradient Ambient Wash */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${tier.gradient} pointer-events-none opacity-60`}
                        />

                        {/* Card Header */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-md">
                              {tier.icon}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                                {tier.timeline}
                              </span>
                              <span className="text-[11px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                                {tier.stats.value}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {tier.category}
                          </span>
                          <h3 className="font-heading text-2xl font-bold text-white mt-1 mb-2">
                            {tier.title}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">
                            {tier.tagline}
                          </p>
                        </div>

                        {/* Key Features List */}
                        <div className="relative z-10 space-y-2 py-2 border-t border-slate-800/80">
                          {tier.frontHighlights.map((hl, hidx) => (
                            <div key={hidx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-tight">{hl}</span>
                            </div>
                          ))}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(tier.id, e)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors shadow-sm"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Flip for Tech & Deliverables</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenInquiry(tier.inquiryLabel);
                            }}
                            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
                            title="Book this setup"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                      {/* ============ BACK FACE (3D FLIP) ============ */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-[#090d20] p-7 flex flex-col justify-between overflow-hidden border border-cyan-500/50 shadow-2xl">
                        
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                              Production Deliverables
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleFlip(tier.id, e)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                              title="Flip back"
                            >
                              <RotateCw className="w-4 h-4" />
                            </button>
                          </div>

                          <h4 className="font-heading text-lg font-bold text-white mb-3">
                            What We Hand Over
                          </h4>

                          <div className="space-y-2 mb-4">
                            {tier.backDeliverables.map((item, bidx) => (
                              <div key={bidx} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                <span className="leading-tight">{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              Architectural Tech Stack
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {tier.techStack.map((tech, tidx) => (
                                <span
                                  key={tidx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-2">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello A3T Solutions! I am interested in your ${tier.title} package (${tier.timeline}). Can we discuss our specifications?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span>Discuss On WhatsApp Now</span>
                          </a>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenInquiry(tier.inquiryLabel);
                            }}
                            className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                          >
                            Send Requirements Brief
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Navigation Arrows & Dot Indicators */}
            <div className="flex items-center justify-between max-w-sm mx-auto mt-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + tiers.length) % tiers.length)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all active:scale-95 shadow-md"
                aria-label="Previous Tier"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {tiers.map((t, tidx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(tidx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === tidx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to ${t.title}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % tiers.length)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all active:scale-95 shadow-md"
                aria-label="Next Tier"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

        {/* ================= OPTION A: 3D LAYERED DECK STACK ================= */}
        {viewMode === 'stack' && (
          <div className="max-w-3xl mx-auto py-8">
            <div className="relative min-h-[560px] perspective-1500 flex items-center justify-center">
              {tiers.map((tier, idx) => {
                const isActive = idx === activeIndex;
                const offset = idx - activeIndex;
                // If past, wipe out up
                const isPast = offset < 0;
                const isFuture = offset > 0;
                const isFlipped = !!flippedCards[tier.id];

                let translateY = offset * 22;
                let translateZ = -offset * 50;
                let scale = 1 - offset * 0.05;
                let opacity = 1 - offset * 0.25;

                if (isPast) {
                  translateY = -120;
                  translateZ = 80;
                  opacity = 0;
                  scale = 1.05;
                }

                if (offset > 2) {
                  opacity = 0;
                }

                return (
                  <div
                    key={tier.id}
                    style={{
                      transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                      opacity: isPast ? 0 : opacity,
                      zIndex: 30 - offset,
                      transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    className="absolute inset-0 w-full rounded-3xl perspective-1000"
                  >
                    <div
                      className={`relative w-full h-full rounded-3xl transform-style-3d transition-transform duration-700 shadow-2xl ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front face */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl obsidian-card p-8 flex flex-col justify-between border border-slate-700/80">
                        {isActive && (
                          <div
                            className={`absolute -inset-[1px] bg-gradient-to-r ${tier.borderGlow} rounded-3xl opacity-90 -z-10 animate-border-glow blur-[1px]`}
                          />
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700">
                                {tier.icon}
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                                  {tier.category}
                                </span>
                                <h3 className="font-heading text-2xl font-bold text-white">
                                  {tier.title}
                                </h3>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                              {tier.timeline}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                            {tier.tagline}
                          </p>

                          <div className="space-y-2.5 pt-2 border-t border-slate-800">
                            {tier.frontHighlights.map((h, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(tier.id, e)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Flip to Inspect Deliverables</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, tiers.length - 1))}
                              disabled={activeIndex === tiers.length - 1}
                              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md"
                            >
                              Next In Stack &rarr;
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Back face */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-[#090d20] p-8 flex flex-col justify-between border border-cyan-500/50">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                              Detailed Specifications
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleFlip(tier.id, e)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <RotateCw className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-2 mb-4">
                            {tier.backDeliverables.map((item, bidx) => (
                              <div key={bidx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello A3T Solutions! I want to start my ${tier.title} project.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span>Discuss On WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => onOpenInquiry(tier.inquiryLabel)}
                            className="py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
                          >
                            Send Brief
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stack Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                disabled={activeIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 text-xs font-medium text-slate-300"
              >
                &larr; Previous Card
              </button>
              <span className="text-xs font-mono text-slate-400">
                Card {activeIndex + 1} of {tiers.length}
              </span>
              <button
                onClick={() => setActiveIndex((prev) => Math.min(prev + 1, tiers.length - 1))}
                disabled={activeIndex === tiers.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 text-xs font-medium text-slate-300"
              >
                Next Card &rarr;
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
