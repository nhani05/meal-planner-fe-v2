import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X, Loader2, Plus as PlusIcon, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as adminApi from '../../api/adminApi';
import * as dishApi from '../../api/dishApi';
import { useUiStore } from '../../stores/uiStore';
import i18n from '../../i18n';

const difficulties = ['easy', 'medium', 'hard'];

function DishModal({ isOpen, onClose, dish, categories, onSave }) {
  const [form, setForm] = useState({
    dish: { name: '', categoryId: '', imageUrl: '', difficulty: 'easy', totalTimeMin: 30 },
    nutrition: { caloriesPer100g: 0, proteinPer100g: 0, carbPer100g: 0, fatPer100g: 0 },
    ingredients: [],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (dish) {
      setForm({
        dish: {
          name: dish.name || '',
          categoryId: dish.categoryId || '',
          imageUrl: dish.imageUrl || '',
          difficulty: dish.difficulty || 'easy',
          totalTimeMin: dish.totalTimeMin || 30,
        },
        nutrition: {
          caloriesPer100g: dish.nutritionInfo?.caloriesPer100g || 0,
          proteinPer100g: dish.nutritionInfo?.proteinPer100g || 0,
          carbPer100g: dish.nutritionInfo?.carbPer100g || 0,
          fatPer100g: dish.nutritionInfo?.fatPer100g || 0,
        },
        ingredients: dish.ingredients ? [...dish.ingredients] : [],
      });
    } else {
      setForm({
        dish: { name: '', categoryId: '', imageUrl: '', difficulty: 'easy', totalTimeMin: 30 },
        nutrition: { caloriesPer100g: 0, proteinPer100g: 0, carbPer100g: 0, fatPer100g: 0 },
        ingredients: [],
      });
    }
  }, [dish, isOpen]);

  const updateDish = (field, value) => setForm((s) => ({ ...s, dish: { ...s.dish, [field]: value } }));
  const updateNutrition = (field, value) => setForm((s) => ({ ...s, nutrition: { ...s.nutrition, [field]: Number(value) } }));

  const addIngredient = () => setForm((s) => ({ ...s, ingredients: [...s.ingredients, { name: '', quantityG: 100, unit: 'g' }] }));
  const removeIngredient = (idx) => setForm((s) => ({ ...s, ingredients: s.ingredients.filter((_, i) => i !== idx) }));
  const updateIngredient = (idx, field, value) => {
    setForm((s) => {
      const list = [...s.ingredients];
      list[idx] = { ...list[idx], [field]: field === 'quantityG' ? Number(value) : value };
      return { ...s, ingredients: list };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.dish.name || !form.dish.categoryId) return;
    setSaving(true);
    try {
      if (dish?.id) {
        await adminApi.updateAdminDish(dish.id, form);
        useUiStore.getState().showToast(i18n.t('toast.dishUpdated'), 'success');
      } else {
        await adminApi.createAdminDish(form);
        useUiStore.getState().showToast(i18n.t('toast.dishCreated'), 'success');
      }
      onSave();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Save failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#171d16]">{dish ? 'Edit Dish' : 'New Dish'}</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b]"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dish info */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Dish Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required type="text" placeholder="Name" value={form.dish.name} onChange={(e) => updateDish('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                <select value={form.dish.categoryId} onChange={(e) => updateDish('categoryId', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all">
                  <option value="">Select category</option>
                  {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
                <input type="text" placeholder="Image URL" value={form.dish.imageUrl} onChange={(e) => updateDish('imageUrl', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                <div className="flex gap-2">
                  <select value={form.dish.difficulty} onChange={(e) => updateDish('difficulty', e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all">
                    {difficulties.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                  <input type="number" min={0} placeholder="Time (min)" value={form.dish.totalTimeMin} onChange={(e) => updateDish('totalTimeMin', Number(e.target.value))}
                    className="w-28 px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Nutrition (per 100g)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Calories', key: 'caloriesPer100g' },
                  { label: 'Protein (g)', key: 'proteinPer100g' },
                  { label: 'Carbs (g)', key: 'carbPer100g' },
                  { label: 'Fat (g)', key: 'fatPer100g' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-[10px] font-bold text-[#6f7a6b] uppercase mb-1 block">{label}</label>
                    <input type="number" step="0.01" min={0} value={form.nutrition[key]}
                      onChange={(e) => updateNutrition(key, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider">Ingredients</p>
                <button type="button" onClick={addIngredient} className="text-xs font-bold text-[#006e1c] flex items-center gap-1 hover:underline">
                  <PlusIcon size={14} /> Add
                </button>
              </div>
              {form.ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" placeholder="Name" value={ing.name} onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                  <input type="number" min={0} placeholder="Qty (g)" value={ing.quantityG} onChange={(e) => updateIngredient(idx, 'quantityG', e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                  <input type="text" placeholder="Unit" value={ing.unit} onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all" />
                  <button type="button" onClick={() => removeIngredient(idx)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors">
                    <Minus size={14} />
                  </button>
                </div>
              ))}
              {form.ingredients.length === 0 && (
                <p className="text-xs text-[#6f7a6b] italic">No ingredients added yet</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#eaf0e4]">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#f0f6ea] transition-all">Cancel</button>
              <button type="submit" disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#4caf50] text-white hover:bg-[#006e1c] transition-all disabled:opacity-50 flex items-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {dish ? 'Save Changes' : 'Create Dish'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function AdminDishes() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [actionId, setActionId] = useState(null);

  const fetchDishes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAdminDishes({
        keyword: keyword || undefined,
        categoryId: categoryFilter || undefined,
        page: currentPage,
        size: 10,
      });
      setDishes(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load dishes';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [keyword, categoryFilter, currentPage]);

  useEffect(() => {
    fetchDishes();
    dishApi.getCategories().then((res) => setCategories(res.data || [])).catch(() => {});
  }, [fetchDishes]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dish?')) return;
    setActionId(id);
    try {
      await adminApi.deleteAdminDish(id);
      setDishes((prev) => prev.filter((d) => d.id !== id));
      useUiStore.getState().showToast(i18n.t('toast.dishDeleted'), 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Delete failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setActionId(null);
    }
  };

  const openCreate = () => { setEditingDish(null); setModalOpen(true); };
  const openEdit = (dish) => { setEditingDish(dish); setModalOpen(true); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#171d16]">Dishes</h1>
          <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Manage system dishes</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4caf50] text-white text-sm font-bold hover:bg-[#006e1c] transition-all shadow-lg shadow-[#4caf50]/20">
          <Plus size={16} /> New Dish
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
          <input type="text" placeholder="Search dish name..." value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setCurrentPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#becab9]/50 text-sm focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 outline-none transition-all" />
        </div>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(0); }}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#becab9]/50 text-sm focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 outline-none">
          <option value="">All categories</option>
          {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#becab9]/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={28} className="text-[#4caf50] animate-spin" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f5fbef]">
                  <tr>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">ID</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Cal/100g</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Difficulty</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Source</th>
                    <th className="text-right px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf0e4]">
                  {dishes.map((d) => (
                    <tr key={d.id} className="hover:bg-[#f5fbef]/50 transition-colors">
                      <td className="px-5 py-3.5 text-[#171d16] font-medium">{d.id}</td>
                      <td className="px-5 py-3.5 text-[#171d16] font-semibold">{d.name}</td>
                      <td className="px-5 py-3.5 text-[#6f7a6b]">{d.categoryName || d.categoryId}</td>
                      <td className="px-5 py-3.5 text-[#6f7a6b]">{d.nutritionInfo?.caloriesPer100g ?? '-'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                          d.difficulty === 'easy' ? 'bg-[#eaf0e4] text-[#006e1c]' :
                          d.difficulty === 'hard' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#ffecb3] text-[#ff8f00]'
                        }`}>{d.difficulty}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[#6f7a6b] capitalize">{d.source}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(d)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#0061a4] hover:bg-[#d1e4ff] transition-colors"><Pencil size={14} /></button>
                          <button onClick={() => handleDelete(d.id)} disabled={actionId === d.id}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors">
                            {actionId === d.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {dishes.length === 0 && (
                    <tr><td colSpan={7} className="px-5 py-8 text-center text-[#6f7a6b] text-sm">No dishes found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#eaf0e4]">
              <p className="text-xs text-[#6f7a6b]">Page {currentPage + 1} of {totalPages}</p>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"><ChevronLeft size={14} /></button>
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"><ChevronRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      <DishModal isOpen={modalOpen} onClose={() => setModalOpen(false)} dish={editingDish} categories={categories} onSave={fetchDishes} />
    </div>
  );
}
