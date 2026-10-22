import React from 'react';
import { Users, Code2, Server, Layout, Database, Shield, Sparkles, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface FoundersSectionProps {
  config: SiteConfig;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({ config }) => {
  // Exactly the 4 founders as requested by user, with role 'Co-Founder' and equal cross-functional engineering
  const founders = [
    {
      name: 'Aryan Sharma',
      role: 'Co-Founder',
      focus: 'Full-Stack Architecture & Client Solutions',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      bio: 'Leading digital solution architecture, product strategy, and end-to-end client delivery across enterprise web and retail applications.',
      skills: ['System Architecture', 'React & TypeScript', 'Client Success', 'Solution Strategy'],
      gradient: 'from-cyan-500/20 to-blue-500/10',
      borderGlow: 'hover:border-cyan-400/60',
    },
    {
      name: 'Asad Qureshi',
      role: 'Co-Founder',
      focus: 'Web Engineering & Cloud Infrastructure',
      icon: <Server className="w-5 h-5 text-sky-400" />,
      bio: 'Engineering scalable cloud deployments, high-availability hosting pipelines, and performance optimization for mission-critical client platforms.',
      skills: ['Cloud Deployment', 'API Engineering', 'DevOps & CI/CD', 'Performance Tuning'],
      gradient: 'from-sky-500/20 to-cyan-500/10',
      borderGlow: 'hover:border-sky-400/60',
    },
    {
      name: 'Ahmed Shaikh',
      role: 'Co-Founder',
      focus: 'Frontend Engineering & Interactive UI/UX',
      icon: <Layout className="w-5 h-5 text-indigo-400" />,
      bio: 'Designing intuitive user interfaces, fluid micro-interactions, responsive mobile frameworks, and high-conversion e-commerce experiences.',
      skills: ['Modern UI/UX', 'Tailwind CSS', 'Mobile First Design', 'Interactive Motion'],
      gradient: 'from-indigo-500/20 to-blue-500/10',
      borderGlow: 'hover:border-indigo-400/60',
    },
    {
      name: 'Taquee Shaikh',
      role: 'Co-Founder',
      focus: 'Backend Systems & Database Architecture',
      icon: <Database className="w-5 h-5 text-teal-400" />,
      bio: 'Designing secure database schemas, high-throughput REST/GraphQL APIs, academic project logic, and custom inventory algorithms.',
      skills: ['Database Design', 'Backend Security', 'Data Algorithms', 'Full-Stack Logic'],
      gradient: 'from-teal-500/20 to-emerald-500/10',
      borderGlow: 'hover:border-teal-400/60',
    },
  ];

  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello A3T Solutions Founders! I would like to consult on my upcoming project.'
  )}`;

  return (
    <section id="founders" className="relative py-24 bg-[#020617] border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-4 shadow-sm">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Founding Engineering Team</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet the <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Co-Founders</span> of A3T
          </h2>

          {/* Formulated in the requested professional style */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Direct engineering and bespoke digital solutions crafted by passionate co-founders dedicated to cutting-edge technology and client success.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Equal Co-Founders collaborating across all stages of strategy, design, and deployment.</span>
          </div>
        </div>

        {/* The 4 Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/50 ${founder.borderGlow}`}
            >
              {/* Subtle top gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${founder.gradient} rounded-t-2xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Avatar Icon Mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {founder.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {founder.role}
                  </span>
                </div>

                {/* Name & Focus */}
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {founder.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-400/90 mt-0.5 mb-3">
                  {founder.focus}
                </p>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">
                  {founder.bio}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {founder.skills.map((skill, sidx) => (
                    <span
                      key={sidx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#07132c] to-slate-900 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Engineering Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                When you initiate a project with A3T Solutions, you work directly with our founding team from Day 1 through launch.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Connect With Co-Founders</span>
          </a>
        </div>

      </div>
    </section>
  );
};
