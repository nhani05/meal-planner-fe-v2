import { useState, useEffect } from 'react';
import { Users, UtensilsCrossed, CalendarCheck, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import * as adminApi from '../../api/adminApi';
import { useUiStore } from '../../stores/uiStore';

const statCards = [
  { key: 'totalUsers', label: 'Total Users', icon: Users, color: '#0061a4', bg: '#d1e4ff' },
  { key: 'totalDishes', label: 'Total Dishes', icon: UtensilsCrossed, color: '#4caf50', bg: '#eaf0e4' },
  { key: 'activePlansToday', label: 'Active Plans Today', icon: CalendarCheck, color: '#a63360', bg: '#ffd9e1' },
  { key: 'newFeedbacks', label: 'New Feedbacks', icon: MessageSquare, color: '#ff8f00', bg: '#ffecb3' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStatistics()
      .then((res) => setStats(res.data))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message || 'Failed to load statistics';
        useUiStore.getState().showToast(msg, 'error');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-[#171d16]">Dashboard</h1>
        <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Admin overview</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#becab9]/30 p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ key, label, icon: Icon, color, bg }, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-[#becab9]/30 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-widest">{label}</p>
              </div>
              <p className="text-3xl font-black" style={{ color }}>
                {stats?.[key] ?? 0}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
