import React, { useState } from 'react';
import { X, Lock, Phone, MessageCircle, Instagram, Youtube, CheckCircle2, AlertCircle, Save, ShieldAlert } from 'lucide-react';
import { SiteConfig } from '../types';
import { db } from '../services/db';

interface EditConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const EditConfigModal: React.FC<EditConfigModalProps> = ({ isOpen, onClose, config }) => {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(config.phone);
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [instagram, setInstagram] = useState(config.instagram);
  const [youtube, setYoutube] = useState(config.youtube);
  const [tagline, setTagline] = useState(config.tagline);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password.trim() !== config.adminPassword) {
      setErrorMsg('Access Denied: Incorrect Password. Required password is "A3T" to modify official numbers.');
      return;
    }

    const res = db.updateConfig(password, {
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
      instagram: instagram.trim(),
      youtube: youtube.trim(),
      tagline: tagline.trim(),
    });

    if (res.success) {
      setSuccessMsg('Official contact numbers & configuration updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res.message || 'Update failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-[#070e24] border border-cyan-500/50 p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Lock className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Admin Protected Settings
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold text-white mb-1">
          Configure Official Contact Numbers
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Requires Co-Founder security password <code className="text-cyan-400 font-bold px-1.5 py-0.5 bg-slate-900 rounded border border-cyan-900/60">A3T</code> to apply updates.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* PASSWORD FIELD (REQUIRED PASSWORD A3T) */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40">
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5">
              Enter Admin Password (A3T) *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password A3T"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-cyan-500/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-300 tracking-wider font-mono"
              />
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Only verified Co-Founders with password <span className="text-white font-bold">A3T</span> can edit the official phone number.
            </p>
          </div>

          {/* Official Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Official Phone Number (Call)
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
              <Phone className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Official WhatsApp Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Official WhatsApp Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
              <MessageCircle className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Instagram Handle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Instagram Handle / Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
              <Instagram className="w-4 h-4 text-pink-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* YouTube Channel URL (Facebook removed as per user instruction) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Official YouTube Channel URL
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
              <Youtube className="w-4 h-4 text-rose-500 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Official Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Verify Password & Save Numbers</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
