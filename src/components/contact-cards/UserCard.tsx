import React from 'react';
import { Mail, Phone, Star, Trash2, Shield, Calendar, Sparkles } from 'lucide-react';
import { UserContactCard } from '../../types';

interface UserCardProps {
  user: UserContactCard;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onDelete,
  onToggleFavorite,
}) => {
  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-5 shadow-xs hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between text-left">
      <div>
        {/* Top bar: Avatar + Names + Actions */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-13 h-13 rounded-2xl object-cover border-2 border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-slate-700 shadow-xs"
                onError={(e) => {
                  // Fallback avatar
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`;
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                {user.name}
              </h4>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {user.role}
              </p>
            </div>
          </div>

          {/* Favorite & Delete Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(user.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                user.favorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={user.favorite ? 'Favorited' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${user.favorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Delete Contact Card"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            {user.bio}
          </p>
        )}

        {/* Contact details */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <a href={`mailto:${user.email}`} className="truncate hover:underline hover:text-indigo-600 dark:hover:text-indigo-400">
              {user.email}
            </a>
          </div>
          {user.phone && (
            <div className="flex items-center gap-2 truncate">
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <a href={`tel:${user.phone}`} className="truncate hover:underline">
                {user.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Skills chips & creation date */}
      <div>
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {user.createdAt}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Active Contact
          </span>
        </div>
      </div>
    </div>
  );
};
