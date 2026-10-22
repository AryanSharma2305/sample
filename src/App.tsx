import React, { useState, useEffect } from 'react';
import { SiteConfig, Role } from './types';
import { db } from './services/db';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Interactive3DServices } from './components/Interactive3DServices';
import { CinematicPortfolioCarousel } from './components/CinematicPortfolioCarousel';
import { InnovationBentoGrid } from './components/InnovationBentoGrid';
import { VideoSection } from './components/VideoSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FoundersSection } from './components/FoundersSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { LoginModal } from './components/LoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { EditConfigModal } from './components/EditConfigModal';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(db.getConfig());
  
  // Modals state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [initialLoginRole, setInitialLoginRole] = useState<Role>('user');
  const [adminDbModalOpen, setAdminDbModalOpen] = useState(false);
  const [editConfigModalOpen, setEditConfigModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedCategoryForInquiry, setSelectedCategoryForInquiry] = useState<string | undefined>();

  useEffect(() => {
    const unsub = db.subscribe(() => {
      setConfig(db.getConfig());
    });
    return () => {
      unsub();
    };
  }, []);

  const handleOpenLogin = (role: Role = 'user') => {
    setInitialLoginRole(role);
    setLoginModalOpen(true);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050609] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navbar with brand identity, live status, login triggers */}
      <Navbar
        config={config}
        onOpenLogin={handleOpenLogin}
        onOpenAdminDb={() => setAdminDbModalOpen(true)}
        onOpenEditConfig={() => setEditConfigModalOpen(true)}
        onOpenInquiry={() => {
          setSelectedCategoryForInquiry(undefined);
          setInquiryModalOpen(true);
        }}
      />

      {/* Hero Section with Interactive 3D WebGL Canvas */}
      <Hero
        config={config}
        onOpenInquiry={() => {
          setSelectedCategoryForInquiry(undefined);
          setInquiryModalOpen(true);
        }}
        onExploreShowcase={handleScrollToServices}
      />

      {/* 3D Services Showcase (Flipping / Sliding Cards: Retail, Builders, Corporate, Students) */}
      <Interactive3DServices
        config={config}
        onOpenInquiry={(category) => {
          setSelectedCategoryForInquiry(category);
          setInquiryModalOpen(true);
        }}
      />

      {/* Cinematic 3D Portfolio Carousel */}
      <CinematicPortfolioCarousel
        config={config}
        onOpenInquiry={(projectName) => {
          setSelectedCategoryForInquiry(projectName);
          setInquiryModalOpen(true);
        }}
      />

      {/* Innovation Showcase Bento Grid (Code-to-UI, 100% Lighthouse, 3-7 Day Sprints) */}
      <InnovationBentoGrid
        config={config}
        onOpenInquiry={() => {
          setSelectedCategoryForInquiry(undefined);
          setInquiryModalOpen(true);
        }}
      />

      {/* Video Tour Section (Features both official videos with watermark) */}
      <VideoSection
        config={config}
        onOpenInquiry={() => {
          setSelectedCategoryForInquiry(undefined);
          setInquiryModalOpen(true);
        }}
      />

      {/* Technical Standards & Why Choose Us */}
      <WhyChooseUs config={config} />

      {/* 4 Founders Section (Strictly adhering to user requirements) */}
      <FoundersSection config={config} />

      {/* Footer with Verified Phone, WhatsApp, Instagram, YouTube (No Facebook) */}
      <Footer
        config={config}
        onOpenLogin={handleOpenLogin}
        onOpenEditConfig={() => setEditConfigModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp config={config} />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        config={config}
        initialCategory={selectedCategoryForInquiry}
      />

      {/* Dual Login Modal (User vs Admin with password A3T) */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        config={config}
        initialRole={initialLoginRole}
        onAdminLoginSuccess={() => setAdminDbModalOpen(true)}
      />

      {/* Admin Central Database Console (Live logs, inquiries, registered users, export) */}
      <AdminDashboardModal
        isOpen={adminDbModalOpen}
        onClose={() => setAdminDbModalOpen(false)}
        config={config}
        onOpenEditConfig={() => setEditConfigModalOpen(true)}
      />

      {/* Edit Official Numbers Modal (Protected by password A3T) */}
      <EditConfigModal
        isOpen={editConfigModalOpen}
        onClose={() => setEditConfigModalOpen(false)}
        config={config}
      />
    </div>
  );
}
