import React, { useState } from 'react';
import { X, Send, Sparkles, MessageCircle, CheckCircle, Store, GraduationCap, Phone } from 'lucide-react';
import { SiteConfig, Inquiry } from '../types';
import { db } from '../services/db';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  initialCategory?: string;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  onClose,
  config,
  initialCategory,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<Inquiry['category']>(
    (initialCategory as Inquiry['category']) || 'Jewellery Shop'
  );
  const [details, setDetails] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const inq = db.submitInquiry({
      name,
      phone,
      email: email || undefined,
      category,
      details: details || `Looking for ${category} website / project development.`,
      preferredContact,
    });

    setSubmittedInquiry(inq);
    setIsSubmitted(true);
  };

  const cleanPhone = config.whatsapp.replace(/\D/g, '');
  const inquiryWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello A3T Solutions! I have submitted a development request:
Name: ${name}
Phone: ${phone}
Category: ${category}
Requirements: ${details || 'Custom development as per discussion'}`
  )}`;

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-[#070e24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Project Consultation
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Start Your Custom Build with A3T
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Share your shop or college project requirements. Our founding team reviews details and connects within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name / Shop / Group Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Jewellery / Group 4 CS Engineering"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Project Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Inquiry['category'])}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Jewellery Shop">Jewellery Showroom Website</option>
                  <option value="Medical Store">Medical Store & Pharmacy System</option>
                  <option value="General Store">General Store / Supermarket Storefront</option>
                  <option value="Salon & Spa">Salon, Spa & Beauty Booking Site</option>
                  <option value="College Project">Engineering & CS College Project (Mini/Final Year)</option>
                  <option value="E-Commerce">E-Commerce & Online Store</option>
                  <option value="Custom App">Custom Web or Mobile Application</option>
                  <option value="Other">Other Bespoke Requirement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Requirements & Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your design preferences, features needed (e.g. WhatsApp cart, live gold ticker, college synopsis guidelines, etc.)"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WhatsApp', 'Phone Call', 'Email'] as const).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setPreferredContact(ch)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        preferredContact === ch
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Requirements & Record in System</span>
              </button>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Request Logged Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              Your inquiry has been stored securely in our team's active project database. For immediate attention, tap below to forward this brief directly to our Co-Founders on WhatsApp.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left max-w-md mx-auto mb-6 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Client:</span>
                <span className="text-white font-medium">{submittedInquiry?.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="text-cyan-400 font-semibold">{submittedInquiry?.category}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Phone:</span>
                <span className="text-white">{submittedInquiry?.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={inquiryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp Directly</span>
              </a>

              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
