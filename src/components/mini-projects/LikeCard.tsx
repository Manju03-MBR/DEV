import React, { useState } from 'react';
import { Heart, Sparkles, Tag } from 'lucide-react';

export interface LikeCardProps {
  id?: string;
  title: string; // Passed as prop from App file as required
  description?: string;
  category?: string;
  tags?: string[];
  initialLiked?: boolean;
  onLikeStateChange?: (title: string, isLiked: boolean) => void;
}

/**
 * React Mini Project - Card Component
 * - Receives `title` prop passed from App / parent component
 * - Contains `liked` / `Not liked` label
 * - Contains Like button
 * - State variable to show like/unlike handled by `useState` Hook
 */
export const LikeCard: React.FC<LikeCardProps> = ({
  id,
  title,
  description = 'Interactive React component demonstrating stateful UI interactions and prop passing.',
  category = 'React Feature',
  tags = ['useState', 'React Props', 'Hooks'],
  initialLiked = false,
  onLikeStateChange,
}) => {
  // State variable to show like/unlike handled by useState Hook as required by the PDF
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLiked ? 1 : 0);
  const [animating, setAnimating] = useState(false);

  const handleToggleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikeCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    
    // Trigger pop animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (onLikeStateChange) {
      onLikeStateChange(title, nextState);
    }
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between group ${
      isLiked
        ? 'bg-gradient-to-b from-rose-50/70 to-white dark:from-rose-950/20 dark:to-slate-800 border-rose-200 dark:border-rose-900/60 shadow-md ring-1 ring-rose-500/20'
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600'
    }`}>
      <div>
        {/* Top Meta: Category + Liked / Not Liked dynamic Label */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {category}
          </span>

          {/* Liked / Not Liked label handled by useState Hook */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
              isLiked
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiked ? 'bg-rose-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{isLiked ? 'Liked ❤️' : 'Not Liked 🤍'}</span>
          </span>
        </div>

        {/* Title passed as prop from App file */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Row: Like button + State feedback */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>State: </span>
          <code className={`font-bold ${isLiked ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`}>
            useState({isLiked ? 'true' : 'false'})
          </code>
        </div>

        {/* Like Button toggling useState */}
        <button
          onClick={handleToggleLike}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isLiked
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/25'
              : 'bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
          }`}
          title={isLiked ? 'Click to Unlike' : 'Click to Like'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${animating ? 'scale-125' : 'scale-100'} transition-transform ${
              isLiked ? 'fill-white stroke-white' : ''
            }`}
          />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
          {likeCount > 0 && <span className="opacity-90 font-mono">({likeCount})</span>}
        </button>
      </div>
    </div>
  );
};
