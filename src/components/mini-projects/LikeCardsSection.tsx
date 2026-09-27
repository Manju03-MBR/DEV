import React, { useState } from 'react';
import { Heart, Plus, Code, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { LikeCardItem } from '../../types';
import { LikeCard } from './LikeCard';

interface LikeCardsSectionProps {
  cardItems: LikeCardItem[]; // Passed from App.tsx as required
  onAddCardTitle: (title: string, category: string, description: string) => void;
}

export const LikeCardsSection: React.FC<LikeCardsSectionProps> = ({
  cardItems,
  onAddCardTitle,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [showAddModal, setShowAddModal] = useState(false);

  // Parent tracking of liked items for the section statistics
  const [likedMap, setLikedMap] = useState<{ [title: string]: boolean }>(() => {
    const initial: { [title: string]: boolean } = {};
    cardItems.forEach((c) => {
      initial[c.title] = c.initialLiked;
    });
    return initial;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'liked' | 'notLiked'>('all');

  const handleLikeStateChange = (title: string, isLiked: boolean) => {
    setLikedMap((prev) => ({ ...prev, [title]: isLiked }));
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddCardTitle(
      newTitle.trim(),
      newCategory,
      'Custom card component created dynamically and receiving title prop from App file.'
    );
    setNewTitle('');
    setShowAddModal(false);
  };

  const totalCards = cardItems.length;
  const likedCount = Object.values(likedMap).filter(Boolean).length;
  const notLikedCount = totalCards - likedCount;

  const filteredCards = cardItems.filter((item) => {
    const isLiked = likedMap[item.title] ?? item.initialLiked;
    if (activeFilter === 'liked') return isLiked;
    if (activeFilter === 'notLiked') return !isLiked;
    return true;
  });

  return (
    <section id="mini-project" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
            <span>REACT MINI PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            React Mini Project: Like / Unlike Cards
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Card components receiving <strong>title props passed from App file</strong>, with <strong>liked / Not liked dynamic labels</strong> and like buttons handling state via the <strong>useState Hook</strong>.
          </p>
        </div>

        {/* Toolbar & Live Stats */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
          
          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xs font-mono text-slate-700 dark:text-slate-300">
              Total Cards: <span className="font-bold text-slate-900 dark:text-white">{totalCards}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs font-mono text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40">
              Liked ❤️: <span className="font-bold">{likedCount}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xs font-mono text-slate-600 dark:text-slate-400">
              Not Liked 🤍: <span className="font-bold">{notLikedCount}</span>
            </div>
          </div>

          {/* Action buttons & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
              {(['all', 'liked', 'notLiked'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveFilter(mode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-colors ${
                    activeFilter === mode
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {mode === 'notLiked' ? 'Not Liked' : mode}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCode(!showCode)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-indigo-500" />
              <span>{showCode ? 'Hide Code' : 'View Code'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Title Prop Card</span>
            </button>
          </div>
        </div>

        {/* Code Drawer (Show/Hide) */}
        {showCode && (
          <div className="mb-8 p-6 rounded-2xl bg-slate-900 text-white font-mono text-xs border border-slate-800 shadow-xl text-left animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-slate-400 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-rose-400" />
                <span>React useState Hook & Props Implementation</span>
              </span>
              <span className="text-emerald-400 text-[11px]">Strict Compliance</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed">
              <code>
{`// 1. App.tsx passes different titles to the LikeCard component:
<LikeCard 
  title="React Component Architecture" 
  initialLiked={false} 
/>

// 2. LikeCard.tsx handles title prop and internal state via useState Hook:
export const LikeCard = ({ title, initialLiked }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  return (
    <div className="card">
      <span className="badge">{isLiked ? 'Liked ❤️' : 'Not Liked 🤍'}</span>
      <h3>{title}</h3>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
};`}
              </code>
            </pre>
          </div>
        )}

        {/* Cards Grid: Render LikeCard components with title props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <LikeCard
              key={card.id || card.title}
              id={card.id}
              title={card.title} // Prop passed from App file as required
              description={card.description}
              category={card.category}
              tags={card.tags}
              initialLiked={card.initialLiked}
              onLikeStateChange={handleLikeStateChange}
            />
          ))}
        </div>

        {/* Add Card Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 text-left">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                Pass New Card Title from App
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                This adds a new item to the App state which renders another LikeCard with your title prop.
              </p>

              <form onSubmit={handleCreateCard} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Card Title (Passed as Prop)
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Next.js Server Components"
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="React Ecosystem">React Ecosystem</option>
                    <option value="State Management">State Management</option>
                    <option value="Backend Integration">Backend Integration</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  >
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
