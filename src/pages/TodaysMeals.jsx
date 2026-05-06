import { Plus, Droplets, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import MealCard from '../components/ui/MealCard';
import NutritionBar from '../components/ui/NutritionBar';
import LogMealModal from '../components/ui/LogMealModal';
import { useState } from 'react';

const meals = { breakfast: null, lunch: null, dinner: null, snack: null };
const nutrition = {
  calories: { current: 0, target: 2000 },
  protein: { current: 0, target: 130 },
  carbs: { current: 0, target: 220 },
  fat: { current: 0, target: 65 },
  water: { current: 0, target: 8 },
};

export default function TodaysMeals() {
  const { calories, protein, carbs, fat, water } = nutrition;
  const [waterCurrent, setWaterCurrent] = useState(water.current);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const totalLoggedCals = Object.values(meals).reduce((s, m) => s + (m?.calories || 0), 0);

  const handleWaterClick = (index) => {
    const newCount = index + 1 === waterCurrent ? index : index + 1;
    setWaterCurrent(newCount);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Daily summary header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#becab9] shadow-card p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#171d16]">Daily Progress</h2>
            <p className="text-xs text-[#6f7a6b] mt-1">
              Tracking your intake for <strong>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-[#6f7a6b] uppercase">Remaining</p>
              <p className="text-lg font-bold text-[#006e1c]">{Math.max(0, calories.target - totalLoggedCals)} kcal</p>
            </div>
            <button 
              onClick={() => setIsLogModalOpen(true)}
              className="flex items-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-[#4caf50]/20 transition-all active:scale-95"
            >
              <Plus size={18} /> Log a Meal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NutritionBar label="Total Calories" current={totalLoggedCals} target={calories.target} color="#4caf50" unit=" kcal" />
          <div className="grid grid-cols-3 gap-4">
            <NutritionBar label="Protein" current={protein.current} target={protein.target} color="#4caf50" />
            <NutritionBar label="Carbs" current={carbs.current} target={carbs.target} color="#33a0fd" />
            <NutritionBar label="Fat" current={fat.current} target={fat.target} color="#f26f9d" />
          </div>
        </div>
      </motion.div>

      {/* Meals grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(meals).map(([type, meal], idx) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <MealCard mealType={type} meal={meal} />
          </motion.div>
        ))}
      </div>

      {/* Water tracker section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#becab9] shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d1e4ff] flex items-center justify-center text-[#0061a4]">
              <Droplets size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[#171d16]">Hydration Tracker</h3>
              <p className="text-xs text-[#6f7a6b]">Target: {water.target} cups per day</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[#0061a4]">{water.current} / {water.target}</p>
            <p className="text-[10px] font-bold text-[#6f7a6b] uppercase">Cups</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Array.from({ length: water.target }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleWaterClick(i)}
              className={`w-10 h-12 rounded-xl transition-all duration-300 flex items-center justify-center border-2 ${
                i < waterCurrent
                  ? 'bg-[#33a0fd] border-[#33a0fd] text-white shadow-md'
                  : 'bg-[#f0f6ea] border-transparent text-[#6f7a6b] hover:border-[#33a0fd]/30'
              }`}
              aria-label={`Cup ${i + 1}`}
            >
              <Droplets size={16} fill={i < waterCurrent ? "currentColor" : "none"} />
            </button>
          ))}
          <button
            className="w-10 h-12 rounded-xl border-2 border-dashed border-[#becab9] flex items-center justify-center text-[#6f7a6b] hover:border-[#4caf50] hover:text-[#4caf50] transition-colors"
            title="Add goal"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-[#eaf0e4]/50 flex items-start gap-3">
          <Info size={14} className="text-[#006e1c] mt-0.5 shrink-0" />
          <p className="text-[11px] text-[#3f4a3c] leading-relaxed">
            Drinking enough water boosts metabolism and helps with digestion. You are <strong>{Math.round((waterCurrent / water.target) * 100)}%</strong> of the way there!
          </p>
        </div>
      </motion.div>

      <LogMealModal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} />
    </div>
  );
}
