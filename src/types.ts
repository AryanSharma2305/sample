export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  clientCategory: 'shop' | 'student' | 'enterprise' | 'other';
  organization?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface LoginLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  role: Role;
  timestamp: string;
  device: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  category: 'Jewellery Shop' | 'Medical Store' | 'General Store' | 'Salon & Spa' | 'College Project' | 'E-Commerce' | 'Custom App' | 'Other';
  details: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  submittedAt: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'DELIVERED';
}

export interface SiteConfig {
  phone: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  companyName: string;
  tagline: string;
  adminPassword: string; // "A3T"
  statusBadge: string;
}
