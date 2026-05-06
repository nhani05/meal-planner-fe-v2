import { X, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TemplateListModal({ isOpen, onClose, templates, isLoading, onSelect }) {
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
          className="relative bg-white w-full max-w-md rounded-2xl shadow-modal overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
            <div>
              <h2 className="font-bold text-[#171d16]">Choose a Template</h2>
              <p className="text-[10px] font-bold text-[#6f7a6b] uppercase tracking-wider mt-0.5">Saved templates</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 max-h-80 overflow-y-auto space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={24} className="text-[#4caf50] animate-spin" />
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={32} className="text-[#becab9] mx-auto mb-2" />
                <p className="text-sm text-[#6f7a6b]">No templates saved yet.</p>
                <p className="text-xs text-[#becab9] mt-1">Save a plan as template from the detail view.</p>
              </div>
            ) : (
              templates.map((t) => (
                <button
                  key={t.templateId || t.id}
                  onClick={() => { onSelect(t); onClose(); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#eaf0e4] hover:border-[#4caf50] hover:bg-[#f5fbef] transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eaf0e4] flex items-center justify-center text-[#006e1c]">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#171d16] truncate">{t.templateName || t.name}</p>
                    {t.createdAt && (
                      <p className="text-[10px] text-[#6f7a6b]">
                        {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
