import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Store, 
  GraduationCap, 
  Gem, 
  Pill, 
  Scissors, 
  ShoppingBag, 
  Code, 
  UtensilsCrossed, 
  CheckCircle2, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { SiteConfig } from '../types';

interface CarouselShowcaseProps {
  config: SiteConfig;
  onSelectProject: (category: string) => void;
}

interface ShowcaseItem {
  id: string;
  category: 'shop' | 'student' | 'custom';
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  gradient: string;
  features: string[];
  specs: { label: string; value: string }[];
  highlight: string;
}

export const CarouselShowcase: React.FC<CarouselShowcaseProps> = ({ config, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'shop' | 'student'>('all');
  const [isPaused, setIsPaused] = useState(false);

  const items: ShowcaseItem[] = [
    {
      id: 'jewellery',
      category: 'shop',
      badge: 'High-Conversion Retail',
      title: 'Jewellery Showrooms & Gold Stores',
      subtitle: 'Luxury digital showcase designed for bullion & ornament retailers',
      icon: <Gem className="w-7 h-7 text-amber-400" />,
      accentColor: 'border-amber-500/40 shadow-amber-500/10',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      features: [
        'Live 22K/24K Gold & Silver daily rate ticker',
        'HD Bridal & solitaire collection photo gallery with zoom',
        'Direct "Order / Inquire on WhatsApp" with product code',
        'Hallmark certification and customer trust credentials',
      ],
      specs: [
        { label: 'Turnaround', value: '4–6 Days' },
        { label: 'Features', value: 'Live Rates + WhatsApp' },
        { label: 'Device', value: 'Mobile First 100%' },
      ],
      highlight: 'Turn walk-in browsers into lifelong repeat buyers with digital cataloging.',
    },
    {
      id: 'college_project',
      category: 'student',
      badge: 'Academic Excellence',
      title: 'Engineering & College Capstone Projects',
      subtitle: 'Final Year & Mini Projects with 100% working code, reports & viva prep',
      icon: <GraduationCap className="w-7 h-7 text-cyan-400" />,
      accentColor: 'border-cyan-500/50 shadow-cyan-500/20',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      features: [
        'Full-Stack Web (React, Node, Express, Python, Django, Next.js)',
        'AI/ML, NLP, Computer Vision & Smart IoT integrations',
        'Complete IEEE-format Project Report + Synopsis + Architecture Diagram',
        'Ready PPT presentation slides + 1-on-1 Viva question preparation',
      ],
      specs: [
        { label: 'Delivery', value: '3–5 Days' },
        { label: 'Includes', value: 'Code + Report + PPT' },
        { label: 'Guaranteed', value: 'Zero Errors / Tested' },
      ],
      highlight: 'Get complete confidence for your final review and college viva marks.',
    },
    {
      id: 'medical_pharmacy',
      category: 'shop',
      badge: 'Healthcare & Retail',
      title: 'Medical Stores & Pharmacies',
      subtitle: 'Convenient prescription ordering and emergency medicine portal',
      icon: <Pill className="w-7 h-7 text-emerald-400" />,
      accentColor: 'border-emerald-500/40 shadow-emerald-500/10',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      features: [
        'One-click "Upload Prescription" straight to WhatsApp or Portal',
        'Emergency 24x7 local doorstep delivery call button',
        'Over-the-counter & baby care product inventory showcase',
        'Google Maps shop location with auto-directions',
      ],
      specs: [
        { label: 'Turnaround', value: '3–4 Days' },
        { label: 'Uploads', value: 'Camera / PDF' },
        { label: 'Setup', value: 'Full Local SEO' },
      ],
      highlight: 'Help local patients order medicines from their couch with zero friction.',
    },
    {
      id: 'general_kirana',
      category: 'shop',
      badge: 'Supermarket & Grocery',
      title: 'General Stores & Supermarkets',
      subtitle: 'Digital storefront to take local orders and compete with big delivery apps',
      icon: <Store className="w-7 h-7 text-blue-400" />,
      accentColor: 'border-blue-500/40 shadow-blue-500/10',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      features: [
        'Easy digital grocery list builder with instant total calculation',
        'Direct WhatsApp Cart checkout with customer address & notes',
        'Daily discount flyers, combo packages & seasonal offers',
        'Simple owner dashboard to update prices & add new items',
      ],
      specs: [
        { label: 'Turnaround', value: '3–5 Days' },
        { label: 'Orders', value: 'Direct on WhatsApp' },
        { label: 'Fees', value: 'Zero Commission' },
      ],
      highlight: 'Keep 100% of your retail margin without paying commissions to aggregator apps.',
    },
    {
      id: 'salon_spa',
      category: 'shop',
      badge: 'Beauty & Lifestyle',
      title: 'Salons, Spas & Beauty Parlours',
      subtitle: 'Automated appointment booking and stylish portfolio showpiece',
      icon: <Scissors className="w-7 h-7 text-rose-400" />,
      accentColor: 'border-rose-500/40 shadow-rose-500/10',
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      features: [
        'Interactive service menu with transparent pricing & packages',
        'Online slot reservation with date & time selection',
        'Bridal, grooming & hair transformation portfolio gallery',
        'Automated WhatsApp appointment confirmation message',
      ],
      specs: [
        { label: 'Turnaround', value: '3–5 Days' },
        { label: 'Slots', value: 'Live Availability' },
        { label: 'Theme', value: 'Premium Aesthetic' },
      ],
      highlight: 'Stop answering phone calls repeatedly — let your clients book slots 24/7.',
    },
    {
      id: 'boutique_clothing',
      category: 'shop',
      badge: 'Fashion & Apparel',
      title: 'Fashion Boutiques & Garment Outlets',
      subtitle: 'Trending lookbook showcase with Instagram shop integration',
      icon: <ShoppingBag className="w-7 h-7 text-purple-400" />,
      accentColor: 'border-purple-500/40 shadow-purple-500/10',
      gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
      features: [
        'High-fashion lookbook display with zoom & color variants',
        'Direct Instagram direct-message & WhatsApp order flow',
        'Customer review showcase and video testimonials',
        'Printable QR code display stand for your physical shop counter',
      ],
      specs: [
        { label: 'Turnaround', value: '4–6 Days' },
        { label: 'Visuals', value: 'Interactive Lookbook' },
        { label: 'QR Stand', value: 'Included Ready' },
      ],
      highlight: 'Bring footfall from Instagram and Google directly into your shop.',
    },
    {
      id: 'cafe_restaurant',
      category: 'shop',
      badge: 'Food & Hospitality',
      title: 'Restaurants, Cafes & Food Joints',
      subtitle: 'Contactless QR smart menu & online table reservations',
      icon: <UtensilsCrossed className="w-7 h-7 text-orange-400" />,
      accentColor: 'border-orange-500/40 shadow-orange-500/10',
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      features: [
        'Scan-and-Order Contactless QR Menu with dish photos',
        'Online table reservation and party booking inquiry form',
        'Special chef recommendations and today specials highlight',
        'Google Maps & One-click review link to get 5-star ratings',
      ],
      specs: [
        { label: 'Turnaround', value: '3–5 Days' },
        { label: 'Menu', value: 'Instant QR Scan' },
        { label: 'Reviews', value: 'Google Boost' },
      ],
      highlight: 'Modernize the dining experience and impress customers right at their tables.',
    },
  ];

  const filteredItems = items.filter(
    (item) => filter === 'all' || item.category === filter
  );

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [filteredItems.length, isPaused]);

  // Adjust index if filtered list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const current = filteredItems[currentIndex] || items[0];
  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  return (
    <section id="showcase" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Mesh and gradient background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Carousel</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What We Build For{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Shops & Students
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Every system is customized from scratch. Explore our high-demand solutions for local retail businesses and college engineering project requirements.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Solutions ({items.length})
            </button>
            <button
              onClick={() => setFilter('shop')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'shop'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Retail & Shops
            </button>
            <button
              onClick={() => setFilter('student')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'student'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              College Projects
            </button>
          </div>
        </div>

        {/* Carousel Container with 3D Slide Feel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Active Card */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#070e24] p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-500">
            
            {/* Top gradient glow based on card theme */}
            <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${current.gradient} pointer-events-none opacity-60`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Details & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-md">
                    {current.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {current.badge}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-white mt-0.5">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {current.subtitle}
                </p>

                {/* Highlight Quote Box */}
                <div className="p-4 rounded-xl bg-cyan-950/40 border-l-4 border-cyan-400 text-xs sm:text-sm text-cyan-200">
                  <span className="font-semibold text-white">Why it matters: </span>
                  {current.highlight}
                </div>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hi A3T Solutions! I am interested in your ${current.title} solution. Can we discuss requirements?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onSelectProject(current.title)}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    <span>Customize & Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: High-Tech Spec Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 sm:p-8 bg-slate-950/80 border border-cyan-500/30 shadow-xl relative overflow-hidden backdrop-blur-md">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      System Specification
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Production Ready
                    </span>
                  </div>

                  <div className="space-y-4">
                    {current.specs.map((spec, sidx) => (
                      <div key={sidx} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-400">{spec.label}</span>
                        <span className="font-semibold text-white">{spec.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Architecture</span>
                      <span className="font-semibold text-cyan-400">React · Vite · Tailwind · Node</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Domain & Hosting</span>
                      <span className="font-semibold text-emerald-400">Free Setup Assistance</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-400 mb-3">
                      Have unique rules, custom forms, or college syllabus requirements?
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      <span>100% Handcrafted Code & Source Files Included</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-cyan-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
