import React, { useState } from 'react';
import { Code2, Layout, Database, Wrench, Layers } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // percentage
  tags: string[];
}

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'storage' | 'tools'>('all');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Layers },
    { id: 'frontend', label: 'Frontend & React', icon: Layout },
    { id: 'storage', label: 'State & Storage', icon: Database },
    { id: 'tools', label: 'Tools & Deployments', icon: Wrench },
  ];

  const skills: { category: string; item: SkillItem }[] = [
    { category: 'frontend', item: { name: 'JavaScript (ES6+) & DOM', level: 95, tags: ['Modern JS', 'Event Handling', 'Async/Await'] } },
    { category: 'frontend', item: { name: 'React & Component Architecture', level: 92, tags: ['Functional Components', 'SPA', 'Props & State'] } },
    { category: 'frontend', item: { name: 'HTML5 Semantic Containers', level: 98, tags: ['<section>', '<nav>', '<main>', '<header>'] } },
    { category: 'frontend', item: { name: 'CSS3 & Tailwind CSS', level: 94, tags: ['Responsive', 'Flexbox/Grid', 'Dark Mode'] } },
    { category: 'frontend', item: { name: 'React Hooks (useState, useEffect)', level: 92, tags: ['State Management', 'Component Lifecycle'] } },
    
    { category: 'storage', item: { name: 'Chrome localStorage (JSON)', level: 96, tags: ['JSON.stringify', 'JSON.parse', 'Persistence'] } },
    { category: 'storage', item: { name: 'Google Sheets & AppsScript API', level: 88, tags: ['doPost()', 'Webhook Endpoints', 'Spreadsheet DB'] } },
    { category: 'storage', item: { name: 'REST APIs & Fetch Pipelines', level: 90, tags: ['HTTP Requests', 'Payload Handling', 'Error Catching'] } },
    
    { category: 'tools', item: { name: 'GitHub & GitHub Pages Deployment', level: 92, tags: ['gh-pages', 'CI/CD Workflow', 'Git CLI'] } },
    { category: 'tools', item: { name: 'Vite & Modern Build Tools', level: 90, tags: ['Fast Refresh', 'Bundling', 'Dev Server'] } },
    { category: 'tools', item: { name: 'TypeScript & Type Safety', level: 88, tags: ['Interfaces', 'Generics', 'Strict Mode'] } },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Engineered with modern frontend methodologies, component separation, and resilient storage solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredSkills.map(({ item }, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {item.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
