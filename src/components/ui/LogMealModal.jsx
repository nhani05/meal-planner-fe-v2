import { useState } from 'react';
import { X, Search, Utensils, Zap, Flame, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import Chip from './Chip';

export default function LogMealModal({ isOpen, onClose }) {
  const { recipes, addMeal } = useApp();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('Breakfast');
  const [step, setStep] = useState(1); // 1: Select type/search, 2: Select recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLog = () => {
    if (selectedRecipe) {
      addMeal(selectedType, {
        name: selectedRecipe.name,
        calories: selectedRecipe.calories,
        protein: selectedRecipe.protein,
        carbs: selectedRecipe.carbs,
        fat: selectedRecipe.fat,
        tags: selectedRecipe.tags,
      });
      onClose();
      // Reset state
      setStep(1);
      setSelectedRecipe(null);
      setSearch('');
    }
  };

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
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-modal overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
            <h2 className="font-bold text-[#171d16]">Log a Meal</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Step 1: Select type & search */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Meal Type</label>
              <div className="grid grid-cols-4 gap-2">
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border-2 ${
                      selectedType === type
                        ? 'bg-[#4caf50] border-[#4caf50] text-white'
                        : 'bg-white border-[#becab9] text-[#3f4a3c] hover:border-[#4caf50]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Find Recipe</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
                <input
                  type="text"
                  placeholder="Search breakfast, chicken, salad..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm outline-none"
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredRecipes.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border-2 ${
                      selectedRecipe?.id === recipe.id
                        ? 'bg-[#eaf0e4] border-[#4caf50]'
                        : 'bg-white border-transparent hover:bg-[#f0f6ea]'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{recipe.emoji}</span>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-bold text-[#171d16] truncate">{recipe.name}</p>
                      <div className="flex gap-3 text-[10px] text-[#6f7a6b] mt-0.5">
                        <span className="flex items-center gap-1"><Flame size={10} /> {recipe.calories} kcal</span>
                        <span className="flex items-center gap-1"><Zap size={10} /> P: {recipe.protein}g</span>
                      </div>
                    </div>
                    {selectedRecipe?.id === recipe.id && (
                      <div className="w-5 h-5 rounded-full bg-[#4caf50] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-between">
            <div className="text-left">
              {selectedRecipe && (
                <p className="text-xs font-semibold text-[#3f4a3c]">
                  Selected: <span className="text-[#006e1c]">{selectedRecipe.name}</span>
                </p>
              )}
            </div>
            <button
              disabled={!selectedRecipe}
              onClick={handleLog}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                selectedRecipe
                  ? 'bg-[#4caf50] text-white shadow-[#4caf50]/20 hover:bg-[#006e1c] active:scale-95'
                  : 'bg-[#becab9] text-white cursor-not-allowed opacity-50'
              }`}
            >
              Add to {selectedType}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
