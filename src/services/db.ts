import { User, LoginLog, Inquiry, SiteConfig, Role } from '../types';

const STORAGE_KEY_USERS = 'a3t_users_db_v2';
const STORAGE_KEY_LOGS = 'a3t_login_logs_v2';
const STORAGE_KEY_INQUIRIES = 'a3t_inquiries_db_v2';
const STORAGE_KEY_CONFIG = 'a3t_config_v2';
const STORAGE_KEY_SESSION = 'a3t_current_session_v2';

export const DEFAULT_CONFIG: SiteConfig = {
  phone: '+91 8976121102',
  whatsapp: '+91 8976121102',
  instagram: 'a3tsolutions2305',
  youtube: 'https://www.youtube.com/channel/UCf6bgR4RtCCTNOJKL7-3VYQ',
  companyName: 'A3T Solutions',
  tagline: 'You Want We Build',
  adminPassword: 'A3T',
  statusBadge: 'Fast Turnaround & Production-Ready Engineering',
};

// Seed initial users if none exist
const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin_master',
    name: 'A3T Team Admin',
    email: 'admin@a3tsolutions.com',
    phone: '+91 8976121102',
    role: 'admin',
    clientCategory: 'enterprise',
    organization: 'A3T Solutions HQ',
    createdAt: '2026-10-18T10:00:00.000Z',
    lastLoginAt: '2026-10-20T08:30:00.000Z',
  },
  {
    id: 'usr_client_jewel',
    name: 'Rajesh Mehta',
    email: 'mehtajewellers@gmail.com',
    phone: '+91 9820112233',
    role: 'user',
    clientCategory: 'shop',
    organization: 'Mehta Fine Jewellery',
    createdAt: '2026-10-19T14:20:00.000Z',
    lastLoginAt: '2026-10-19T14:20:00.000Z',
  },
  {
    id: 'usr_student_cs',
    name: 'Karan Patel',
    email: 'karan.patel@engg.edu',
    phone: '+91 9137445566',
    role: 'user',
    clientCategory: 'student',
    organization: 'B.Tech CS Final Year',
    createdAt: '2026-10-19T16:45:00.000Z',
    lastLoginAt: '2026-10-19T16:45:00.000Z',
  }
];

const INITIAL_LOGS: LoginLog[] = [
  {
    id: 'log_001',
    userId: 'usr_admin_master',
    userName: 'A3T Team Admin',
    userEmail: 'admin@a3tsolutions.com',
    userPhone: '+91 8976121102',
    role: 'admin',
    timestamp: '2026-10-20T08:30:00.000Z',
    device: 'Desktop Chrome (Admin Console)',
    status: 'SUCCESS',
  },
  {
    id: 'log_002',
    userId: 'usr_client_jewel',
    userName: 'Rajesh Mehta',
    userEmail: 'mehtajewellers@gmail.com',
    userPhone: '+91 9820112233',
    role: 'user',
    timestamp: '2026-10-19T14:20:00.000Z',
    device: 'Mobile Safari / iOS (Jewellery Catalog Portal)',
    status: 'SUCCESS',
  }
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_001',
    name: 'Mehta Fine Jewellery',
    phone: '+91 9820112233',
    email: 'mehtajewellers@gmail.com',
    category: 'Jewellery Shop',
    details: 'Need a luxury digital catalog website with live gold rate updates and WhatsApp direct inquiry for necklace sets.',
    preferredContact: 'WhatsApp',
    submittedAt: '2026-10-19T14:22:00.000Z',
    status: 'IN_PROGRESS',
  },
  {
    id: 'inq_002',
    name: 'Karan Patel (Engineering Group)',
    phone: '+91 9137445566',
    email: 'karan.patel@engg.edu',
    category: 'College Project',
    details: 'Final year Computer Engineering project: Full-Stack Smart Medical Inventory Management with Prescription OCR and React frontend.',
    preferredContact: 'WhatsApp',
    submittedAt: '2026-10-19T16:50:00.000Z',
    status: 'CONTACTED',
  }
];

// Helper to get device info
function getDeviceInfo(): string {
  if (typeof window === 'undefined') return 'Server Runtime';
  const ua = navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  return `${isMobile ? 'Mobile' : 'Desktop'} ${browser} (${navigator.platform || 'Web'})`;
}

