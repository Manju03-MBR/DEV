import React from 'react';
import { ArrowRight, Download, Send, Sparkles, Github, Linkedin, Mail, CheckCircle2, Terminal } from 'lucide-react';

interface HeroProps {
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToContact }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Decorative gradient background blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for Frontend & Full-Stack Roles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Building scalable, modular web apps with{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
                React & Modern JavaScript
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Welcome to my portfolio! This project features a full resume showcase, working contact form with 
              <span className="font-semibold text-slate-900 dark:text-white"> localStorage</span> & 
              <span className="font-semibold text-slate-900 dark:text-white"> Google Sheets</span> response retrieval, 
              an <span className="font-semibold text-slate-900 dark:text-white">Admin Response Inbox</span> with show/hide authentication, 
              a dynamic <span className="font-semibold text-slate-900 dark:text-white">React Contact Cards SPA</span>, and 
              a <span className="font-semibold text-slate-900 dark:text-white">useState Like Cards Lab</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToContact}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Get in Touch</span>
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact-cards"
                className="px-5 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>React Contact Cards SPA</span>
              </a>
            </div>

            {/* Socials & Quick Tech Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-700 dark:text-slate-300">CORE TECH:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">React 19</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">HTML5 / CSS3</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code & Profile Summary Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-white shadow-2xl border border-slate-800 overflow-hidden text-left">
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" /> developer-profile.json
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                  Ready to Deploy
                </span>
              </div>

              {/* Code Snippet Display */}
              <pre className="text-xs font-mono text-slate-300 space-y-1 overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-indigo-400">const</span> developer = &#123;{'\n'}
                  {'  '}name: <span className="text-emerald-300">"Alex Morgan"</span>,{'\n'}
                  {'  '}role: <span className="text-emerald-300">"Frontend & React Engineer"</span>,{'\n'}
                  {'  '}specialties: [<span className="text-amber-300">"React SPA"</span>, <span className="text-amber-300">"UI Components"</span>, <span className="text-amber-300">"AppsScript"</span>],{'\n'}
                  {'  '}storageMethods: [<span className="text-sky-300">"Chrome localStorage"</span>, <span className="text-sky-300">"Google Sheets"</span>],{'\n'}
                  {'  '}stateHooks: [<span className="text-violet-300">"useState"</span>, <span className="text-violet-300">"useEffect"</span>, <span className="text-violet-300">"useContext"</span>],{'\n'}
                  {'  '}status: <span className="text-emerald-400">"Building high quality web apps"</span>{'\n'}
                  &#125;;
                </code>
              </pre>

              {/* Quick interactive achievements */}
              <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-bold text-white">4+</div>
                  <div className="text-[11px] text-slate-400">Years Exp</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-bold text-indigo-400">25+</div>
                  <div className="text-[11px] text-slate-400">Projects</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-lg font-bold text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400">Clean Code</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
