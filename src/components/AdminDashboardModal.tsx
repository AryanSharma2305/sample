import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Users, 
  Activity, 
  MessageSquare, 
  Phone, 
  Settings, 
  Download, 
  Trash2, 
  Search, 
  ShieldCheck, 
  MessageCircle,
  ExternalLink,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { SiteConfig, User, LoginLog, Inquiry } from '../types';
import { db } from '../services/db';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onOpenEditConfig: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  config,
  onOpenEditConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'users' | 'inquiries'>('logs');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [logs, setLogs] = useState<LoginLog[]>(db.getLogs());
  const [users, setUsers] = useState<User[]>(db.getUsers());
  const [inquiries, setInquiries] = useState<Inquiry[]>(db.getInquiries());

  const refreshData = () => {
    setLogs(db.getLogs());
    setUsers(db.getUsers());
    setInquiries(db.getInquiries());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
    const unsub = db.subscribe(() => {
      refreshData();
    });
    return () => {
      unsub();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtered lists
  const filteredLogs = logs.filter(
    (l) =>
      l.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.userPhone.includes(searchQuery) ||
      l.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.phone.includes(searchQuery) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export JSON Dump
  const handleExportJSON = () => {
    const dataStr = db.exportDatabaseJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `A3T_Database_Export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export CSV for Excel/Sheets
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Type', 'Name', 'Phone', 'Email', 'Category / Role', 'Details'];
    const rows: string[][] = [];

    // Inquiries
    inquiries.forEach((inq) => {
      rows.push([
        inq.submittedAt,
        'INQUIRY',
        `"${inq.name.replace(/"/g, '""')}"`,
        `"${inq.phone}"`,
        `"${inq.email || ''}"`,
        `"${inq.category}"`,
        `"${inq.details.replace(/"/g, '""')}"`,
      ]);
    });

    // Users
    users.forEach((usr) => {
      rows.push([
        usr.createdAt,
        'USER_ACCOUNT',
        `"${usr.name.replace(/"/g, '""')}"`,
        `"${usr.phone}"`,
        `"${usr.email}"`,
        `"${usr.role}"`,
        `"Last login: ${usr.lastLoginAt}"`,
      ]);
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `A3T_Customer_Inquiries_and_Users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-6xl h-[90vh] flex flex-col rounded-3xl bg-[#070e24] border border-cyan-500/40 shadow-2xl text-left overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  A3T Central Database Console
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Live Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time tracking of all customer logins, registrations, and project inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Edit Official Number button (Admin only, password A3T) */}
            <button
              onClick={onOpenEditConfig}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-semibold shadow-sm transition-all"
              title="Edit Official Phone Number, WhatsApp & Social Links (Requires password A3T)"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Edit Official Number & Config</span>
            </button>

            {/* Export buttons */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
              title="Export database to CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
              title="Export full JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON Backup</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats & Navigation Sub-bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 px-6 py-3 border-b border-slate-800 bg-slate-950/40">
          
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'logs'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Login Logs ({logs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Project Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'users'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Registered Accounts ({users.length})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name, phone, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 pl-8 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: LOGIN LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Showing audit records of every login attempt in this database</span>
                <button
                  onClick={() => db.clearLogs()}
                  className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Login Logs</span>
                </button>
              </div>

              {filteredLogs.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  No login logs recorded matching query.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">User / Client</th>
                        <th className="py-3 px-4">Contact (Phone / Email)</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Device & Platform</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </td>
                          <td className="py-3 px-4 font-sans font-semibold text-white">
                            {log.userName}
                          </td>
                          <td className="py-3 px-4 text-cyan-300">
                            <div>{log.userPhone}</div>
                            <div className="text-[10px] text-slate-400">{log.userEmail}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                log.role === 'admin'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              }`}
                            >
                              {log.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-sans text-slate-400 text-[11px] max-w-xs truncate">
                            {log.device}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.status === 'SUCCESS'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                All client requests for shop websites, medical portals, college projects, and custom apps.
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  No inquiries received matching query.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInquiries.map((inq) => {
                    const clientPhone = inq.phone.replace(/\D/g, '');
                    const replyWhatsAppUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(
                      `Hello ${inq.name}! We received your inquiry for ${inq.category} on A3T Solutions. We would love to discuss and finalize the roadmap!`
                    )}`;

                    return (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h4 className="font-heading text-base font-bold text-white">
                                {inq.name}
                              </h4>
                              <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mt-1">
                                {inq.category}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {new Date(inq.submittedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 leading-relaxed">
                            "{inq.details}"
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mb-3 pt-2 border-t border-slate-800">
                            <div>
                              Phone: <span className="text-white font-medium">{inq.phone}</span>
                            </div>
                            <div>
                              Prefers: <span className="text-cyan-400 font-semibold">{inq.preferredContact}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={replyWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              <span>WhatsApp Client</span>
                            </a>

                            <a
                              href={`tel:${inq.phone}`}
                              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                            >
                              <Phone className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Call</span>
                            </a>

                            <button
                              onClick={() => db.deleteInquiry(inq.id)}
                              className="p-2 rounded-xl bg-slate-800/50 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-800"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REGISTERED USERS */}
          {activeTab === 'users' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                All client profiles and admin credentials stored in database
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Created</th>
                      <th className="py-3 px-4">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {filteredUsers.map((usr) => (
                      <tr key={usr.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white">
                          {usr.name}
                        </td>
                        <td className="py-3 px-4 text-cyan-300 font-mono">
                          <div>{usr.phone}</div>
                          <div className="text-[10px] text-slate-400">{usr.email}</div>
                        </td>
                        <td className="py-3 px-4 capitalize text-slate-300">
                          {usr.clientCategory}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              usr.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}
                          >
                            {usr.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {new Date(usr.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {new Date(usr.lastLoginAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