class DatabaseService {
  private users: User[] = [];
  private logs: LoginLog[] = [];
  private inquiries: Inquiry[] = [];
  private config: SiteConfig = { ...DEFAULT_CONFIG };
  private currentSession: User | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    try {
      const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      this.users = storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;
      if (!storedUsers) localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));

      const storedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      this.logs = storedLogs ? JSON.parse(storedLogs) : INITIAL_LOGS;
      if (!storedLogs) localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(INITIAL_LOGS));

      const storedInquiries = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      this.inquiries = storedInquiries ? JSON.parse(storedInquiries) : INITIAL_INQUIRIES;
      if (!storedInquiries) localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));

      const storedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      this.config = storedConfig ? { ...DEFAULT_CONFIG, ...JSON.parse(storedConfig) } : { ...DEFAULT_CONFIG };
      if (!storedConfig) localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));

      const storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
      if (storedSession) {
        this.currentSession = JSON.parse(storedSession);
      }
    } catch (e) {
      console.warn('Storage init failed, using in-memory store', e);
      this.users = [...INITIAL_USERS];
      this.logs = [...INITIAL_LOGS];
      this.inquiries = [...INITIAL_INQUIRIES];
      this.config = { ...DEFAULT_CONFIG };
    }
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(this.users));
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(this.logs));
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(this.inquiries));
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(this.config));
      if (this.currentSession) {
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(this.currentSession));
      } else {
        localStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // --- Session & Current User ---
  public getCurrentUser(): User | null {
    return this.currentSession;
  }

  public logout() {
    this.currentSession = null;
    this.persist();
  }

  // --- Auth: User / Admin Login ---
  public loginUser(identifier: string, phoneOrCode: string): { success: boolean; user?: User; message?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = phoneOrCode.trim();

    // Look for matching user by email or phone
    let found = this.users.find(
      (u) => u.email.toLowerCase() === cleanId || u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, '') || u.name.toLowerCase() === cleanId
    );

    // If new customer signs in, create profile automatically so they never get stuck!
    if (!found) {
      found = {
        id: `usr_${Date.now()}`,
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier.replace(/\s+/g, '').toLowerCase()}@client.a3t`,
        phone: cleanPhone || '+91 0000000000',
        role: 'user',
        clientCategory: 'shop',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      this.users.unshift(found);
    } else {
      found.lastLoginAt = new Date().toISOString();
      if (cleanPhone && cleanPhone !== found.phone) {
        found.phone = cleanPhone;
      }
    }

    this.currentSession = found;

    // Log the event
    const log: LoginLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: found.id,
      userName: found.name,
      userEmail: found.email,
      userPhone: found.phone,
      role: 'user',
      timestamp: new Date().toISOString(),
      device: getDeviceInfo(),
      status: 'SUCCESS',
    };
    this.logs.unshift(log);
    this.persist();

    return { success: true, user: found };
  }

  // Admin Login (Requires exact password "A3T")
  public loginAdmin(password: string, adminIdentifier?: string): { success: boolean; user?: User; message?: string } {
    if (password.trim() !== this.config.adminPassword) {
      // Record failed attempt for security audit
      const failLog: LoginLog = {
        id: `log_${Date.now()}_failed`,
        userId: 'unauthorized',
        userName: adminIdentifier || 'Admin Attempt',
        userEmail: 'admin-attempt@a3tsolutions.com',
        userPhone: 'N/A',
        role: 'admin',
        timestamp: new Date().toISOString(),
        device: getDeviceInfo(),
        status: 'FAILED',
      };
      this.logs.unshift(failLog);
      this.persist();
      return { success: false, message: 'Invalid Admin Security Key. Required password is A3T' };
    }

    let admin = this.users.find((u) => u.role === 'admin');
    if (!admin) {
      admin = {
        id: 'usr_admin_master',
        name: 'A3T Core Admin',
        email: 'admin@a3tsolutions.com',
        phone: this.config.phone,
        role: 'admin',
        clientCategory: 'enterprise',
        organization: 'A3T Solutions',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      this.users.unshift(admin);
    } else {
      admin.lastLoginAt = new Date().toISOString();
    }

    this.currentSession = admin;

    const log: LoginLog = {
      id: `log_${Date.now()}_admin`,
      userId: admin.id,
      userName: admin.name,
      userEmail: admin.email,
      userPhone: admin.phone,
      role: 'admin',
      timestamp: new Date().toISOString(),
      device: getDeviceInfo(),
      status: 'SUCCESS',
    };
    this.logs.unshift(log);
    this.persist();

    return { success: true, user: admin };
  }

  // --- Getters for Admin Database View ---
  public getUsers(): User[] {
    return [...this.users];
  }

  public getLogs(): LoginLog[] {
    return [...this.logs];
  }

  public getInquiries(): Inquiry[] {
    return [...this.inquiries];
  }

  public getConfig(): SiteConfig {
    return { ...this.config };
  }

  // --- Submit Inquiry from website ---
  public submitInquiry(data: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>): Inquiry {
    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      ...data,
      submittedAt: new Date().toISOString(),
      status: 'NEW',
    };
    this.inquiries.unshift(newInquiry);

    // Also link or create user in database
    const existing = this.users.find(u => u.phone === data.phone || (data.email && u.email === data.email));
    if (!existing) {
      const newUser: User = {
        id: `usr_lead_${Date.now()}`,
        name: data.name,
        email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '')}@lead.a3t`,
        phone: data.phone,
        role: 'user',
        clientCategory: data.category.toLowerCase().includes('college') ? 'student' : 'shop',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      this.users.unshift(newUser);
    }

    this.persist();
    return newInquiry;
  }

  // Update inquiry status (admin action)
  public updateInquiryStatus(id: string, status: Inquiry['status']) {
    const item = this.inquiries.find(i => i.id === id);
    if (item) {
      item.status = status;
      this.persist();
    }
  }

  // Delete inquiry (admin action)
  public deleteInquiry(id: string) {
    this.inquiries = this.inquiries.filter(i => i.id !== id);
    this.persist();
  }

  // Clear logs (admin action)
  public clearLogs() {
    this.logs = [];
    this.persist();
  }

  // --- Admin Configuration Updates (Edit Number, WhatsApp, Links) ---
  public updateConfig(password: string, newConfig: Partial<SiteConfig>): { success: boolean; message?: string } {
    if (password.trim() !== this.config.adminPassword) {
      return { success: false, message: 'Authorization Denied: Password "A3T" is required to modify official settings.' };
    }

    this.config = {
      ...this.config,
      ...newConfig,
    };
    this.persist();
    return { success: true };
  }

  // Verify password A3T
  public verifyAdminPassword(password: string): boolean {
    return password.trim() === this.config.adminPassword;
  }

  // Export full database JSON for easy download/backup
  public exportDatabaseJSON(): string {
    const fullDump = {
      meta: {
        exportDate: new Date().toISOString(),
        platform: 'A3T Solutions Hub',
        version: '2.0.0',
      },
      config: this.config,
      users: this.users,
      loginLogs: this.logs,
      inquiries: this.inquiries,
    };
    return JSON.stringify(fullDump, null, 2);
  }
}

export const db = new DatabaseService();
