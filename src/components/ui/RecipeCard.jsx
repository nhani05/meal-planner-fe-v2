import Chip from './Chip';
import { Clock, Users, Flame, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const difficultyColor = {
  Easy: 'text-[#006e1c] bg-[#eaf0e4]',
  Medium: 'text-[#0061a4] bg-[#d1e4ff]',
  Hard: 'text-[#a63360] bg-[#ffd9e2]',
};

const categoryEmojiMap = {
  Breakfast: '🍳',
  Lunch: '🥗',
  Dinner: '🍝',
  Snack: '🍪',
  Vegan: '🌿',
  'High Protein': '🥩',
  'Gluten-Free': '🌾',
  Easy: '⭐',
};

function getEmoji(dish) {
  if (dish.emoji) return dish.emoji;
  const cat = dish.categoryName || dish.category?.name;
  return categoryEmojiMap[cat] || '🍽️';
}

function getDifficulty(dish) {
  if (dish.difficulty) return dish.difficulty;
  const cal = dish.calories || dish.nutritionInfo?.caloriesKcal || 0;
  if (cal < 300) return 'Easy';
  if (cal < 600) return 'Medium';
  return 'Hard';
}

function getCalories(dish) {
  return dish.nutritionInfo?.caloriesKcal || dish.calories || 0;
}

function getMacro(dish, key) {
  return dish.nutritionInfo?.[key] || dish[key] || 0;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, onClick }) {
  const difficulty = getDifficulty(recipe);
  const calories = getCalories(recipe);
  const protein = getMacro(recipe, 'proteinG');
  const carbs = getMacro(recipe, 'carbG');
  const fat = getMacro(recipe, 'fatG');
  const tags = recipe.tags || [recipe.categoryName || recipe.category?.name].filter(Boolean);
  const time = recipe.time || '30 min';
  const servings = recipe.servings || 2;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl border border-[#becab9]/50 shadow-card hover:shadow-xl transition-all overflow-hidden cursor-pointer group flex flex-col h-full relative"
      onClick={onClick}
    >
      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-3 left-3 z-20 p-2 rounded-full transition-all shadow-sm ${
            isFavorite
              ? 'bg-[#a63360] text-white'
              : 'bg-white/80 text-[#6f7a6b] hover:bg-white hover:text-[#a63360]'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      )}

      {/* Hero */}
      <div className="h-40 bg-gradient-to-br from-[#f5fbef] to-[#dee4d9] flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]" />
        <span className="text-6xl group-hover:scale-125 transition-transform duration-500 z-10 drop-shadow-sm">
          {getEmoji(recipe)}
        </span>
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        {/* Hover Action */}
        <div className="absolute bottom-3 right-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="bg-white p-2 rounded-xl shadow-lg text-[#006e1c]">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="font-extrabold text-[#171d16] text-base leading-tight group-hover:text-[#006e1c] transition-colors">{recipe.name}</h3>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-[#6f7a6b] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#006e1c]" />{time}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#0061a4]" />{servings} Serv.</span>
            <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#a63360]" />{calories} kcal</span>
          </div>

          {/* Nutritional Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#006e1c] bg-[#eaf0e4] px-2 py-0.5 rounded-md min-w-[32px] text-center">{protein}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Prot</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#0061a4] bg-[#d1e4ff] px-2 py-0.5 rounded-md min-w-[32px] text-center">{carbs}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Carb</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#a63360] bg-[#ffd9e2] px-2 py-0.5 rounded-md min-w-[32px] text-center">{fat}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Fat</span>
            </div>
          </div>
        </div>

        {/* Dietary Category Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#f5fbef]">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
