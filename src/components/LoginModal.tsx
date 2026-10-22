import React, { useState } from 'react';
import { X, Lock, User as UserIcon, ShieldCheck, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiteConfig, Role } from '../types';
import { db } from '../services/db';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  initialRole?: Role;
  onAdminLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  config,
  initialRole = 'user',
  onAdminLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<Role>(initialRole);
  
  // User form state
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCategory, setUserCategory] = useState<'shop' | 'student' | 'other'>('shop');
  
  // Admin form state
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('A3T Co-Founder');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!userName.trim() || !userPhone.trim()) {
      setErrorMsg('Please enter both your name and phone number');
      return;
    }

    const res = db.loginUser(userName, userPhone);
    if (res.success) {
      setSuccessMsg(`Welcome, ${res.user?.name}! Your session is active and recorded in our live database.`);
      setTimeout(() => {
        onClose();
      }, 1400);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = db.loginAdmin(adminPassword, adminName);
    if (res.success) {
      setSuccessMsg('Admin access verified with master key A3T! Opening Live Database & Console...');
      setTimeout(() => {
        onClose();
        onAdminLoginSuccess();
      }, 1000);
    } else {
      setErrorMsg(res.message || 'Incorrect Admin Password. Password must be A3T.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-[#070e24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switcher: User vs Admin */}
        <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('user');
              setErrorMsg('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'user'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Client / User</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Console</span>
          </button>
        </div>

        {/* Dynamic header */}
        <div className="mb-6">
          <h3 className="font-heading text-2xl font-bold text-white">
            {activeTab === 'user' ? 'Client Access Portal' : 'A3T Admin Authentication'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {activeTab === 'user'
              ? 'Sign in as a shop owner or student to track inquiries and view customized updates.'
              : 'Enter Co-Founder master key (A3T) to view the live database, login logs, and edit official numbers.'}
          </p>
        </div>

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

        {/* USER LOGIN FORM */}
        {activeTab === 'user' && (
          <form onSubmit={handleUserLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name / Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar / Star Jewellery"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98XXXXXXXX"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Client Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'shop', label: 'Shop Owner' },
                  { id: 'student', label: 'College Student' },
                  { id: 'other', label: 'Other Business' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setUserCategory(cat.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      userCategory === cat.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-cyan-400 font-semibold">Note: </span>
              Every customer login is recorded directly into our central database so our team can follow up with you.
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Login to Client Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ADMIN LOGIN FORM */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Co-Founder / Admin Identifier
              </label>
              <select
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="A3T Co-Founder Team">A3T Co-Founder Team</option>
                <option value="Aryan Sharma (Co-Founder)">Aryan Sharma (Co-Founder)</option>
                <option value="Asad Qureshi (Co-Founder)">Asad Qureshi (Co-Founder)</option>
                <option value="Ahmed Shaikh (Co-Founder)">Ahmed Shaikh (Co-Founder)</option>
                <option value="Taquee Shaikh (Co-Founder)">Taquee Shaikh (Co-Founder)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Master Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter Password (A3T)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 tracking-wider"
                />
                <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Required password set by team is <code className="text-cyan-400 font-bold px-1 py-0.5 bg-slate-800 rounded">A3T</code>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300 space-y-1">
              <div className="font-semibold text-white">Admin Privileges:</div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                <li>View complete Live Database of all users and logins</li>
                <li>Access all customer project inquiries</li>
                <li>Edit official phone number and WhatsApp configuration</li>
                <li>Export complete database backup to JSON / CSV</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Password & Open Admin Console</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
