import { useState, useEffect } from 'react';
import { Tag, Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as dishApi from '../../api/dishApi';
import { useUiStore } from '../../stores/uiStore';

function CategoryModal({ isOpen, onClose, category, onSave }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
    } else {
      setName('');
    }
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (category?.id) {
        await dishApi.updateCategory(category.id, name.trim());
        useUiStore.getState().showToast('Category updated', 'success');
      } else {
        await dishApi.createCategory(name.trim());
        useUiStore.getState().showToast('Category created', 'success');
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
          className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#171d16]">{category ? 'Edit Category' : 'New Category'}</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b]"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-[#6f7a6b] uppercase mb-1 block">Category Name</label>
              <input
                type="text"
                placeholder="Enter category name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm outline-none transition-all"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#eaf0e4]">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#f0f6ea] transition-all">Cancel</button>
              <button type="submit" disabled={saving || !name.trim()}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#4caf50] text-white hover:bg-[#006e1c] transition-all disabled:opacity-50 flex items-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {category ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    dishApi.getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? This cannot be undone.')) return;
    setActionId(id);
    try {
      await dishApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      useUiStore.getState().showToast('Category deleted', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Delete failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setActionId(null);
    }
  };

  const openCreate = () => { setEditingCategory(null); setModalOpen(true); };
  const openEdit = (category) => { setEditingCategory(category); setModalOpen(true); };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#171d16]">Categories</h1>
          <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Manage dish categories</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4caf50] text-white text-sm font-bold hover:bg-[#006e1c] transition-all shadow-lg shadow-[#4caf50]/20">
          <Plus size={16} /> New Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#becab9]/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={28} className="text-[#4caf50] animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f5fbef]">
                <tr>
                  <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">ID</th>
                  <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Name</th>
                  <th className="text-right px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaf0e4]">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f5fbef]/50 transition-colors">
                    <td className="px-5 py-3.5 text-[#171d16] font-medium">{c.id}</td>
                    <td className="px-5 py-3.5 text-[#171d16] font-semibold flex items-center gap-2">
                      <Tag size={14} className="text-[#4caf50]" /> {c.name}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(c)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#0061a4] hover:bg-[#d1e4ff] transition-colors">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(c.id)} disabled={actionId === c.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors">
                          {actionId === c.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-[#6f7a6b] text-sm">No categories found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CategoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} category={editingCategory} onSave={fetchCategories} />
    </div>
  );
}
