import { Plus, Droplets, Info, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MealCard from '../components/ui/MealCard';
import NutritionBar from '../components/ui/NutritionBar';
import LogMealModal from '../components/ui/LogMealModal';
import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { useMealStore } from '../stores/mealStore';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

function formatDateLocal(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TodaysMeals() {
  const user = useAuthStore((state) => state.user);
  const accountId = user?.id;

  const healthGoal = useUserStore((state) => state.healthGoal);
  const fetchGoal = useUserStore((state) => state.fetchGoal);

  const todayPlan = useMealStore((state) => state.todayPlan);
  const portions = useMealStore((state) => state.portions);
  const dailyTotals = useMealStore((state) => state.dailyTotals);
  const isLoading = useMealStore((state) => state.isLoading);
  const isAdding = useMealStore((state) => state.isAdding);
  const loadTodayData = useMealStore((state) => state.loadTodayData);
  const addPortion = useMealStore((state) => state.addPortion);
  const updatePortionQuantity = useMealStore((state) => state.updatePortionQuantity);
  const removePortion = useMealStore((state) => state.removePortion);

  const [activeMealType, setActiveMealType] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [waterCurrent, setWaterCurrent] = useState(0);

  const todayStr = useMemo(() => formatDateLocal(new Date()), []);

  // Nutrition targets (fallback defaults)
  const targets = {
    calories: healthGoal?.dailyCaloriesKcal || 2000,
    protein: healthGoal?.proteinGDay || 130,
    carbs: healthGoal?.carbGDay || 220,
    fat: healthGoal?.fatGDay || 65,
    water: 8,
  };

  useEffect(() => {
    if (accountId) {
      loadTodayData(accountId, todayStr);
      if (!healthGoal) fetchGoal(accountId);
    }
  }, [accountId, todayStr, loadTodayData, fetchGoal, healthGoal]);

  const handleWaterClick = (index) => {
    setWaterCurrent((prev) => (index + 1 === prev ? index : index + 1));
  };

  const handleAddPortion = (mealType) => {
    setActiveMealType(mealType);
    setIsLogModalOpen(true);
  };

  const handleConfirmAdd = (dishId, quantityG) => {
    if (accountId && activeMealType) {
      addPortion(accountId, todayStr, activeMealType, dishId, quantityG);
    }
  };

  const handleUpdateQuantity = (mealType, portionId, quantityG) => {
    if (todayPlan) {
      updatePortionQuantity(todayPlan.id, mealType, portionId, quantityG);
    }
  };

  const handleRemove = (mealType, portionId) => {
    if (todayPlan) {
      removePortion(todayPlan.id, mealType, portionId);
    }
  };

  const remainingCals = Math.max(0, targets.calories - dailyTotals.calories);

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
              <p className="text-lg font-bold text-[#006e1c]">{Math.round(remainingCals)} kcal</p>
            </div>
            <button
              onClick={() => handleAddPortion('breakfast')}
              disabled={isAdding}
              className="flex items-center gap-2 bg-[#4caf50] hover:bg-[#006e1c] disabled:bg-[#becab9] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-[#4caf50]/20 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={18} /> Log a Meal
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={28} className="text-[#4caf50] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NutritionBar label="Total Calories" current={dailyTotals.calories} target={targets.calories} color="#4caf50" unit=" kcal" />
            <div className="grid grid-cols-3 gap-4">
              <NutritionBar label="Protein" current={dailyTotals.protein} target={targets.protein} color="#4caf50" />
              <NutritionBar label="Carbs" current={dailyTotals.carbs} target={targets.carbs} color="#33a0fd" />
              <NutritionBar label="Fat" current={dailyTotals.fat} target={targets.fat} color="#f26f9d" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Meals grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mealTypes.map((type, idx) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <MealCard
              mealType={type}
              portions={portions[type] || []}
              onAddPortion={() => handleAddPortion(type)}
              onUpdatePortion={(portionId, quantityG) => handleUpdateQuantity(type, portionId, quantityG)}
              onRemovePortion={(portionId) => handleRemove(type, portionId)}
              isAdding={isAdding}
            />
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
              <p className="text-xs text-[#6f7a6b]">Target: {targets.water} cups per day</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-[#0061a4]">{waterCurrent} / {targets.water}</p>
            <p className="text-[10px] font-bold text-[#6f7a6b] uppercase">Cups</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Array.from({ length: targets.water }).map((_, i) => (
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
            Drinking enough water boosts metabolism and helps with digestion. You are <strong>{Math.round((waterCurrent / targets.water) * 100)}%</strong> of the way there!
          </p>
        </div>
      </motion.div>

      <LogMealModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        mealType={activeMealType || 'breakfast'}
        onConfirm={handleConfirmAdd}
      />
    </div>
  );
}
