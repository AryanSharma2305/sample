import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, User as UserIcon, ShieldCheck, Menu, X, Youtube, Instagram, Sparkles, Database } from 'lucide-react';
import { SiteConfig, User } from '../types';
import { db } from '../services/db';

interface NavbarProps {
  config: SiteConfig;
  onOpenLogin: (initialRole?: 'user' | 'admin') => void;
  onOpenAdminDb: () => void;
  onOpenEditConfig: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenLogin,
  onOpenAdminDb,
  onOpenEditConfig,
  onOpenInquiry,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setCurrentUser(db.getCurrentUser());
    });
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello A3T Solutions! I would like to inquire about building a website / app / college project.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-900/30 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with uploaded branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/aistudio/image_eeedbc0a.png"
                alt="A3T Icon"
                className="w-10 h-10 object-contain rounded-xl p-1 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 shadow-sm shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#030712] rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                A3T <span className="text-cyan-400 font-medium text-sm tracking-widest uppercase ml-1">Solutions</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                You Want · We Build
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              3D Services
            </a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
              Portfolio
            </a>
            <a href="#innovation" className="hover:text-cyan-400 transition-colors">
              Innovation
            </a>
            <a href="#video-showcase" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Video Tour
            </a>
            <a href="#founders" className="hover:text-cyan-400 transition-colors">
              Founders
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick WhatsApp Direct Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shadow-sm"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>

            {/* Call button */}
            <a
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{config.phone}</span>
            </a>

            {/* Auth / Admin state */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={onOpenAdminDb}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 hover:brightness-110 transition-all"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Admin DB & Logs</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-cyan-500/30 text-xs">
                    <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-medium text-slate-200 max-w-[120px] truncate">{currentUser.name}</span>
                  </div>
                )}
                <button
                  onClick={() => db.logout()}
                  className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 transition-colors"
                  title="Sign out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenLogin('user')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => onOpenLogin('admin')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 transition-all"
                  title="Admin console access with password A3T"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d1e] border-b border-cyan-900/40 px-5 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-300 pt-2 border-b border-slate-800 pb-4">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              3D Services (Retail, Builders & Students)
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Cinematic Portfolio
            </a>
            <a
              href="#innovation"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Innovation Bento Grid
            </a>
            <a
              href="#video-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1 flex items-center justify-between"
            >
              <span>Video Showcase</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Live</span>
            </a>
            <a
              href="#founders"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Founders
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Contact & Social
            </a>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Official Phone:</span>
              <a href={`tel:${config.phone}`} className="text-cyan-400 font-semibold">{config.phone}</a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin('user');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-4 h-4 text-cyan-400" />
                <span>Client Login</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin('admin');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-cyan-950/70 text-xs font-medium text-cyan-300 border border-cyan-800/50 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Admin Login</span>
              </button>
            </div>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDb();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30"
              >
                <Database className="w-4 h-4" />
                <span>Open Login Database & Admin Console</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Website / Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
