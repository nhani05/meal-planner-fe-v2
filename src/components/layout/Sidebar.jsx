import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, CalendarDays,
  BookOpen, BarChart3, Settings, Leaf,
  ChevronLeft, ChevronRight, LogOut, ShieldCheck,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';

const navItems = [
  { path: '/dashboard', labelKey: 'nav.dashboard', shortKey: 'nav.dashboard', icon: LayoutDashboard },
  { path: '/meals', labelKey: 'nav.todaysMeals', shortKey: 'nav.todaysMeals', icon: UtensilsCrossed },
  { path: '/planner', labelKey: 'nav.mealPlanner', shortKey: 'nav.mealPlanner', icon: CalendarDays },
  { path: '/recipes', labelKey: 'nav.recipes', shortKey: 'nav.recipes', icon: BookOpen },
  { path: '/templates', labelKey: 'nav.templates', shortKey: 'nav.templates', icon: FileText },
  { path: '/analytics', labelKey: 'nav.analytics', shortKey: 'nav.analytics', icon: BarChart3 },
  { path: '/settings', labelKey: 'nav.settings', shortKey: 'nav.settings', icon: Settings },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        className="hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-[#becab9]/30 transition-all z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center shrink-0 shadow-lg shadow-[#4caf50]/20">
            <Leaf size={20} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-black text-[#171d16] text-xl tracking-tighter">
                  Nutri<span className="text-[#006e1c]">Plan</span>
                </span>
                <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-widest leading-none mt-0.5">{t('brand.tagline')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map(({ path, labelKey, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group relative ${
                  isActive
                    ? 'text-[#006e1c] bg-[#f5fbef]'
                    : 'text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef]/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#006e1c]' : ''}`} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap"
                      >
                        {t(labelKey)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute left-0 w-1 h-6 bg-[#006e1c] rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group relative ${
                  isActive
                    ? 'text-[#006e1c] bg-[#f5fbef]'
                    : 'text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef]/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ShieldCheck size={20} className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#006e1c]' : ''}`} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap"
                      >
                        {t('nav.admin')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute left-0 w-1 h-6 bg-[#006e1c] rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          )}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#eaf0e4]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef] transition-all font-bold text-sm mb-2"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span>{t('nav.collapseMenu')}</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6] transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            {!collapsed && <span>{t('nav.logout')}</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-[#becab9]/30 z-30 flex py-1 px-2 safe-bottom">
        {navItems.slice(0, 5).map(({ path, shortKey, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/dashboard'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 px-1 gap-1 text-[10px] font-black uppercase tracking-tighter transition-all ${
                isActive ? 'text-[#006e1c]' : 'text-[#6f7a6b]'
              }`
            }
          >
            <div className={`p-1.5 rounded-lg transition-colors ${path === location.pathname ? 'bg-[#eaf0e4]' : ''}`}>
              <Icon size={20} />
            </div>
            <span>{t(shortKey).split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
