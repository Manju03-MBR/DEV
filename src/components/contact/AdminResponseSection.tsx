import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  LogOut, 
  Clock, 
  Trash2, 
  CheckCircle, 
  Mail, 
  Search, 
  Download, 
  PlusCircle, 
  AlertTriangle,
  FileSpreadsheet,
  Inbox,
  Filter
} from 'lucide-react';
import { ContactResponse, GoogleSheetsConfig } from '../../types';

interface AdminResponseSectionProps {
  responses: ContactResponse[];
  onDeleteResponse: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onClearAll: () => void;
  onSeedDemoData: () => void;
  sheetsConfig: GoogleSheetsConfig;
  onOpenSheetsModal: () => void;
}

export const AdminResponseSection: React.FC<AdminResponseSectionProps> = ({
  responses,
  onDeleteResponse,
  onToggleStatus,
  onClearAll,
  onSeedDemoData,
  sheetsConfig,
  onOpenSheetsModal,
}) => {
  // Admin Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Show / Hide scenario for the login card
  const [isLoginBoxVisible, setIsLoginBoxVisible] = useState(true);

  // Response Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo credentials
    if (username.trim().toLowerCase() === 'admin' && (password === 'admin123' || password === 'admin')) {
      setIsLoggedIn(true);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Invalid credentials. Hint: use admin / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  // Filtered responses
  const filteredResponses = responses.filter((resp) => {
    const matchesSearch = 
      resp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resp.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resp.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ? true : resp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unreadCount = responses.filter((r) => r.status === 'unread').length;

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(responses, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_responses_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV file
  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = responses.map((r) => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${r.subject.replace(/"/g, '""')}"`,
      `"${r.message.replace(/"/g, '""')}"`,
      `"${r.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `portfolio_responses_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="admin" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isLoggedIn ? 'User Inquiries & Response Center' : 'Admin Login & Response Retrieval'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {isLoggedIn 
              ? 'Admin session active. Showing live dynamically retrieved responses from localStorage and Google Sheets.' 
              : 'Secure admin portal to review incoming inquiries with full timestamps and response management.'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* CONDITION 1: NOT LOGGED IN -> SHOW ADMIN LOGIN WITH SHOW/HIDE  */}
        {/* ============================================================== */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            {/* Show / Hide toggle button as requested by specification */}
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setIsLoginBoxVisible(!isLoginBoxVisible)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                {isLoginBoxVisible ? 'Hide Admin Login Box (CSS/JS Scenario)' : 'Show Admin Login Box'}
              </button>
            </div>

            {/* Admin Login Box with CSS/JS show/hide toggle */}
            <div className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-300 text-left ${
              isLoginBoxVisible ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    Admin Authentication
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Login to replace this section with user responses
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (hint: admin123)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login & Reveal Responses</span>
                  </button>
                </div>

                {/* Quick 1-click Demo Fill */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                  <span>Demo credentials:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('admin');
                      setPassword('admin123');
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    Autofill (admin / admin123)
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* CONDITION 2: LOGGED IN -> REPLACES ADMIN LOGIN WITH RESPONSES  */
          /* ============================================================== */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-left">
            
            {/* Top Toolbar */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                    <span>Inquiries Inbox</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono font-semibold">
                      {responses.length} Total
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-mono font-semibold">
                        {unreadCount} Unread
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live dynamic storage loaded from Chrome localStorage &amp; Google Sheets
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onOpenSheetsModal}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Google Sheets AppsScript Settings"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sheets Sync</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  disabled={responses.length === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Export to JSON file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  disabled={responses.length === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Export to CSV file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>

                {responses.length === 0 && (
                  <button
                    onClick={onSeedDemoData}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Seed Demo Responses</span>
                  </button>
                )}

                {responses.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all stored responses from localStorage?')) {
                        onClearAll();
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Clear All from LocalStorage"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-300 dark:border-slate-600"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

            </div>

            {/* Search and Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search inquiries by name, email, subject, or message..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-4 flex items-center justify-end gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {(['all', 'unread', 'read'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      statusFilter === filter
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Responses List */}
            {filteredResponses.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">No responses found</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {responses.length === 0 
                    ? 'No messages have been submitted yet. Submit a message via the Contact Form above, or click below to seed sample responses!' 
                    : 'No responses match your search or filter.'}
                </p>
                {responses.length === 0 && (
                  <button
                    onClick={onSeedDemoData}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                  >
                    Seed Sample Inquiries
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredResponses.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      item.status === 'unread'
                        ? 'bg-white dark:bg-slate-850 border-indigo-200 dark:border-indigo-900/60 shadow-md ring-1 ring-indigo-500/20'
                        : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
                    }`}
                  >
                    {/* Header Row: Subject, Status, Timestamp */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'unread' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-400'}`} />
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {item.subject}
                        </h4>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          item.status === 'unread'
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Timestamps */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.formattedDate || new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Sender Details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/50">
                      <span><strong>From:</strong> {item.name}</span>
                      <span><strong>Email:</strong> <a href={`mailto:${item.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{item.email}</a></span>
                      {item.phone && <span><strong>Phone:</strong> {item.phone}</span>}
                      <span className="font-mono text-[11px] text-slate-400 ml-auto">ID: {item.id}</span>
                    </div>

                    {/* Message Body */}
                    <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-750/60 mb-4">
                      {item.message}
                    </p>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleStatus(item.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{item.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}</span>
                        </button>

                        <a
                          href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </a>
                      </div>

                      <button
                        onClick={() => onDeleteResponse(item.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
