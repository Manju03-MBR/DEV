import React, { useState } from 'react';
import { UserPlus, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { UserContactCard } from '../../types';

interface UserFormProps {
  onAddUser: (user: UserContactCard) => void;
}

const AVATAR_SEEDS = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Riley', 'Avery'
];

export const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    avatarSeed: AVATAR_SEEDS[0],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.role.trim()) {
      errs.role = 'Role / Title is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const skillsArray = formData.skills
      ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : ['React', 'JavaScript'];

    const newUser: UserContactCard = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: formData.name.trim(),
      role: formData.role.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+1 (555) 234-5678',
      bio: formData.bio.trim() || 'Frontend & UI developer passionate about building intuitive React experiences.',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.avatarSeed}`,
      skills: skillsArray,
      favorite: false,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onAddUser(newUser);

    // Reset form
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      bio: '',
      skills: '',
      avatarSeed: AVATAR_SEEDS[Math.floor(Math.random() * AVATAR_SEEDS.length)],
    });
    setErrors({});
  };

  const handleRandomSeed = () => {
    const random = AVATAR_SEEDS[Math.floor(Math.random() * AVATAR_SEEDS.length)];
    setFormData((prev) => ({ ...prev, avatarSeed: random }));
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-left">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-700/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Add New Contact
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              User Creation Form Component
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRandomSeed}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          title="Randomize avatar"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Random Avatar</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Avatar preview */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.avatarSeed}`}
            alt="Avatar preview"
            className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-slate-700 p-0.5"
          />
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Avatar Persona
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVATAR_SEEDS.slice(0, 5).map((seed) => (
                <button
                  type="button"
                  key={seed}
                  onClick={() => setFormData({ ...formData, avatarSeed: seed })}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer ${
                    formData.avatarSeed === seed
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {seed}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Connor"
              className={`w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-0.5">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Role / Designation <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. React Developer"
              className={`w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                errors.role ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
              }`}
            />
            {errors.role && <p className="text-[11px] text-rose-500 mt-0.5">{errors.role}</p>}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sarah@example.com"
              className={`w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
              }`}
            />
            {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555-0192"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, TypeScript, CSS3, GraphQL"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Short Bio
          </label>
          <textarea
            rows={2}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="A brief introduction about the contact..."
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Contact to UserList</span>
        </button>
      </form>
    </div>
  );
};
