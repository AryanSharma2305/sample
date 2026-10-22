import React from 'react';
import { ArrowRight, MessageCircle, Code2, Sparkles, Store, GraduationCap, ShieldCheck, Zap, Building2, Briefcase } from 'lucide-react';
import { SiteConfig } from '../types';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
  onExploreShowcase: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenInquiry, onExploreShowcase }) => {
  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hi A3T Solutions! I am looking for digital infrastructure / website / project development. Please share details.'
  )}`;

  return (
    <section className="relative min-h-[92vh] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center">
      {/* 3D WebGL Canvas Layer (Mouse-Parallax Bobbing Tech-Sphere & Orbital Rings) */}
      <Hero3DCanvas />

      {/* Dynamic Background Glows and Circuit Grid */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-purple-600/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Official Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 mb-8 backdrop-blur-md shadow-lg shadow-cyan-950/40 hover:border-cyan-400/60 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
            <span className="font-semibold text-cyan-300">A3T Core Engineering Team</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Rapid 3–7 Day Turnaround · Direct Co-Founder Craftsmanship</span>
          </div>

          {/* Large Logo Emblem Display */}
          <div className="mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <img
              src="/assets/aistudio/image_bd6422c0.png"
              alt="A3T Solutions - You Want We Build"
              className="relative w-auto max-h-20 sm:max-h-24 md:max-h-28 object-contain mx-auto drop-shadow-[0_10px_25px_rgba(6,182,212,0.3)]"
            />
          </div>

          {/* Core Master Headline as explicitly specified */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
            We Build Digital Infrastructure for{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Builders, Brands,
            </span>{' '}
            and Visionaries.
          </h1>

          {/* Professional Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
            From high-converting retail stores, jewellery showrooms, and real estate developer portals to corporate enterprises and IEEE-standard academic capstone projects — we engineer bespoke, production-grade web systems tailored to your exact specifications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 text-slate-950 fill-current" />
              <span>Discuss Project on WhatsApp</span>
            </a>

            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-base shadow-lg shadow-cyan-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>Book Custom Development</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreShowcase}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 text-base font-medium transition-all"
            >
              <span>Explore 3D Services</span>
            </button>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-5xl text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-amber-500/40 transition-all">
              <Store className="w-6 h-6 text-amber-400 mb-2" />
              <h2 className="text-sm font-semibold text-white">Retail & E-Commerce</h2>
              <p className="text-xs text-slate-400 mt-1">Jewellery, Medical, Supermarkets & Salons with WhatsApp ordering.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 transition-all">
              <Building2 className="w-6 h-6 text-cyan-400 mb-2" />
              <h2 className="text-sm font-semibold text-white">Builders & Real Estate</h2>
              <p className="text-xs text-slate-400 mt-1">3D floorplan viewers, project showcases & lead conversion hubs.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-purple-500/40 transition-all">
              <Briefcase className="w-6 h-6 text-purple-400 mb-2" />
              <h2 className="text-sm font-semibold text-white">Corporate Businesses</h2>
              <p className="text-xs text-slate-400 mt-1">Bespoke dashboards, ERPs, CRM integrations & workflow tools.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-sky-500/40 transition-all">
              <GraduationCap className="w-6 h-6 text-sky-400 mb-2" />
              <h2 className="text-sm font-semibold text-white">Advanced Academic & Student</h2>
              <p className="text-xs text-slate-400 mt-1">Full-stack & AI capstone projects with IEEE reports & viva guidance.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

