import { useState, useCallback } from 'react';
import { ArrowLeft, Trash2, Save, Plus, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import MealCard from '../ui/MealCard';
import NutritionBar from '../ui/NutritionBar';
import AddFoodModal from './AddFoodModal';
import SaveTemplateModal from './SaveTemplateModal';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useTranslation } from 'react-i18next';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function DayDetailView({
  date,
  plan,
  portions,
  totals,
  targets,
  isLoading,
  isAdding,
  isSavingTemplate,
  existingTemplates,
  onBack,
  onAddFood,
  onUpdatePortion,
  onRemovePortion,
  onDeletePlan,
  onSaveTemplate,
  onOverwriteTemplate,
  onUpdatePlan,
}) {
  const { i18n, t } = useTranslation();
  const [activeMealType, setActiveMealType] = useState(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [invalidMeals, setInvalidMeals] = useState({});

  const handleValidationChange = useCallback((mealType, hasError) => {
    setInvalidMeals((prev) => {
      if (prev[mealType] === hasError) return prev;
      return { ...prev, [mealType]: hasError };
    });
  }, []);

  const hasAnyInvalid = Object.values(invalidMeals).some(Boolean);

  const hasPortions = mealTypes.some((t) => (portions[t] || []).length > 0);

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(i18n.resolvedLanguage === 'en' ? 'en-US' : 'vi-VN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpenAddFood = (mealType) => {
    setActiveMealType(mealType);
    setIsFoodModalOpen(true);
  };

  const handleConfirmAdd = (list) => {
    if (activeMealType) {
      onAddFood(activeMealType, list);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 max-w-5xl mx-auto pb-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] transition-all text-[#6f7a6b] shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-[#171d16]">{formattedDate}</h2>
            <p className="text-sm text-[#6f7a6b] font-medium">
              {plan ? t('planner.planNumber', { id: plan.id }) : t('planner.noPlanCreated')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {plan && (
            <>
              {onUpdatePlan && (
                <button
                  onClick={onUpdatePlan}
                  disabled={isAdding || hasAnyInvalid}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4caf50] text-white text-xs font-bold transition-all shadow-sm shadow-[#4caf50]/20 hover:bg-[#006e1c] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={14} /> {t('planner.updatePlan')}
                </button>
              )}
              <button
                onClick={() => setIsSaveTemplateOpen(true)}
                disabled={!hasPortions || isAdding}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] text-[#3f4a3c] text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save size={14} /> {t('planner.saveAsTemplate')}
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                disabled={isAdding}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#ba1a1a]/30 hover:bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 size={14} /> {t('planner.deletePlan')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Nutrition summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#becab9] shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#171d16]">{t('planner.dailyNutrition')}</h3>
          <p className="text-xs font-bold text-[#6f7a6b] uppercase">{Math.round(totals.calories)} / {targets.calories} kcal</p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 size={24} className="text-[#4caf50] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NutritionBar label={t('dashboard.calories')} current={totals.calories} target={targets.calories} color="#4caf50" unit=" kcal" />
            <div className="grid grid-cols-3 gap-4">
              <NutritionBar label={t('dashboard.protein')} current={totals.protein} target={targets.protein} color="#4caf50" />
              <NutritionBar label={t('dashboard.carbs')} current={totals.carbs} target={targets.carbs} color="#33a0fd" />
              <NutritionBar label={t('dashboard.fat')} current={totals.fat} target={targets.fat} color="#f26f9d" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Meal cards */}
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
              onAddPortion={() => handleOpenAddFood(type)}
              onUpdatePortion={(portionId, quantityG) => onUpdatePortion(type, portionId, quantityG)}
              onRemovePortion={(portionId) => onRemovePortion(type, portionId)}
              isAdding={isAdding}
              onValidationChange={handleValidationChange}
            />
          </motion.div>
        ))}
      </div>

      {/* Create plan hint if none */}
      {!plan && !isLoading && (
        <div className="bg-[#f5fbef] rounded-2xl border border-[#becab9] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#eaf0e4] flex items-center justify-center mx-auto mb-4">
            <Plus size={32} className="text-[#006e1c]" />
          </div>
          <h3 className="font-bold text-[#171d16] mb-1">{t('planner.noPlanYet')}</h3>
          <p className="text-sm text-[#6f7a6b] mb-4">{t('planner.noPlanText')}</p>
          <button
            onClick={() => handleOpenAddFood('breakfast')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4caf50] text-white text-sm font-bold shadow-lg shadow-[#4caf50]/20 hover:bg-[#006e1c] transition-all active:scale-95"
          >
            <Plus size={18} /> {t('planner.startBreakfast')}
          </button>
        </div>
      )}

      <AddFoodModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        mealType={activeMealType || 'breakfast'}
        onConfirm={handleConfirmAdd}
      />

      <SaveTemplateModal
        isOpen={isSaveTemplateOpen}
        onClose={() => setIsSaveTemplateOpen(false)}
        onConfirm={onSaveTemplate}
        onOverwrite={onOverwriteTemplate}
        isSaving={isSavingTemplate}
        existingTemplates={existingTemplates || []}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onDeletePlan}
        title={t('planner.deletePlan')}
        message={t('planner.deletePlanMessage')}
      />
    </motion.div>
  );
}
