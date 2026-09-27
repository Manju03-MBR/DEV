import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';

export const Education: React.FC = () => {
  const degrees = [
    {
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      institution: 'University of Technology & Science',
      period: '2017 - 2021',
      details: 'Graduated with Honors. Specialized in Software Architecture, Web Development, and Distributed Systems.',
      highlights: ['Algorithms & Data Structures', 'Modern Web Technologies', 'Database Management'],
    },
  ];

  const certifications = [
    {
      name: 'Meta Certified Frontend Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      year: '2023',
      id: 'META-FE-89241',
    },
    {
      name: 'Advanced React & Component Design Patterns',
      issuer: 'Frontend Masters',
      year: '2022',
      id: 'FM-REACT-3110',
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      year: '2021',
      id: 'FCC-JS-9021',
    },
  ];

  return (
    <section id="education" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education & Certifications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Solid computer science foundation backed by verified professional credentials in modern frontend engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Degree Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Degree Education</span>
            </h3>

            {degrees.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                    {item.period}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">B.Tech / CS</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.degree}
                </h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                  {item.institution}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {item.details}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-2">
                  {item.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Industry Certifications</span>
            </h3>

            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Issued by <span className="font-medium text-slate-700 dark:text-slate-300">{cert.issuer}</span> • {cert.year}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/40">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
