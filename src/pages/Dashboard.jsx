import { useEffect } from 'react';
import { Flame, Droplets, Activity, TrendingUp, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import CalorieRing from '../components/ui/CalorieRing';
import NutritionBar from '../components/ui/NutritionBar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { useMealStore } from '../stores/mealStore';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const { healthGoal, isLoading: userLoading, fetchProfile, fetchGoal } = useUserStore();
  const {
    dailyTotals,
    weekPlanSummaries,
    isLoading: mealLoading,
    loadTodayData,
    fetchWeekPlans,
  } = useMealStore();
  const accountId = user?.id;

  useEffect(() => {
    if (accountId) {
      fetchProfile(accountId);
      fetchGoal(accountId);
      loadTodayData(accountId, getTodayStr());
      fetchWeekPlans(accountId, 0);
    }
  }, [accountId, fetchProfile, fetchGoal, loadTodayData, fetchWeekPlans]);

  const username = user?.username || 'Guest';
  const goalLabel = healthGoal?.goalType
    ? healthGoal.goalType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Maintain';

  const calories = {
    current: Math.round(dailyTotals.calories || 0),
    target: Math.round(healthGoal?.dailyCaloriesKcal || 2000),
  };
  const protein = {
    current: Math.round(dailyTotals.protein || 0),
    target: Math.round(healthGoal?.proteinGDay || 130),
  };
  const carbs = {
    current: Math.round(dailyTotals.carbs || 0),
    target: Math.round(healthGoal?.carbGDay || 220),
  };
  const fat = {
    current: Math.round(dailyTotals.fat || 0),
    target: Math.round(healthGoal?.fatGDay || 65),
  };
  const water = { current: 0, target: 8 };

  // Build weekly chart data from real DB data
  const weeklyCalories = dayLabels.map((label, idx) => {
    const d = new Date();
    const dow = d.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const date = new Date(d);
    date.setDate(d.getDate() + mondayOffset + idx);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const totals = weekPlanSummaries[dateStr];
    return { day: label, calories: Math.round(totals?.calories || 0), dateStr };
  });

  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const calPct = Math.min(100, Math.round((calories.current / (calories.target || 1)) * 100));

  // Compute streak from week data: consecutive days (ending today) with calories > 0
  let streak = 0;
  if (weeklyCalories[todayIdx]?.calories > 0) {
    for (let i = todayIdx; i >= 0; i--) {
      if (weeklyCalories[i].calories > 0) streak++;
      else break;
    }
  }

  // Trend helpers
  const proteinTrend = protein.target ? Math.round((protein.current / protein.target) * 100) : 0;
  const waterLeft = Math.max(0, water.target - water.current);

  const avgWeekly = weeklyCalories.length
    ? Math.round(weeklyCalories.reduce((s, d) => s + d.calories, 0) / weeklyCalories.length)
    : 0;

  const isLoading = userLoading || mealLoading;

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

  if (isLoading && !healthGoal) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-[#4caf50]" size={32} />
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold mb-1">{username} 👋</h2>
        <p className="text-sm opacity-80">
          🔥 {streak}-day streak · {goalLabel} goal
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
        <StatCard title="Calories" value={`${calories.current}`} subtitle={`Target: ${calories.target}`} icon={Flame} trend={`${calPct}%`} trendUp={calPct >= 100} accent="#4caf50" />
        <StatCard title="Protein" value={`${protein.current}g`} subtitle={`Target: ${protein.target}g`} icon={Zap} trend={`${proteinTrend}%`} trendUp={proteinTrend >= 100} accent="#006e1c" />
        <StatCard title="Water" value={`${water.current} cups`} subtitle={`Target: ${water.target}`} icon={Droplets} trend={`${waterLeft} left`} trendUp={false} accent="#0061a4" />
        <StatCard title="Active Streak" value={`${streak} days`} subtitle={streak > 0 ? 'Keep it up!' : 'Start your journey'} icon={Activity} trend={`${streak > 0 ? '+' : ''}${streak}`} trendUp={streak > 0} accent="#a63360" />
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
              <YAxis hide />
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
            <span className="ml-auto flex items-center gap-1.5"><TrendingUp size={12} /> Average: {avgWeekly} kcal</span>
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
