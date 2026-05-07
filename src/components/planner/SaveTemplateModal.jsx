import { useState } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SaveTemplateModal({ isOpen, onClose, onConfirm, onOverwrite, isSaving, existingTemplates = [] }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [overwriteTarget, setOverwriteTarget] = useState(null); // { id, templateName }

  const handleConfirm = () => {
    if (!name.trim()) {
      setError('Template name is required');
      return;
    }

    const duplicate = existingTemplates.find(
      (t) => (t.templateName || t.name || '').toLowerCase() === name.trim().toLowerCase()
    );

    if (duplicate) {
      setOverwriteTarget(duplicate);
      return;
    }

    setError('');
    onConfirm(name.trim());
    setName('');
  };

  const handleOverwriteConfirm = () => {
    if (overwriteTarget && onOverwrite) {
      onOverwrite(overwriteTarget.templateId || overwriteTarget.id, name.trim());
    }
    setOverwriteTarget(null);
    setName('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setError('');
    setOverwriteTarget(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[#171d16]/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-sm rounded-2xl shadow-modal overflow-hidden"
        >
          {overwriteTarget ? (
            /* Overwrite confirmation panel */
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
                <div className="flex items-center gap-2 text-[#e65100]">
                  <AlertTriangle size={18} />
                  <h2 className="font-bold text-[#171d16]">Template Already Exists</h2>
                </div>
                <button onClick={handleClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#3f4a3c] leading-relaxed">
                  A template named <span className="font-bold text-[#171d16]">"{overwriteTarget.templateName || overwriteTarget.name}"</span> already exists. Do you want to overwrite it?
                </p>
              </div>
              <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-end gap-3">
                <button
                  onClick={() => setOverwriteTarget(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
                >
                  Rename
                </button>
                <button
                  disabled={isSaving}
                  onClick={handleOverwriteConfirm}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#e65100] text-white shadow-lg shadow-[#e65100]/20 hover:bg-[#bf360c] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                  Overwrite
                </button>
              </div>
            </>
          ) : (
            /* Normal save panel */
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
                <div>
                  <h2 className="font-bold text-[#171d16]">Save as Template</h2>
                  <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider mt-0.5">Name your template</p>
                </div>
                <button onClick={handleClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mb-1.5 block">Template Name</label>
                  <input
                    type="text"
                    placeholder="e.g. High Protein Weekday"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    className="w-full px-4 py-3 rounded-xl bg-[#f0f6ea] border-transparent focus:bg-white focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 transition-all text-sm outline-none"
                  />
                  {error && <p className="text-xs text-[#ba1a1a] mt-1.5">{error}</p>}
                </div>
              </div>

              <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isSaving}
                  onClick={handleConfirm}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#4caf50] text-white shadow-lg shadow-[#4caf50]/20 hover:bg-[#006e1c] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                  Save
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
