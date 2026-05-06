import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UtensilsCrossed, Tag, MessageSquare,
  ArrowLeft, Menu, X, ShieldCheck, LogOut, History
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';

const adminNav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/dishes', label: 'Dishes', icon: UtensilsCrossed },
  { path: '/admin/categories', label: 'Categories', icon: Tag },
  { path: '/admin/feedbacks', label: 'Feedbacks', icon: MessageSquare },
  { path: '/admin/audit-logs', label: 'Audit Logs', icon: History },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f6f9f3] flex">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#171d16]"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-[#becab9]/30 flex flex-col transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#eaf0e4]">
          <div className="w-10 h-10 rounded-xl bg-[#171d16] flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-black text-[#171d16] text-lg tracking-tighter">Admin</p>
            <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-widest">Panel</p>
          </div>
        </div>

        <button
          onClick={() => { navigate('/'); setMobileOpen(false); }}
          className="mx-4 mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef] transition-all"
        >
          <ArrowLeft size={16} /> Back to App
        </button>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {adminNav.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/admin'}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                  isActive
                    ? 'text-[#006e1c] bg-[#f5fbef]'
                    : 'text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef]/50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#006e1c]' : ''} />
                <span>{label}</span>
                {isActive && (
                  <motion.div layoutId="admin-nav-active" className="absolute left-0 w-1 h-6 bg-[#006e1c] rounded-r-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#eaf0e4]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6] transition-all font-bold text-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
