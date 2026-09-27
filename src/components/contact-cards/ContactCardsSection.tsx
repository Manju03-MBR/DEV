import React, { useState, useEffect } from 'react';
import { Users, Sparkles, FolderTree, Code, Layers } from 'lucide-react';
import { UserContactCard } from '../../types';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

const INITIAL_USERS: UserContactCard[] = [
  {
    id: 'usr_1',
    name: 'Emily Watson',
    role: 'Lead UI/UX Engineer',
    email: 'emily.watson@designlabs.io',
    phone: '+1 (555) 345-9876',
    bio: 'Specializing in design systems, accessible React components, and responsive mobile interfaces.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    skills: ['React', 'Figma', 'Tailwind', 'Accessibility'],
    favorite: true,
    createdAt: 'Sep 25, 2026',
  },
  {
    id: 'usr_2',
    name: 'Marcus Chen',
    role: 'Full Stack JavaScript Architect',
    email: 'marcus.chen@cloudnode.dev',
    phone: '+1 (555) 789-1234',
    bio: 'Building enterprise React applications, serverless functions, and resilient state pipelines.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    favorite: false,
    createdAt: 'Sep 26, 2026',
  },
  {
    id: 'usr_3',
    name: 'Sophia Patel',
    role: 'Frontend Performance Specialist',
    email: 'sophia.patel@speedcraft.org',
    phone: '+1 (555) 890-4321',
    bio: 'Obsessed with Web Vitals, micro-interactions, and modular frontend directory design.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    skills: ['React 19', 'Next.js', 'Vite', 'CSS Architecture'],
    favorite: true,
    createdAt: 'Sep 27, 2026',
  },
];

export const ContactCardsSection: React.FC = () => {
  const [users, setUsers] = useState<UserContactCard[]>(() => {
    try {
      const saved = localStorage.getItem('devfolio_contact_cards');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('devfolio_contact_cards', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save contact cards:', e);
    }
  }, [users]);

  const handleAddUser = (newUser: UserContactCard) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, favorite: !u.favorite } : u))
    );
  };

  const handleResetDefaultUsers = () => {
    setUsers(INITIAL_USERS);
  };

  return (
    <section id="contact-cards" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>REACT SPA PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            React Components Contact Cards
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A modular Single Page Application taking input for user creation and dynamically appending interactive cards into a parent <code className="font-mono text-violet-600 dark:text-violet-400">UserList</code> component on the same page.
          </p>
        </div>

        {/* Modular Architecture Callout */}
        <div className="mb-10 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-left">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <FolderTree className="w-4 h-4 text-violet-500" />
            <span className="font-semibold">MODULAR FOLDER STRUCTURE:</span>
            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-violet-700 dark:text-violet-300">
              src/components/contact-cards/
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded">UserForm.tsx</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded font-semibold text-slate-700 dark:text-slate-200">UserList.tsx (Parent)</span>
            <span>&rarr;</span>
            <span className="bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded">UserCard.tsx</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: UserForm (Left) & Parent UserList (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* User Creation Form */}
          <div className="lg:col-span-5">
            <UserForm onAddUser={handleAddUser} />
          </div>

          {/* Parent UserList Component */}
          <div className="lg:col-span-7">
            <UserList
              users={users}
              onDeleteUser={handleDeleteUser}
              onToggleFavorite={handleToggleFavorite}
              onResetDefaultUsers={handleResetDefaultUsers}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
