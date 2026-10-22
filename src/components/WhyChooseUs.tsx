import React from 'react';
import { Rocket, ShieldCheck, Cpu, Smartphone, Headphones, FileText, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhyChooseUsProps {
  config: SiteConfig;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ config }) => {
  const points = [
    {
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: 'Rapid 3–7 Day Delivery',
      desc: 'We operate in high-velocity agile sprints. Your shop website or college project gets delivered swiftly without compromising code cleanliness.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      title: 'Direct WhatsApp Automation',
      desc: 'Over 90% of Indian retail customers prefer ordering via WhatsApp. We integrate instant product inquiry and cart triggers with 1 tap.',
    },
    {
      icon: <FileText className="w-6 h-6 text-sky-400" />,
      title: 'Full College Project Package',
      desc: 'For engineering and CS students: complete runnable source code, IEEE-style documentation report, synopsis, PPT slides, and viva prep.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: 'Modern High-Tech Architecture',
      desc: 'Built with modern React, Vite, Tailwind CSS, TypeScript, and robust backend APIs that load in milliseconds and score 98+ on Google Lighthouse.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: '100% Code Ownership',
      desc: 'You receive all source code files, database schemas, and documentation. No vendor lock-in or recurring software rental fees.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-400" />,
      title: 'Dedicated After-Launch Support',
      desc: 'We assist with domain linking, cloud deployment on Vercel/Cloud Run, and minor tweaks post-handover to ensure flawless operation.',
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>The A3T Standard</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered For Real Results, Not Empty Templates
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From single-counter retail shops to university capstone juries, we engineer software that performs seamlessly under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-950/30 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {pt.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {pt.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
