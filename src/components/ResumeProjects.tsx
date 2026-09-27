import React from 'react';
import { FolderGit2, ExternalLink, Github, Sparkles, Database, Heart, Users, Check } from 'lucide-react';

export const ResumeProjects: React.FC = () => {
  const projects = [
    {
      id: 'contact-engine',
      title: 'Contact Form & Response Retrieval Engine',
      description: 'End-to-end user inquiry system saving submissions in JSON format to Chrome localStorage with real-time timestamps. Features an authenticated Admin inbox with show/hide scenario and Google Sheets AppsScript bridge.',
      tags: ['JavaScript', 'HTML5/CSS3', 'localStorage', 'AppsScript', 'JSON'],
      liveTarget: '#contact',
      badge: 'Core Requirement',
      icon: Database,
      metrics: 'Zero-latency JSON persistence & sync',
    },
    {
      id: 'react-cards-spa',
      title: 'React Modular Contact Cards SPA',
      description: 'Single Page Application allowing input for user creation and dynamically appending interactive contact cards into a parent UserList component. Built with clean modular folder architecture.',
      tags: ['React 19', 'Reusable Components', 'UserList Parent', 'SPA', 'TypeScript'],
      liveTarget: '#contact-cards',
      badge: 'React Project',
      icon: Users,
      metrics: 'Dynamic DOM updates & modular components',
    },
    {
      id: 'like-cards-lab',
      title: 'React useState Mini Project: Like Cards',
      description: 'Modular card component receiving title props from App parent. Features dynamic liked/not liked status label, heart toggle animation, and reactive state management powered by React useState Hook.',
      tags: ['React Hooks', 'useState', 'Props passing', 'Stateful UI'],
      liveTarget: '#mini-project',
      badge: 'React Mini Project',
      icon: Heart,
      metrics: 'Instant state reflection & counters',
    },
    {
      id: 'gh-pages-deploy',
      title: 'GitHub Pages Automated Deployment',
      description: 'Public deployment pipeline configuration guide for building and serving the static portfolio application on GitHub Pages with custom domain and continuous delivery.',
      tags: ['Git', 'GitHub Pages', 'Vite Build', 'CI/CD'],
      liveTarget: '#deployment',
      badge: 'DevOps / Deployment',
      icon: FolderGit2,
      metrics: '100% public static hosting guide',
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Projects & Labs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Interactive applications and functional architectures built to specification. Click to test live in this app!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold font-mono px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                      {proj.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Highlights/metrics */}
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40 mb-6">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Interactive on this page
                  </span>
                  <a
                    href={proj.liveTarget}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Launch / Test Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
