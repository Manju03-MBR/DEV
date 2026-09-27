import React, { useState } from 'react';
import { Users, Search, Star, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { UserContactCard } from '../../types';
import { UserCard } from './UserCard';

interface UserListProps {
  users: UserContactCard[];
  onDeleteUser: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onResetDefaultUsers: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onDeleteUser,
  onToggleFavorite,
  onResetDefaultUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFav = showFavoritesOnly ? user.favorite : true;
    return matchesSearch && matchesFav;
  });

  const favoritesCount = users.filter((u) => u.favorite).length;

  return (
    <div className="space-y-6 text-left">
      {/* Parent UserList Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <span>Parent UserList Component</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-mono font-semibold">
                  {users.length} {users.length === 1 ? 'Contact' : 'Contacts'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dynamically populated contact cards component
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                showFavoritesOnly
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-white' : ''}`} />
              <span>Favorites ({favoritesCount})</span>
            </button>

            <button
              onClick={onResetDefaultUsers}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Reset default contacts"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contact cards by name, title, or skills..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Dynamic Cards Grid */}
      {filteredUsers.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">No contacts to display</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {users.length === 0
              ? 'Use the form to create your first contact card, or click Reset.'
              : 'No contact cards match your search criteria.'}
          </p>
          {users.length === 0 && (
            <button
              onClick={onResetDefaultUsers}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Load Sample Contacts
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={onDeleteUser}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
