import { Bell, Search, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const titles = {
  '/': 'Dashboard',
  '/meals': "Today's Intake",
  '/planner': 'Weekly Planner',
  '/recipes': 'Recipe Discovery',
  '/analytics': 'Performance Analytics',
  '/settings': 'Account Settings',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'NutriPlan';

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-[#becab9]/50 px-6 py-4 flex items-center gap-6">
      <div className="flex-1">
        <motion.div
          key={title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl font-extrabold text-[#171d16] tracking-tight">{title}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar size={12} className="text-[#006e1c]" />
            <p className="text-[11px] font-bold text-[#6f7a6b] uppercase tracking-wider">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center gap-3 bg-[#f5fbef] border border-[#becab9]/30 rounded-xl px-4 py-2 text-sm text-[#6f7a6b] w-64 hover:bg-white hover:border-[#4caf50]/50 hover:shadow-sm transition-all cursor-text group">
        <Search size={16} className="group-hover:text-[#4caf50] transition-colors" />
        <span className="font-medium">Search anything...</span>
        <kbd className="ml-auto hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#becab9]/50 bg-white text-[10px] font-bold text-[#becab9]">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#becab9]/30 hover:bg-[#eaf0e4] hover:border-[#4caf50]/50 text-[#3f4a3c] transition-all group shadow-sm active:scale-95"
          aria-label="Notifications"
        >
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#a63360] ring-2 ring-white" />
        </button>

        {/* User profile button */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white border border-[#becab9]/30 hover:shadow-md transition-all group active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            AJ
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[11px] font-bold text-[#171d16] leading-none">Alex J.</p>
            <p className="text-[9px] font-bold text-[#006e1c] uppercase tracking-tighter">Pro Plan</p>
          </div>
        </button>
      </div>
    </header>
  );
}
