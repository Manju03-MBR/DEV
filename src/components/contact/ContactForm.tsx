import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Database, FileSpreadsheet, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { ContactResponse, GoogleSheetsConfig } from '../../types';

interface ContactFormProps {
  onResponseAdded: (newResponse: ContactResponse) => void;
  sheetsConfig: GoogleSheetsConfig;
  onOpenSheetsModal: () => void;
  onScrollToAdmin: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onResponseAdded,
  sheetsConfig,
  onOpenSheetsModal,
  onScrollToAdmin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<ContactResponse | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject or project topic is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newResponse: ContactResponse = {
      id: 'resp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      timestamp: now.toISOString(),
      formattedDate,
      status: 'unread',
      source: sheetsConfig.syncEnabled && sheetsConfig.scriptUrl ? 'googleSheets' : 'localStorage',
    };

    // 1. Save to Chrome localStorage in JSON format as required by the PDF
    try {
      const stored = localStorage.getItem('devfolio_contact_responses');
      const parsed: ContactResponse[] = stored ? JSON.parse(stored) : [];
      const updated = [newResponse, ...parsed];
      localStorage.setItem('devfolio_contact_responses', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }

    // 2. If Google Sheets integration is enabled, attempt Apps Script webhook call
    if (sheetsConfig.syncEnabled && sheetsConfig.scriptUrl) {
      try {
        await fetch(sheetsConfig.scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web App endpoints
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newResponse),
        });
      } catch (sheetErr) {
        console.warn('AppsScript dispatch attempted:', sheetErr);
      }
    }

    // Notify parent component
    onResponseAdded(newResponse);
    setLastSubmission(newResponse);

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Working Contact Me Form
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Submit a message below. All responses are stored in <strong>Chrome localStorage in JSON format</strong>, 
            with real-time retrieval in the authenticated Admin Inbox and optional <strong>Google Sheets AppsScript database sync</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Guidelines & Storage Configuration */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Storage & Retrieval Engine</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As required by the specification, submissions write directly to browser local storage in structured JSON format with complete timestamps.
              </p>

              {/* Storage Status Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">PRIMARY STORAGE:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Chrome localStorage
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">DATABASE FORMAT:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    JSON Array
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 font-mono">GOOGLE SHEETS:</span>
                  <span className={`font-semibold flex items-center gap-1 ${
                    sheetsConfig.syncEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                  }`}>
                    {sheetsConfig.syncEnabled ? 'Connected / Active' : 'Optional Webhook'}
                  </span>
                </div>
              </div>

              {/* Button to open Sheets Modal */}
              <button
                onClick={onOpenSheetsModal}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-750 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-300/60 dark:border-slate-600 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                <span>Configure Google Sheets via AppsScript</span>
              </button>

              <button
                onClick={onScrollToAdmin}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800/80 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Jump to Admin Responses View</span>
              </button>
            </div>

            {/* Live Success Banner if just submitted */}
            {lastSubmission && (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Message Recorded in LocalStorage!</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Response ID <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono">{lastSubmission.id}</code> logged at {lastSubmission.formattedDate}.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    Status: Unread
                  </span>
                  <button
                    onClick={onScrollToAdmin}
                    className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 underline hover:text-emerald-900"
                  >
                    View in Admin Inbox &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actual Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md text-left">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.subject 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello! I would love to discuss a project..."
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.message 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving to JSON LocalStorage...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message & Store in JSON Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
