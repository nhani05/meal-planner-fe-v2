/**
 * Meal card for daily meals view
 * Props: mealType, meal { name, calories, protein, carbs, fat, tags }
 */
import Chip from './Chip';

const mealIcons = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

export default function MealCard({ mealType, meal }) {
  return (
    <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#eaf0e4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{mealIcons[mealType]}</span>
          <div>
            <p className="text-[10px] font-semibold text-[#6f7a6b] uppercase tracking-widest">
              {mealType}
            </p>
            <p className="text-sm font-bold text-[#171d16]">{meal.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#006e1c]">{meal.calories}</p>
          <p className="text-[10px] text-[#6f7a6b]">kcal</p>
        </div>
      </div>

      {/* Macros */}
      <div className="px-5 py-3 grid grid-cols-3 gap-2 border-b border-[#eaf0e4]">
        {[
          { label: 'Protein', value: meal.protein, color: '#4caf50' },
          { label: 'Carbs', value: meal.carbs, color: '#33a0fd' },
          { label: 'Fat', value: meal.fat, color: '#f26f9d' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className="text-sm font-bold" style={{ color }}>{value}g</p>
            <p className="text-[10px] text-[#6f7a6b]">{label}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      {meal.tags?.length > 0 && (
        <div className="px-5 py-3 flex flex-wrap gap-1.5">
          {meal.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
