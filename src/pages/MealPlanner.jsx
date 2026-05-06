import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealSlots = ['Breakfast', 'Lunch', 'Dinner'];
const mealEmojis = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙' };

export default function MealPlanner() {
  const { recipes, weekPlan, addToPlan } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeSlot, setActiveSlot] = useState(null); // { day, si }
  
  const todayName = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  const getWeekLabel = () => {
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const handleAddMeal = (day, si, recipeName) => {
    addToPlan(day, recipeName, si);
    setActiveSlot(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#171d16]">Weekly Meal Plan</h2>
          <p className="text-sm text-[#6f7a6b] font-medium">{getWeekLabel()}</p>
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
            className="text-xs px-4 py-2.5 rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] text-[#3f4a3c] font-bold transition-all shadow-sm active:scale-95"
          >
            Current Week
          </button>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#becab9] hover:bg-[#eaf0e4] transition-all text-[#6f7a6b] shadow-sm active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto rounded-2xl border border-[#becab9] bg-white shadow-card">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-[#eaf0e4]">
              <th className="w-28 px-4 py-5 text-left text-[10px] font-bold text-[#6f7a6b] uppercase tracking-widest bg-[#f5fbef]/30">Meal</th>
              {days.map((day) => (
                <th
                  key={day}
                  className={`px-3 py-5 text-center text-xs font-bold transition-colors ${
                    day === todayName && weekOffset === 0
                      ? 'text-[#006e1c] bg-[#f0f6ea]'
                      : 'text-[#6f7a6b]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{day}</span>
                    {day === todayName && weekOffset === 0 && (
                      <motion.span 
                        layoutId="today-indicator"
                        className="w-4 h-1 rounded-full bg-[#4caf50]" 
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealSlots.map((slot, si) => (
              <tr key={slot} className={si < mealSlots.length - 1 ? 'border-b border-[#eaf0e4]' : ''}>
                <td className="px-4 py-6 bg-[#f5fbef]/20">
                  <div className="flex items-center gap-3 text-xs font-bold text-[#3f4a3c]">
                    <span className="text-xl">{mealEmojis[slot]}</span>
                    <span>{slot}</span>
                  </div>
                </td>
                {days.map((day) => {
                  const meals = weekPlan[day] ?? [null, null, null];
                  const meal = meals[si];
                  const isToday = day === todayName && weekOffset === 0;
                  const isActive = activeSlot?.day === day && activeSlot?.si === si;

                  return (
                    <td
                      key={day}
                      className={`px-2 py-4 relative group ${isToday ? 'bg-[#f0f6ea]/50' : ''}`}
                    >
                      {meal ? (
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="bg-[#eaf0e4] border border-[#becab9] rounded-xl px-3 py-3 cursor-pointer transition-all shadow-sm hover:shadow-md relative overflow-hidden"
                        >
                          <p className="text-[10px] font-bold text-[#006e1c] leading-tight text-left">{meal}</p>
                          <button 
                            onClick={() => addToPlan(day, null, si)}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full border border-[#becab9] opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={10} className="text-[#ba1a1a]" />
                          </button>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setActiveSlot(isActive ? null : { day, si })}
                          className={`w-full h-12 rounded-xl border-2 border-dashed transition-all flex items-center justify-center ${
                            isActive 
                              ? 'bg-[#4caf50] border-[#4caf50] text-white'
                              : 'border-[#dee4d9] text-[#becab9] hover:border-[#4caf50] hover:bg-[#f0f6ea] hover:text-[#4caf50]'
                          }`}
                        >
                          <Plus size={16} />
                        </button>
                      )}

                      {/* Dropdown for selecting recipe (simple version) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-[#becab9] rounded-xl shadow-xl p-2 max-h-48 overflow-y-auto"
                          >
                            <p className="text-[9px] font-bold text-[#6f7a6b] uppercase p-2 border-b border-[#eaf0e4] mb-1">Select Recipe</p>
                            {recipes.map(r => (
                              <button
                                key={r.id}
                                onClick={() => handleAddMeal(day, si, r.name)}
                                className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-semibold text-[#171d16] hover:bg-[#eaf0e4] transition-colors"
                              >
                                {r.emoji} {r.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}
