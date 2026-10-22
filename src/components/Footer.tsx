import React from 'react';
import { Phone, MessageCircle, Instagram, Youtube, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onOpenLogin: (role?: 'user' | 'admin') => void;
  onOpenEditConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenLogin, onOpenEditConfig }) => {
  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hi A3T Solutions! I am interested in building a website/app or college project.'
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#020512] border-t border-cyan-950/50 pt-20 pb-12 overflow-hidden text-left">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-cyan-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Contact Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-slate-800/80">
          
          {/* Direct Phone Call */}
          <a
            href={`tel:${config.phone.replace(/\s+/g, '')}`}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Direct Call Line
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors font-mono">
                {config.phone}
              </h3>
            </div>
            <span className="text-xs text-cyan-400 font-semibold mt-4 flex items-center gap-1">
              Tap to call directly &rarr;
            </span>
          </a>

          {/* Official WhatsApp Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Official WhatsApp
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors font-mono">
                {config.whatsapp}
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-4 flex items-center gap-1">
              Start WhatsApp Chat &rarr;
            </span>
          </a>

          {/* Official Instagram */}
          <a
            href={`https://www.instagram.com/${config.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Instagram Profile
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 group-hover:text-pink-300 transition-colors">
                @{config.instagram.replace('@', '')}
              </h3>
            </div>
            <span className="text-xs text-pink-400 font-semibold mt-4 flex items-center gap-1">
              Follow & DM us &rarr;
            </span>
          </a>

          {/* Official YouTube (Facebook removed per user instruction) */}
          <a
            href={config.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 transition-all group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                YouTube Channel
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 group-hover:text-rose-400 transition-colors">
                A3T Solutions
              </h3>
            </div>
            <span className="text-xs text-rose-400 font-semibold mt-4 flex items-center gap-1">
              Watch project demos &rarr;
            </span>
          </a>

        </div>

        {/* Brand Summary & Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_eeedbc0a.png"
                alt="A3T Logo"
                className="w-10 h-10 object-contain rounded-xl p-1 bg-cyan-950/60 border border-cyan-500/40"
              />
              <span className="font-heading text-2xl font-black tracking-tight text-white">
                A3T <span className="text-cyan-400 font-medium text-lg">SOLUTIONS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Dedicated engineering for jewellery shops, retail supermarkets, pharmacies, beauty parlours, and university college final-year projects.
            </p>
            <div className="text-xs text-cyan-400 font-semibold">
              Tagline: {config.tagline}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Specialized Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Jewellery Digital Showroom</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Medical & Pharmacy Portal</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">General Store & Kirana Web App</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Salon & Beauty Appointment System</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Engineering & College Projects (MERN/AI)</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Co-Founder Direct Hub
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an urgent delivery requirement or need to discuss college viva submission deadlines? WhatsApp us anytime for immediate response.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onOpenLogin('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-300 text-xs font-medium transition-all"
                title="Admin Console Login with Password A3T"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Login (Password: A3T)</span>
              </button>

              <button
                onClick={onOpenEditConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-slate-300 text-xs font-medium transition-all"
              >
                <span>Edit Official Number</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} A3T Solutions. All rights reserved. Built with precision.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Co-Founders: Aryan Sharma, Asad Qureshi, Ahmed Shaikh, Taquee Shaikh</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
