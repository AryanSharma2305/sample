import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';

interface FloatingWhatsAppProps {
  config: SiteConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('I need a website for my retail shop');

  const cleanPhone = config.whatsapp.replace(/\D/g, '');

  const quickMessages = [
    'I need a website for my retail shop (Jewellery/Medical/Grocery/Salon)',
    'I need an engineering/CS college project (Mini or Final Year)',
    'I need a custom web application & mobile app',
    'I want to inquire about fast 3–7 day delivery & pricing',
  ];

  const handleSend = (msgText: string) => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msgText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Message Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#070e24] border border-emerald-500/40 p-4 shadow-2xl backdrop-blur-md text-left transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/assets/aistudio/image_eeedbc0a.png"
                  alt="A3T Logo"
                  className="w-8 h-8 rounded-lg p-0.5 bg-emerald-500/20 border border-emerald-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#070e24]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Chat with A3T Team</h4>
                <p className="text-[10px] text-emerald-400">Replies usually in 5 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-slate-300 mb-2">
              Select what you'd like to build to get instant guidance:
            </p>
            <div className="space-y-1.5">
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-200 hover:text-emerald-300 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{msg}</span>
                  <Send className="w-3 h-3 text-emerald-400 shrink-0 opacity-60 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Direct WhatsApp: {config.whatsapp}</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </button>

    </div>
  );
};
