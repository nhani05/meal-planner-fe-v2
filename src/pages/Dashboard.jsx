import { Flame, Droplets, Activity, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import CalorieRing from '../components/ui/CalorieRing';
import NutritionBar from '../components/ui/NutritionBar';
import { useApp } from '../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#becab9] rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-[#171d16]">{label}</p>
        <p className="text-[#006e1c]">{payload[0].value} kcal</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user, nutrition, weeklyCalories } = useApp();
  const { calories, protein, carbs, fat, water } = nutrition;
  
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const calPct = Math.round((calories.current / calories.target) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Greeting */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-[#006e1c] to-[#4caf50] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg"
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/5" />
        <p className="text-sm font-medium opacity-80 mb-1">Good morning,</p>
        <h2 className="text-2xl font-bold mb-1">{user.name} 👋</h2>
        <p className="text-sm opacity-80">
          🔥 {user.streak}-day streak · {user.goal} goal
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <span className="text-xs font-semibold opacity-90">
            {calPct}% of daily goal
          </span>
        </div>
      </motion.div>

      {/* Stat row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Calories" value={`${calories.current}`} subtitle={`Target: ${calories.target}`} icon={Flame} trend="8%" trendUp={false} accent="#4caf50" />
        <StatCard title="Protein" value={`${protein.current}g`} subtitle={`Target: ${protein.target}g`} icon={Zap} trend="5%" trendUp={true} accent="#006e1c" />
        <StatCard title="Water" value={`${water.current} cups`} subtitle={`Target: ${water.target}`} icon={Droplets} trend={`${Math.max(0, water.target - water.current)} left`} trendUp={false} accent="#0061a4" />
        <StatCard title="Active Streak" value={`${user.streak} days`} subtitle="Top 5% of users" icon={Activity} trend="14%" trendUp={true} accent="#a63360" />
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie ring + macros */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#becab9] shadow-card p-6 space-y-6">
          <h3 className="font-bold text-[#171d16] text-sm">Today's Nutrition</h3>
          <div className="flex justify-center py-2">
            <CalorieRing current={calories.current} target={calories.target} />
          </div>
          <div className="space-y-4">
            <NutritionBar label="Protein" current={protein.current} target={protein.target} color="#4caf50" />
            <NutritionBar label="Carbohydrates" current={carbs.current} target={carbs.target} color="#33a0fd" />
            <NutritionBar label="Fat" current={fat.current} target={fat.target} color="#f26f9d" />
          </div>
        </motion.div>

        {/* Weekly bar chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl border border-[#becab9] shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#171d16] text-sm">Weekly Progress</h3>
            <span className="text-[10px] font-bold text-[#006e1c] bg-[#eaf0e4] px-2.5 py-1 rounded-full uppercase tracking-wider">7-Day Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyCalories} barSize={32}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6f7a6b', fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[1400, 2200]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0f6ea', radius: 8 }} />
              <Bar dataKey="calories" radius={[8, 8, 0, 0]}>
                {weeklyCalories.map((_, i) => (
                  <Cell key={i} fill={i === todayIdx ? '#4caf50' : '#dee4d9'} className="transition-all duration-300 hover:opacity-80" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 flex items-center gap-6 text-[10px] text-[#6f7a6b] font-medium border-t border-[#eaf0e4] pt-4">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#4caf50]" />Today</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#dee4d9]" />Other days</span>
            <span className="ml-auto flex items-center gap-1.5"><TrendingUp size={12} /> Average: {Math.round(weeklyCalories.reduce((s, d) => s + d.calories, 0) / 7)} kcal</span>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-[#becab9] shadow-card p-6">
        <h3 className="font-bold text-[#171d16] text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Log Meal', emoji: '🍽️', href: '/meals', color: '#eaf0e4' },
            { label: 'Browse Recipes', emoji: '📖', href: '/recipes', color: '#d1e4ff' },
            { label: 'Plan Week', emoji: '📅', href: '/planner', color: '#f0f6ea' },
            { label: 'Settings', emoji: '⚙️', href: '/settings', color: '#dee4d9' },
          ].map(({ label, emoji, color }) => (
            <button
              key={label}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-xs font-bold text-[#171d16]">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
