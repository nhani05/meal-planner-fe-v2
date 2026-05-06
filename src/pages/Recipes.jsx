import { useState } from 'react';
import RecipeCard from '../components/ui/RecipeCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const allTags = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Vegan', 'High Protein', 'Gluten-Free', 'Easy'];

export default function Recipes() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const recipes = []; // TODO: fetch from API in Phase 3
  const filtered = recipes.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || r.tags.includes(activeTag) || r.difficulty === activeTag;
    return matchSearch && matchTag;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
          <input
            type="text"
            placeholder="Search recipes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#becab9] text-sm text-[#171d16] placeholder-[#6f7a6b] focus:outline-none focus:border-[#4caf50] focus:ring-2 transition"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#becab9] text-sm text-[#3f4a3c] font-medium hover:bg-[#eaf0e4] transition-colors">
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              activeTag === tag
                ? 'bg-[#4caf50] text-white'
                : 'bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-xs text-[#6f7a6b]">
        Showing <strong className="text-[#171d16]">{filtered.length}</strong> recipes
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="font-semibold text-[#171d16]">No recipes found</p>
          <p className="text-sm text-[#6f7a6b] mt-1">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}
