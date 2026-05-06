import { useState, useEffect } from 'react';
import RecipeCard from '../components/ui/RecipeCard';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useDishStore } from '../stores/dishStore';
import { useAuthStore } from '../stores/authStore';

export default function Recipes() {
  const user = useAuthStore((state) => state.user);
  const accountId = user?.id;

  const dishes = useDishStore((state) => state.dishes);
  const categories = useDishStore((state) => state.categories);
  const favorites = useDishStore((state) => state.favorites);
  const totalPages = useDishStore((state) => state.totalPages);
  const currentPage = useDishStore((state) => state.currentPage);
  const totalElements = useDishStore((state) => state.totalElements);
  const isLoading = useDishStore((state) => state.isLoading);
  const filters = useDishStore((state) => state.filters);
  const fetchDishes = useDishStore((state) => state.fetchDishes);
  const fetchCategories = useDishStore((state) => state.fetchCategories);
  const fetchFavorites = useDishStore((state) => state.fetchFavorites);
  const toggleFavorite = useDishStore((state) => state.toggleFavorite);
  const setFilters = useDishStore((state) => state.setFilters);

  const [search, setSearch] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState('');

  useEffect(() => {
    fetchCategories();
    if (accountId) fetchFavorites(accountId);
    fetchDishes({ page: 0, size: 12 });
  }, [fetchCategories, fetchDishes, fetchFavorites, accountId]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilters({ keyword: value });
    fetchDishes({ keyword: value, categoryId: activeCategoryId, page: 0, size: 12 });
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    setFilters({ categoryId });
    fetchDishes({ keyword: search, categoryId, page: 0, size: 12 });
  };

  const handlePageChange = (page) => {
    fetchDishes({ keyword: search, categoryId: activeCategoryId, page, size: 12 });
  };

  const favIds = favorites.map((f) => f.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
          <input
            type="text"
            placeholder="Search recipes…"
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#becab9] text-sm text-[#171d16] placeholder-[#6f7a6b] focus:outline-none focus:border-[#4caf50] focus:ring-2 transition"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#becab9] text-sm text-[#3f4a3c] font-medium hover:bg-[#eaf0e4] transition-colors">
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => handleCategoryClick('')}
          className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            activeCategoryId === ''
              ? 'bg-[#4caf50] text-white'
              : 'bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              activeCategoryId === cat.id
                ? 'bg-[#4caf50] text-white'
                : 'bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <p className="text-xs text-[#6f7a6b]">
        Showing <strong className="text-[#171d16]">{dishes.length}</strong> of {totalElements} recipes
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="text-[#4caf50] animate-spin" />
        </div>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favIds.includes(recipe.id)}
              onToggleFavorite={() => accountId && toggleFavorite(accountId, recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="font-semibold text-[#171d16]">No recipes found</p>
          <p className="text-sm text-[#6f7a6b] mt-1">Try a different search or filter</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                i === currentPage
                  ? 'bg-[#4caf50] text-white'
                  : 'bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#becab9] text-[#3f4a3c] hover:bg-[#eaf0e4] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
