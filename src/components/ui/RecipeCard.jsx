import Chip from './Chip';
import { Clock, Users, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const difficultyColor = {
  Easy: 'text-[#006e1c] bg-[#eaf0e4]',
  Medium: 'text-[#0061a4] bg-[#d1e4ff]',
  Hard: 'text-[#a63360] bg-[#ffd9e2]',
};

export default function RecipeCard({ recipe }) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl border border-[#becab9]/50 shadow-card hover:shadow-xl transition-all overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      {/* Hero */}
      <div className="h-40 bg-gradient-to-br from-[#f5fbef] to-[#dee4d9] flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]" />
        <span className="text-6xl group-hover:scale-125 transition-transform duration-500 z-10 drop-shadow-sm">
          {recipe.emoji}
        </span>
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${difficultyColor[recipe.difficulty]}`}>
            {recipe.difficulty}
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
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#006e1c]" />{recipe.time}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#0061a4]" />{recipe.servings} Serv.</span>
            <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#a63360]" />{recipe.calories} kcal</span>
          </div>

          {/* Nutritional Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#006e1c] bg-[#eaf0e4] px-2 py-0.5 rounded-md min-w-[32px] text-center">{recipe.protein}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Prot</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#0061a4] bg-[#d1e4ff] px-2 py-0.5 rounded-md min-w-[32px] text-center">{recipe.carbs}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Carb</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#a63360] bg-[#ffd9e2] px-2 py-0.5 rounded-md min-w-[32px] text-center">{recipe.fat}g</span>
              <span className="text-[8px] font-bold text-[#6f7a6b] uppercase mt-1">Fat</span>
            </div>
          </div>
        </div>

        {/* Dietary Category Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#f5fbef]">
          {recipe.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
