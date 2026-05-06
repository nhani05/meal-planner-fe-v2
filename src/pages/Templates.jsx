import { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Pencil, X, Check, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useMealStore } from '../stores/mealStore';
import { getMealPlans } from '../api/mealApi';

export default function Templates() {
  const user = useAuthStore((state) => state.user);
  const accountId = user?.id;

  const templates = useMealStore((state) => state.templates);
  const fetchTemplates = useMealStore((state) => state.fetchTemplates);
  const isLoadingTemplates = useMealStore((state) => state.isLoadingTemplates);
  const saveTemplate = useMealStore((state) => state.saveTemplate);
  const isSavingTemplate = useMealStore((state) => state.isSavingTemplate);
  const updateTemplateName = useMealStore((state) => state.updateTemplateName);
  const removeTemplate = useMealStore((state) => state.removeTemplate);

  const [plans, setPlans] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSourcePlanId, setNewSourcePlanId] = useState('');
  const [createError, setCreateError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    if (accountId) {
      fetchTemplates(accountId);
      getMealPlans(accountId).then((res) => setPlans(res.data || [])).catch(() => setPlans([]));
    }
  }, [accountId, fetchTemplates]);

  const handleCreate = async () => {
    if (!newName.trim()) {
      setCreateError('Template name is required');
      return;
    }
    if (!newSourcePlanId) {
      setCreateError('Please select a source plan');
      return;
    }
    setCreateError('');
    const ok = await saveTemplate(newName.trim(), Number(newSourcePlanId));
    if (ok) {
      setNewName('');
      setNewSourcePlanId('');
      setIsCreateOpen(false);
      fetchTemplates(accountId);
    }
  };

  const handleEditStart = (t) => {
    setEditingId(t.id || t.templateId);
    setEditName(t.templateName || t.name || '');
  };

  const handleEditSave = async () => {
    if (!editName.trim()) return;
    const ok = await updateTemplateName(editingId, editName.trim());
    if (ok) {
      setEditingId(null);
      fetchTemplates(accountId);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(id);
    const ok = await removeTemplate(id);
    if (!ok) setIsDeleting(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#171d16]">Saved Templates</h2>
          <p className="text-sm text-[#6f7a6b] font-medium">
            {templates.length} template{templates.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button
          onClick={() => { setIsCreateOpen(true); setCreateError(''); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4caf50] text-white text-sm font-bold shadow-lg shadow-[#4caf50]/20 hover:bg-[#006e1c] transition-all active:scale-95"
        >
          <Plus size={18} />
          New Template
        </button>
      </div>

      {/* Templates Grid */}
      {isLoadingTemplates ? (
        <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-12 flex items-center justify-center">
          <Loader2 size={32} className="text-[#4caf50] animate-spin" />
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#becab9] shadow-card p-12 text-center">
          <FileText size={48} className="text-[#becab9] mx-auto mb-4" />
          <h3 className="font-bold text-[#171d16] mb-1">No templates yet</h3>
          <p className="text-sm text-[#6f7a6b] mb-6">Save a meal plan as a template to reuse it later.</p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4caf50] text-white text-sm font-bold shadow-lg shadow-[#4caf50]/20 hover:bg-[#006e1c] transition-all active:scale-95"
          >
            <Plus size={18} />
            Create First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {templates.map((t) => {
              const id = t.id || t.templateId;
              const isEditing = editingId === id;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl border border-[#becab9] shadow-card p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eaf0e4] flex items-center justify-center text-[#006e1c] shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleEditSave(); if (e.key === 'Escape') setEditingId(null); }}
                            className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 text-sm font-bold outline-none"
                            autoFocus
                          />
                          <button
                            onClick={handleEditSave}
                            className="p-1 rounded-lg bg-[#4caf50] text-white hover:bg-[#006e1c] transition-colors"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 rounded-lg bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-bold text-[#171d16] truncate">{t.templateName || t.name || 'Untitled'}</h3>
                      )}
                      <div className="flex items-center gap-1.5 text-[10px] text-[#6f7a6b] mt-1">
                        <Calendar size={12} />
                        <span>
                          {t.savedAt || t.createdAt
                            ? new Date(t.savedAt || t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Unknown date'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eaf0e4]">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => handleEditStart(t)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#f5fbef] transition-colors"
                        >
                          <Pencil size={14} />
                          Rename
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          disabled={isDeleting === id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors disabled:opacity-50"
                        >
                          {isDeleting === id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create Template Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-[#171d16]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-modal overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
                <div>
                  <h2 className="font-bold text-[#171d16]">New Template</h2>
                  <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider mt-0.5">Save a plan as template</p>
                </div>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mb-1.5 block">Template Name</label>
                  <input
                    type="text"
                    placeholder="e.g. High Protein Weekday"
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value); setCreateError(''); }}
                    className="w-full px-4 py-3 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mb-1.5 block">Source Plan</label>
                  <select
                    value={newSourcePlanId}
                    onChange={(e) => { setNewSourcePlanId(e.target.value); setCreateError(''); }}
                    className="w-full px-4 py-3 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm outline-none"
                  >
                    <option value="">Select a meal plan...</option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.planName || `Plan ${p.planDate}`} ({p.planDate})
                      </option>
                    ))}
                  </select>
                  {plans.length === 0 && (
                    <p className="text-xs text-[#ba1a1a] mt-1.5">No saved meal plans found. Create a plan in Meal Planner first.</p>
                  )}
                </div>
                {createError && <p className="text-xs text-[#ba1a1a]">{createError}</p>}
              </div>

              <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isSavingTemplate}
                  onClick={handleCreate}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#4caf50] text-white shadow-lg shadow-[#4caf50]/20 hover:bg-[#006e1c] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSavingTemplate ? <Loader2 size={14} className="animate-spin" /> : null}
                  Save Template
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
