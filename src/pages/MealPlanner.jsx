import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Flame, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useMealStore } from '../stores/mealStore';
import { useUserStore } from '../stores/userStore';
import { getMealPlanById } from '../api/mealApi';
import PlanCreationModal from '../components/planner/PlanCreationModal';
import TemplateListModal from '../components/planner/TemplateListModal';
import DayDetailView from '../components/planner/DayDetailView';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

function formatDateLocal(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getWeekDates(weekOffset) {
  const now = new Date();
  now.setDate(now.getDate() + weekOffset * 7);
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(formatDateLocal(d));
  }
  return dates;
}

function getWeekLabel(weekOffset) {
  const now = new Date();
  now.setDate(now.getDate() + weekOffset * 7);
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

function calcDayTotals(plan) {
  let calories = 0, protein = 0, carbs = 0, fat = 0;
  if (plan?.meals) {
    for (const meal of plan.meals) {
      for (const p of meal.portions || []) {
        calories += p.caloriesKcal || 0;
        protein += p.proteinG || 0;
        carbs += p.carbG || 0;
        fat += p.fatG || 0;
      }
    }
  } else if (plan) {
    // Fallback for direct portions object
    mealTypes.forEach((type) => {
      (plan[type] || []).forEach((p) => {
        calories += p.caloriesKcal || 0;
        protein += p.proteinG || 0;
        carbs += p.carbG || 0;
        fat += p.fatG || 0;
      });
    });
  }
  return { calories, protein, carbs, fat };
}

export default function MealPlanner() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'detail'
  const [creationDate, setCreationDate] = useState(null);
  const [isPlanCreationOpen, setIsPlanCreationOpen] = useState(false);
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const accountId = user?.id;

  const healthGoal = useUserStore((state) => state.healthGoal);
  const fetchGoal = useUserStore((state) => state.fetchGoal);

  const weekPlans = useMealStore((state) => state.weekPlans);
  const weekPlanSummaries = useMealStore((state) => state.weekPlanSummaries);
  const isLoadingWeek = useMealStore((state) => state.isLoadingWeek);
  const fetchWeekPlans = useMealStore((state) => state.fetchWeekPlans);
  const ensurePlanForDate = useMealStore((state) => state.ensurePlanForDate);
  const loadDayDetail = useMealStore((state) => state.loadDayDetail);
  const deletePlan = useMealStore((state) => state.deletePlan);

  const selectedDate = useMealStore((state) => state.selectedDate);
  const selectedPlan = useMealStore((state) => state.selectedPlan);
  const dayPortions = useMealStore((state) => state.dayPortions);
  const dayTotals = useMealStore((state) => state.dayTotals);
  const isLoadingDay = useMealStore((state) => state.isLoadingDay);
  const isAdding = useMealStore((state) => state.isAdding);
  const addPortionsToDay = useMealStore((state) => state.addPortionsToDay);
  const updateDayPortionQuantity = useMealStore((state) => state.updateDayPortionQuantity);
  const removeDayPortion = useMealStore((state) => state.removeDayPortion);
  const fetchTemplates = useMealStore((state) => state.fetchTemplates);
  const templates = useMealStore((state) => state.templates);
  const isLoadingTemplates = useMealStore((state) => state.isLoadingTemplates);
  const saveTemplate = useMealStore((state) => state.saveTemplate);
  const isSavingTemplate = useMealStore((state) => state.isSavingTemplate);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const todayName = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  const targets = {
    calories: healthGoal?.dailyCaloriesKcal || 2000,
    protein: healthGoal?.proteinGDay || 130,
    carbs: healthGoal?.carbGDay || 220,
    fat: healthGoal?.fatGDay || 65,
  };

  useEffect(() => {
    if (accountId) {
      fetchWeekPlans(accountId, weekOffset);
      if (!healthGoal) fetchGoal(accountId);
    }
  }, [accountId, weekOffset, fetchWeekPlans, fetchGoal, healthGoal]);

  const handleDayClick = useCallback(
    async (date) => {
      if (!accountId) return;
      const plan = weekPlans[date];
      if (plan) {
        await loadDayDetail(accountId, date);
        setViewMode('detail');
      } else {
        setCreationDate(date);
        setIsPlanCreationOpen(true);
      }
    },
    [accountId, weekPlans, loadDayDetail]
  );

  const handleCreateNew = useCallback(async () => {
    if (!accountId || !creationDate) return;
    await ensurePlanForDate(accountId, creationDate);
    await loadDayDetail(accountId, creationDate);
    setViewMode('detail');
  }, [accountId, creationDate, ensurePlanForDate, loadDayDetail]);

  const handleUseTemplate = useCallback(() => {
    if (!accountId) return;
    fetchTemplates(accountId);
    setIsTemplateListOpen(true);
  }, [accountId, fetchTemplates]);

  const handleSelectTemplate = useCallback(
    async (template) => {
      if (!accountId || !creationDate) return;
      const plan = await ensurePlanForDate(accountId, creationDate);
      if (plan && template.sourcePlanId) {
        try {
          const sourcePlanRes = await getMealPlanById(template.sourcePlanId);
          const source = sourcePlanRes.data;
          if (source?.meals) {
            for (const meal of source.meals) {
              for (const portion of meal.portions || []) {
                await addPortionsToDay(accountId, creationDate, meal.mealType || 'breakfast', [
                  { dishId: portion.dishId, quantityG: portion.quantityG || 100 },
                ]);
              }
            }
          }
        } catch {
          // Ignore source replication errors; empty plan is acceptable
        }
        await loadDayDetail(accountId, creationDate);
      }
      setViewMode('detail');
    },
    [accountId, creationDate, ensurePlanForDate, loadDayDetail, addPortionsToDay]
  );

  const handleBackToCalendar = useCallback(() => {
    setViewMode('calendar');
    if (accountId) fetchWeekPlans(accountId, weekOffset);
  }, [accountId, weekOffset, fetchWeekPlans]);

  const handleAddFood = useCallback(
    async (mealType, portionsList) => {
      if (!accountId || !selectedDate) return;
      await addPortionsToDay(accountId, selectedDate, mealType, portionsList);
    },
    [accountId, selectedDate, addPortionsToDay]
  );

  const handleUpdatePortion = useCallback(
    async (mealType, portionId, quantityG) => {
      if (!selectedPlan) return;
      await updateDayPortionQuantity(selectedPlan.id, mealType, portionId, quantityG);
    },
    [selectedPlan, updateDayPortionQuantity]
  );

  const handleRemovePortion = useCallback(
    async (mealType, portionId) => {
      if (!selectedPlan) return;
      await removeDayPortion(selectedPlan.id, mealType, portionId);
    },
    [selectedPlan, removeDayPortion]
  );

  const handleDeletePlan = useCallback(async () => {
    if (!selectedPlan || !selectedDate) return;
    await deletePlan(selectedPlan.id, selectedDate);
    setViewMode('calendar');
  }, [selectedPlan, selectedDate, deletePlan]);

  const handleSaveTemplate = useCallback(
    async (templateName) => {
      if (!selectedPlan) return;
      const ok = await saveTemplate(templateName, selectedPlan.id);
      if (ok) {
        // Refresh templates silently
        if (accountId) fetchTemplates(accountId);
      }
    },
    [selectedPlan, saveTemplate, accountId, fetchTemplates]
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <AnimatePresence mode="wait">
        {viewMode === 'calendar' ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#171d16]">Weekly Meal Plan</h2>
                <p className="text-sm text-[#6f7a6b] font-medium">{getWeekLabel(weekOffset)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWeekOffset((o) => o - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] transition-all text-[#6f7a6b] shadow-sm active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setWeekOffset(0)}
                  className={`text-xs px-4 py-2.5 rounded-xl border font-bold transition-all shadow-sm active:scale-95 ${
                    weekOffset === 0
                      ? 'bg-[#4caf50] text-white border-[#4caf50]'
                      : 'bg-white border-[#becab9] hover:bg-[#eaf0e4] text-[#3f4a3c]'
                  }`}
                >
                  {weekOffset === 0 ? 'Current Week' : getWeekLabel(weekOffset)}
                </button>
                <button
                  onClick={() => setWeekOffset((o) => o + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] transition-all text-[#6f7a6b] shadow-sm active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Week Grid */}
            {isLoadingWeek ? (
              <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-12 flex items-center justify-center">
                <Loader2 size={32} className="text-[#4caf50] animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {days.map((day, idx) => {
                  const date = weekDates[idx];
                  const plan = weekPlans[date];
                  const isToday = day === todayName && weekOffset === 0;
                  const totals = weekPlanSummaries[date];

                  return (
                    <motion.button
                      key={day}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDayClick(date)}
                      className={`relative text-left rounded-2xl border p-5 transition-all shadow-sm ${
                        isToday
                          ? 'border-[#4caf50] bg-[#f0f6ea]'
                          : plan
                          ? 'border-[#becab9] bg-white hover:shadow-md'
                          : 'border-dashed border-[#dee4d9] bg-white hover:border-[#4caf50] hover:bg-[#f5fbef]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-[#006e1c]' : 'text-[#6f7a6b]'}`}>
                          {day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-bold text-white bg-[#4caf50] px-2 py-0.5 rounded-full uppercase">
                            Today
                          </span>
                        )}
                      </div>

                      {plan ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Flame size={14} className="text-[#006e1c]" />
                            <span className="text-sm font-bold text-[#171d16]">
                              {Math.round(totals?.calories || 0)} kcal
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[#6f7a6b]">
                            <span>P: {Math.round(totals?.protein || 0)}g</span>
                            <span>C: {Math.round(totals?.carbs || 0)}g</span>
                            <span>F: {Math.round(totals?.fat || 0)}g</span>
                          </div>
                          <div className="mt-2 text-[10px] font-semibold text-[#006e1c] bg-[#eaf0e4] inline-block px-2 py-1 rounded-lg">
                            Planned
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#f5fbef] flex items-center justify-center">
                            <Plus size={18} className="text-[#6f7a6b]" />
                          </div>
                          <p className="text-xs font-semibold text-[#6f7a6b]">Create Plan</p>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Legend & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-wrap gap-4 text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#eaf0e4] border border-[#becab9]" /> Planned
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#f0f6ea] border border-[#4caf50]" /> Today
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm border-2 border-dashed border-[#dee4d9]" /> Empty
                </span>
              </div>
              <div className="bg-[#4caf50]/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center shrink-0">
                  <span className="text-white text-xl font-bold">💡</span>
                </div>
                <p className="text-[11px] text-[#006e1c] font-medium leading-relaxed">
                  Planning your meals in advance reduces the chance of impulsive unhealthy eating by <strong>45%</strong>. Start by filling at least 3 days!
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <DayDetailView
            key="detail"
            date={selectedDate}
            plan={selectedPlan}
            portions={dayPortions}
            totals={dayTotals}
            targets={targets}
            isLoading={isLoadingDay}
            isAdding={isAdding}
            isSavingTemplate={isSavingTemplate}
            onBack={handleBackToCalendar}
            onAddFood={handleAddFood}
            onUpdatePortion={handleUpdatePortion}
            onRemovePortion={handleRemovePortion}
            onDeletePlan={handleDeletePlan}
            onSaveTemplate={handleSaveTemplate}
          />
        )}
      </AnimatePresence>

      <PlanCreationModal
        isOpen={isPlanCreationOpen}
        onClose={() => setIsPlanCreationOpen(false)}
        onCreateNew={handleCreateNew}
        onUseTemplate={handleUseTemplate}
      />

      <TemplateListModal
        isOpen={isTemplateListOpen}
        onClose={() => setIsTemplateListOpen(false)}
        templates={templates}
        isLoading={isLoadingTemplates}
        onSelect={handleSelectTemplate}
      />
    </div>
  );
}

