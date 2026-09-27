import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: 'Senior Frontend & React Developer',
      company: 'TechCraft Solutions',
      location: 'San Francisco, CA (Hybrid)',
      period: '2023 - Present',
      description: 'Leading client web application development with React, TypeScript, and modern component systems.',
      achievements: [
        'Architected single-page applications (SPAs) with modular folder structures and reusable component patterns.',
        'Engineered responsive contact forms with resilient browser localStorage caching and Google Sheets webhook integration.',
        'Implemented comprehensive light and dark theme systems with zero-flicker CSS and persistent user preferences.',
        'Maintained 99.8% client satisfaction through semantic HTML5, fast performance, and clean code standards.',
      ],
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'AppsScript', 'Vite', 'Git'],
    },
    {
      role: 'Frontend Web Developer',
      company: 'Digital Nexus Labs',
      location: 'Austin, TX',
      period: '2021 - 2023',
      description: 'Developed responsive client-facing web applications, interactive admin portals, and data visualization dashboards.',
      achievements: [
        'Built secure admin authentication flows with CSS/JS show-hide scenarios and dynamic inquiry management.',
        'Integrated Google Apps Script REST endpoints to synchronize web submissions directly into Google Sheets databases.',
        'Developed interactive user contact card components with live search, filters, and dynamic DOM rendering.',
        'Created mini interactive UI widgets utilizing useState, custom hooks, and event-driven patterns.',
      ],
      technologies: ['JavaScript ES6+', 'React', 'HTML5/CSS3', 'REST APIs', 'LocalStorage', 'Bootstrap'],
    },
    {
      role: 'Junior Web Developer',
      company: 'InnoSpark Media',
      location: 'Remote',
      period: '2020 - 2021',
      description: 'Focused on UI design implementation, semantic HTML container hierarchy, and cross-browser compatibility.',
      achievements: [
        'Converted wireframes and UI specs into pixel-perfect responsive layouts with CSS Grid and Flexbox.',
        'Assisted in setting up automated deployment pipelines to GitHub Pages with custom domains.',
        'Created interactive forms with client-side validation and formatted JSON local data storage.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages'],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Work Experience
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Proven track record of building production-ready frontend architectures and engaging interactive web experiences.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-indigo-200 dark:border-slate-700 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 text-left">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 dark:border-indigo-400 group-hover:scale-125 transition-transform" />

              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-shadow">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <ul className="space-y-2 mb-6">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
