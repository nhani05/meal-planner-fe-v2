import { useState, useEffect } from 'react';
import { X, Search, Flame, Zap, Minus, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDishStore } from '../../stores/dishStore';

export default function AddFoodModal({ isOpen, onClose, mealType, onConfirm }) {
  const [search, setSearch] = useState('');
  const [selectedMap, setSelectedMap] = useState({}); // { dishId: { dish, quantityG } }

  const systemDishes = useDishStore((state) => state.systemDishes);
  const fetchSystemDishes = useDishStore((state) => state.fetchSystemDishes);

  useEffect(() => {
    if (isOpen) {
      fetchSystemDishes();
      setSearch('');
      setSelectedMap({});
    }
  }, [isOpen, fetchSystemDishes]);

  const filtered = systemDishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDish = (dish) => {
    setSelectedMap((prev) => {
      const next = { ...prev };
      if (next[dish.id]) {
        delete next[dish.id];
      } else {
        next[dish.id] = { dish, quantityG: 100 };
      }
      return next;
    });
  };

  const updateQuantity = (dishId, delta) => {
    setSelectedMap((prev) => {
      const item = prev[dishId];
      if (!item) return prev;
      const next = { ...prev };
      next[dishId] = { ...item, quantityG: Math.max(1, item.quantityG + delta) };
      return next;
    });
  };

  const setQuantity = (dishId, value) => {
    const num = Math.max(1, parseInt(value) || 0);
    setSelectedMap((prev) => {
      const item = prev[dishId];
      if (!item) return prev;
      const next = { ...prev };
      next[dishId] = { ...item, quantityG: num };
      return next;
    });
  };

  const handleConfirm = () => {
    const list = Object.values(selectedMap).map(({ dish, quantityG }) => ({
      dishId: dish.id,
      quantityG,
    }));
    if (list.length > 0) {
      onConfirm(list);
      onClose();
    }
  };

  const selectedCount = Object.keys(selectedMap).length;
  const typeLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

  if (!isOpen) return null;

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
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-modal overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4] shrink-0">
            <div>
              <h2 className="font-bold text-[#171d16]">Add Food</h2>
              <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider mt-0.5">Adding to {typeLabel}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto">
            {/* Search */}
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

            {/* Dish list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {filtered.map((dish) => {
                const selected = !!selectedMap[dish.id];
                return (
                  <div
                    key={dish.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border-2 ${
                      selected
                        ? 'bg-[#eaf0e4] border-[#4caf50]'
                        : 'bg-white border-transparent hover:bg-[#f0f6ea]'
                    }`}
                  >
                    <button
                      onClick={() => toggleDish(dish)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selected ? 'bg-[#4caf50] border-[#4caf50]' : 'border-[#becab9]'
                      }`}
                    >
                      {selected && <Check size={12} className="text-white" />}
                    </button>

                    <div className="flex-1 text-left min-w-0" onClick={() => toggleDish(dish)}>
                      <p className="text-sm font-bold text-[#171d16] truncate">{dish.name}</p>
                      <div className="flex gap-3 text-[10px] text-[#6f7a6b] mt-0.5">
                        <span className="flex items-center gap-1"><Flame size={10} /> {dish.nutritionInfo?.caloriesKcal || dish.calories || 0} kcal</span>
                        <span className="flex items-center gap-1"><Zap size={10} /> P: {dish.nutritionInfo?.proteinG || dish.protein || 0}g</span>
                      </div>
                    </div>

                    {selected && (
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => updateQuantity(dish.id, -50)}
                          className="w-7 h-7 rounded-md bg-white border border-[#becab9]/50 flex items-center justify-center text-[#6f7a6b] hover:text-[#006e1c]"
                        >
                          <Minus size={12} />
                        </button>
                        <input
                          type="number"
                          value={selectedMap[dish.id].quantityG}
                          onChange={(e) => setQuantity(dish.id, e.target.value)}
                          className="w-14 text-center text-xs font-bold py-1 rounded-md bg-white border border-[#becab9]/50 outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(dish.id, 50)}
                          className="w-7 h-7 rounded-md bg-white border border-[#becab9]/50 flex items-center justify-center text-[#6f7a6b] hover:text-[#006e1c]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] shrink-0 flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs font-semibold text-[#3f4a3c]">
                {selectedCount > 0 ? (
                  <span><span className="text-[#006e1c] font-bold">{selectedCount}</span> item{selectedCount > 1 ? 's' : ''} selected</span>
                ) : (
                  <span className="text-[#6f7a6b]">Select at least one dish</span>
                )}
              </p>
            </div>
            <button
              disabled={selectedCount === 0}
              onClick={handleConfirm}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                selectedCount > 0
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
