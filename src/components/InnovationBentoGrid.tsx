import React, { useState } from 'react';
import { 
  Code2, 
  Gauge, 
  Cpu, 
  Rocket, 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  Zap, 
  Globe2, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Eye,
  GitBranch
} from 'lucide-react';
import { SiteConfig } from '../types';

interface InnovationBentoGridProps {
  config: SiteConfig;
  onOpenInquiry: () => void;
}

export const InnovationBentoGrid: React.FC<InnovationBentoGridProps> = ({ config, onOpenInquiry }) => {
  const [codeMode, setCodeMode] = useState<'code' | 'preview'>('preview');

  const sampleSnippet = `// A3T Core Architecture: Next-Gen Shop & Capstone Engine
import { createStorefront } from '@a3t/core-engine';

export const JewelStore = createStorefront({
  client: "Aura Luxury Jewels",
  features: ["Live_Gold_API", "WhatsApp_Cart", "WebGL_3D"],
  turnaround: "4 Days",
  lighthouseTarget: 100,
  vivaReady: true,
  ownership: "100% Handover"
});`;

  return (
    <section id="innovation" className="relative py-28 bg-[#05060a] border-t border-slate-900 overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/3 w-[650px] h-[350px] bg-cyan-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>The Innovation Showcase</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Next-Generation Architecture,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Zero Compromise
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Inspect our engineering standards: micro-second load times, 100% Google Lighthouse scores, and seamless code-to-UI execution.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO 1: Interactive Code-to-UI Transformer (Large Span 7) */}
          <div className="md:col-span-7 rounded-3xl obsidian-card border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Code-to-UI Visual Transformer
                    </h3>
                    <p className="text-xs text-slate-400">Interactive live compile preview</p>
                  </div>
                </div>

                {/* Code / Preview Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    onClick={() => setCodeMode('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      codeMode === 'preview'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live UI</span>
                  </button>
                  <button
                    onClick={() => setCodeMode('code')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      codeMode === 'code'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </button>
                </div>
              </div>

              {/* Viewport Render Area */}
              {codeMode === 'preview' ? (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#0b132b] border border-cyan-500/30 relative overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">aura-jewellery.a3t.dev</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      LIVE PRODUCTION
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">24K Gold Rate Today</span>
                      <span className="text-xs font-mono font-bold text-amber-400">₹72,450 / 10g (+0.8%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 w-3/4 rounded-full" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-300">
                      Ready for WhatsApp Cart & 3D Interactive Viewer
                    </div>
                    <button
                      onClick={onOpenInquiry}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      Inspect Blueprint
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-black/80 border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
                  <pre>{sampleSnippet}</pre>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero template bloat · 100% custom compiled</span>
              </span>
              <span className="text-cyan-400 font-mono text-[11px]">Compile Time: 12ms</span>
            </div>

          </div>

          {/* BENTO 2: 100% Lighthouse Score Telemetry (Span 5) */}
          <div className="md:col-span-5 rounded-3xl obsidian-card border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Google Lighthouse Benchmark
                  </h3>
                  <p className="text-xs text-slate-400">Audited production performance</p>
                </div>
              </div>

              {/* 4 Score Gauges */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Performance', score: '100', color: 'text-emerald-400 border-emerald-500/50' },
                  { label: 'Accessibility', score: '100', color: 'text-emerald-400 border-emerald-500/50' },
                  { label: 'Best Practices', score: '100', color: 'text-emerald-400 border-emerald-500/50' },
                  { label: 'SEO Optimization', score: '100', color: 'text-emerald-400 border-emerald-500/50' },
                ].map((gauge, gidx) => (
                  <div
                    key={gidx}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center"
                  >
                    <div className={`w-14 h-14 rounded-full border-2 ${gauge.color} flex items-center justify-center font-heading text-xl font-black text-white mb-2 shadow-inner`}>
                      {gauge.score}
                    </div>
                    <span className="text-xs font-semibold text-slate-300">{gauge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Time-to-First-Byte (TTFB)</span>
              <span className="font-mono text-emerald-400 font-bold">&lt; 180ms</span>
            </div>

          </div>

          {/* BENTO 3: 3–7 Day Sprint Pipeline (Span 6) */}
          <div className="md:col-span-6 rounded-3xl obsidian-card border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Rapid 3–7 Day Sprints
                  </h3>
                  <p className="text-xs text-slate-400">Agile delivery without cutting architectural corners</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { day: 'Day 01', title: 'System Blueprint & UI Wireframes', desc: 'Direct co-founder requirement alignment & schema design' },
                  { day: 'Day 03', title: 'Interactive 3D / Frontend Build', desc: 'Component architecture, responsive layouts, motion polish' },
                  { day: 'Day 05', title: 'APIs & WhatsApp Automation', desc: 'Catalog backend, order pipelines, college IEEE reports' },
                  { day: 'Day 07', title: 'Production Deploy & Handover', desc: 'Domain connection, source code delivery & viva coaching' },
                ].map((sprint, sidx) => (
                  <div key={sidx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 shrink-0 mt-0.5">
                      {sprint.day}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{sprint.title}</div>
                      <div className="text-[11px] text-slate-400">{sprint.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Delivery Guarantee</span>
              <span className="text-cyan-400 font-semibold">On-Time or 100% Refunded</span>
            </div>
          </div>

          {/* BENTO 4: 100% Source Code Ownership & Edge Deployment (Span 6) */}
          <div className="md:col-span-6 rounded-3xl obsidian-card border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    100% Code Ownership & Zero Lock-In
                  </h3>
                  <p className="text-xs text-slate-400">Full repository handover on GitHub</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Source Handover:</span>
                  <span className="font-mono text-cyan-400 font-bold">100% Clean TypeScript</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Monthly Platform Rent:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹0 (Zero Recurring Fees)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Academic Submission:</span>
                  <span className="font-mono text-purple-400 font-bold">Full IEEE Docs + PPT</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed">
                You own your entire code repository, database schemas, and media assets. Host wherever you like: Vercel, Netlify, Cloud Run, AWS, or your own server.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Deploy Anywhere</span>
              <button
                onClick={onOpenInquiry}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Request Custom Tech Stack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
