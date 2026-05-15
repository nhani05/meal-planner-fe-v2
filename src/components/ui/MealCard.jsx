/**
 * Meal card for daily meals view
 * Props: mealType, portions[], onAddPortion, onUpdatePortion, onRemovePortion, isAdding, onValidationChange
 */
import { useState, useEffect } from 'react';
import { Plus, Trash2, Minus, Plus as PlusIcon } from 'lucide-react';

const mealIcons = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

const getPortionDishName = (portion) =>
  portion.dishName ||
  portion.dish_name ||
  portion.dish?.name ||
  portion.dish?.dishName ||
  portion.dish?.dish_name ||
  (portion.dishId ? `Dish #${portion.dishId}` : 'Unknown dish');

export default function MealCard({
  mealType,
  portions = [],
  onAddPortion,
  onUpdatePortion,
  onRemovePortion,
  isAdding,
  onValidationChange,
}) {
  const [localQuantities, setLocalQuantities] = useState({});
  const [quantityErrors, setQuantityErrors] = useState({});

  useEffect(() => {
    const init = {};
    portions.forEach((p) => {
      init[p.id] = p.quantityG || 100;
    });
    setLocalQuantities(init);
    setQuantityErrors({});
  }, [portions]);

  const hasErrors = Object.values(quantityErrors).some(Boolean);

  useEffect(() => {
    if (onValidationChange) onValidationChange(mealType, hasErrors);
  }, [hasErrors, mealType, onValidationChange]);

  const handleQuantityChange = (portionId, value) => {
    const num = parseInt(value) || 0;
    setLocalQuantities((prev) => ({ ...prev, [portionId]: num }));
    setQuantityErrors((prev) => ({ ...prev, [portionId]: num <= 0 }));
  };

  const commitQuantity = (portionId) => {
    const q = localQuantities[portionId];
    if (!q || q <= 0) {
      setQuantityErrors((prev) => ({ ...prev, [portionId]: true }));
      return;
    }
    onUpdatePortion(portionId, q);
  };

  const handleStepperChange = (portionId, currentQ, delta) => {
    const newQ = Math.max(1, currentQ + delta);
    setLocalQuantities((prev) => ({ ...prev, [portionId]: newQ }));
    setQuantityErrors((prev) => ({ ...prev, [portionId]: false }));
    onUpdatePortion(portionId, newQ);
  };

  const totalCals = portions.reduce((s, p) => s + (p.caloriesKcal || 0), 0);
  const totalProtein = portions.reduce((s, p) => s + (p.proteinG || 0), 0);
  const totalCarbs = portions.reduce((s, p) => s + (p.carbG || 0), 0);
  const totalFat = portions.reduce((s, p) => s + (p.fatG || 0), 0);

  return (
    <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#eaf0e4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{mealIcons[mealType]}</span>
          <div>
            <p className="text-[10px] font-semibold text-[#6f7a6b] uppercase tracking-widest">
              {mealType}
            </p>
            <p className="text-sm font-bold text-[#171d16]">
              {portions.length > 0 ? `${portions.length} item${portions.length > 1 ? 's' : ''}` : 'Empty'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#006e1c]">{Math.round(totalCals)}</p>
          <p className="text-[10px] text-[#6f7a6b]">kcal</p>
        </div>
      </div>

      {/* Portions list */}
      <div className="flex-1 p-3 space-y-2">
        {portions.map((p) => {
          const localQ = localQuantities[p.id] ?? p.quantityG ?? 100;
          const hasError = !!quantityErrors[p.id];
          return (
            <div
              key={p.id}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                hasError ? 'bg-[#fff5f5] border border-[#ba1a1a]' : 'bg-[#f5fbef]'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#171d16] truncate">{getPortionDishName(p)}</p>
                <p className="text-[10px] text-[#6f7a6b]">{Math.round(p.caloriesKcal || 0)} kcal</p>
              </div>

              {/* Quantity stepper */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleStepperChange(p.id, localQ, -50)}
                  className="w-6 h-6 rounded-md bg-white border border-[#becab9]/50 flex items-center justify-center text-[#6f7a6b] hover:text-[#006e1c] transition-colors"
                >
                  <Minus size={12} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={localQ}
                  onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                  onBlur={() => commitQuantity(p.id)}
                  className={`w-14 text-center text-xs font-bold py-0.5 rounded-md border outline-none transition-colors ${
                    hasError
                      ? 'border-[#ba1a1a] bg-[#fff5f5] text-[#ba1a1a]'
                      : 'border-[#becab9]/50 bg-white text-[#171d16]'
                  }`}
                />
                <span className="text-[10px] text-[#6f7a6b]">g</span>
                <button
                  onClick={() => handleStepperChange(p.id, localQ, 50)}
                  className="w-6 h-6 rounded-md bg-white border border-[#becab9]/50 flex items-center justify-center text-[#6f7a6b] hover:text-[#006e1c] transition-colors"
                >
                  <PlusIcon size={12} />
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => onRemovePortion(p.id)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}

        {portions.length === 0 && (
          <div className="text-center py-4 text-[#6f7a6b]">
            <p className="text-xs">No items yet</p>
          </div>
        )}
      </div>

      {/* Macros summary */}
      {portions.length > 0 && (
        <div className="px-5 py-3 grid grid-cols-3 gap-2 border-t border-[#eaf0e4] bg-[#f5fbef]/30">
          {[
            { label: 'Protein', value: totalProtein, color: '#4caf50' },
            { label: 'Carbs', value: totalCarbs, color: '#33a0fd' },
            { label: 'Fat', value: totalFat, color: '#f26f9d' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-bold" style={{ color }}>{Math.round(value)}g</p>
              <p className="text-[10px] text-[#6f7a6b]">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add button */}
      <div className="p-3 border-t border-[#eaf0e4]">
        <button
          onClick={onAddPortion}
          disabled={isAdding}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-[#becab9] text-[#6f7a6b] hover:border-[#4caf50] hover:text-[#4caf50] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={16} /> Add dish
        </button>
      </div>
    </div>
  );
}
