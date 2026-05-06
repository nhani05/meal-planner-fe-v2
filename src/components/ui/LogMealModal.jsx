import { useState, useEffect } from 'react';
import { X, Search, Zap, Flame, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDishStore } from '../../stores/dishStore';

export default function LogMealModal({ isOpen, onClose, mealType, onConfirm }) {
  const [search, setSearch] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantityG, setQuantityG] = useState(100);

  const systemDishes = useDishStore((state) => state.systemDishes);
  const fetchSystemDishes = useDishStore((state) => state.fetchSystemDishes);

  useEffect(() => {
    if (isOpen) {
      fetchSystemDishes();
      setSearch('');
      setSelectedDish(null);
      setQuantityG(100);
    }
  }, [isOpen, fetchSystemDishes]);

  const filtered = systemDishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedDish) {
      onConfirm(selectedDish.id, quantityG);
      onClose();
    }
  };

  if (!isOpen) return null;

  const typeLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#171d16]/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-modal overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
            <div>
              <h2 className="font-bold text-[#171d16]">Log a Meal</h2>
              <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider mt-0.5">Adding to {typeLabel}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Find Dish</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
                <input
                  type="text"
                  placeholder="Search chicken, salad, rice..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm outline-none"
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filtered.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => setSelectedDish(dish)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border-2 ${
                      selectedDish?.id === dish.id
                        ? 'bg-[#eaf0e4] border-[#4caf50]'
                        : 'bg-white border-transparent hover:bg-[#f0f6ea]'
                    }`}
                  >
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-bold text-[#171d16] truncate">{dish.name}</p>
                      <div className="flex gap-3 text-[10px] text-[#6f7a6b] mt-0.5">
                        <span className="flex items-center gap-1"><Flame size={10} /> {dish.nutritionInfo?.caloriesKcal || dish.calories || 0} kcal</span>
                        <span className="flex items-center gap-1"><Zap size={10} /> P: {dish.nutritionInfo?.proteinG || dish.protein || 0}g</span>
                      </div>
                    </div>
                    {selectedDish?.id === dish.id && (
                      <div className="w-5 h-5 rounded-full bg-[#4caf50] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            {selectedDish && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Quantity (grams)</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantityG((q) => Math.max(50, q - 50))}
                    className="w-10 h-10 rounded-xl bg-[#f0f6ea] flex items-center justify-center text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={quantityG}
                      onChange={(e) => setQuantityG(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full text-center py-2 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm font-bold outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setQuantityG((q) => q + 50)}
                    className="w-10 h-10 rounded-xl bg-[#f0f6ea] flex items-center justify-center text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-between">
            <div className="text-left">
              {selectedDish && (
                <p className="text-xs font-semibold text-[#3f4a3c]">
                  Selected: <span className="text-[#006e1c]">{selectedDish.name}</span> ({quantityG}g)
                </p>
              )}
            </div>
            <button
              disabled={!selectedDish}
              onClick={handleConfirm}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                selectedDish
                  ? 'bg-[#4caf50] text-white shadow-[#4caf50]/20 hover:bg-[#006e1c] active:scale-95'
                  : 'bg-[#becab9] text-white cursor-not-allowed opacity-50'
              }`}
            >
              Add to {typeLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
