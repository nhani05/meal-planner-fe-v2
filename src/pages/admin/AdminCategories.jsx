import { useState, useEffect } from 'react';
import { Tag, Plus, Pencil, Trash2, Loader2, Lock } from 'lucide-react';
import * as dishApi from '../../api/dishApi';
import { useUiStore } from '../../stores/uiStore';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dishApi.getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    useUiStore.getState().showToast('Category creation is coming soon (BE pending)', 'info');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#171d16]">Categories</h1>
          <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Manage dish categories</p>
        </div>
        <button onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#becab9] text-white text-sm font-bold opacity-60 cursor-not-allowed">
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
                        <button disabled title="Coming soon"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#becab9] cursor-not-allowed opacity-50">
                          <Pencil size={14} />
                        </button>
                        <button disabled title="Coming soon"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#becab9] cursor-not-allowed opacity-50">
                          <Trash2 size={14} />
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

      <div className="p-4 rounded-xl bg-[#ffecb3]/30 border border-[#ffecb3] text-[#ff8f00] text-xs font-semibold flex items-center gap-2">
        <Lock size={14} /> Add / Edit / Delete categories will be enabled when the backend endpoints are ready.
      </div>
    </div>
  );
}
