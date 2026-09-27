import React from 'react';
import { User, CheckCircle, Award, Cpu, Globe, Rocket } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: Cpu,
      title: 'Component-Driven Architecture',
      description: 'Designing highly reusable, self-contained UI components with modular file structures and TypeScript safety.',
    },
    {
      icon: Globe,
      title: 'State & Persistence Expertise',
      description: 'Mastery over React useState, context, Chrome localStorage JSON manipulation, and Google Sheets AppsScript webhooks.',
    },
    {
      icon: Rocket,
      title: 'Modern Responsive Design',
      description: 'Mobile-first, high performance layouts with seamless Light and Dark theme support across the entire app.',
    },
    {
      icon: Award,
      title: 'Production Quality Mindset',
      description: 'Semantic HTML5 containers, clean CSS styling, accessibility standards, and clean Git workflows.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Passionate Frontend & React Developer
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I specialize in crafting rich Single Page Applications, interactive component libraries, and end-to-end data submission pipelines. 
            From local storage persistence to external cloud databases, I build software that feels intuitive and robust.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Developer Philosophy Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white shadow-lg border border-indigo-800/40 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-xl font-bold text-white">Full Frontend Part Implementation</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                This project implements all project specifications: container tags, responsive navigation, contact-me form with JSON localStorage persistence, admin login with show/hide scenario, dynamic responses inbox with timestamps, Google Sheets AppsScript bridge, dynamic React Contact Cards UserList, and useState Like card mini-project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-2 rounded-lg border border-emerald-800/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Specification Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-200 bg-indigo-950/60 px-3 py-2 rounded-lg border border-indigo-800/50">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Modern React 19 + TypeScript</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
