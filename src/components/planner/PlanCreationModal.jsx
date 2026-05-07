import { useState } from 'react';
import { X, FilePlus, Copy, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlanCreationModal({ isOpen, onClose, onCreateNew, onUseTemplate }) {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = async () => {
    setIsCreating(true);
    try {
      await onCreateNew();
    } finally {
      setIsCreating(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isCreating ? undefined : onClose}
          className="absolute inset-0 bg-[#171d16]/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-2xl shadow-modal overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
            <h2 className="font-bold text-[#171d16]">Create Plan</h2>
            <button
              onClick={onClose}
              disabled={isCreating}
              className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <button
              onClick={handleCreateNew}
              disabled={isCreating}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-[#eaf0e4] hover:border-[#4caf50] hover:bg-[#f5fbef] transition-all text-left group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eaf0e4] flex items-center justify-center text-[#006e1c] group-hover:bg-[#4caf50] group-hover:text-white transition-colors shrink-0">
                {isCreating ? <Loader2 size={24} className="animate-spin" /> : <FilePlus size={24} />}
              </div>
              <div>
                <p className="font-bold text-[#171d16]">{isCreating ? 'Creating plan…' : 'Create from Scratch'}</p>
                <p className="text-xs text-[#6f7a6b]">Start with an empty meal plan</p>
              </div>
            </button>

            <button
              onClick={() => { onUseTemplate(); onClose(); }}
              disabled={isCreating}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-[#eaf0e4] hover:border-[#4caf50] hover:bg-[#f5fbef] transition-all text-left group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eaf0e4] flex items-center justify-center text-[#006e1c] group-hover:bg-[#4caf50] group-hover:text-white transition-colors">
                <Copy size={24} />
              </div>
              <div>
                <p className="font-bold text-[#171d16]">Use Template</p>
                <p className="text-xs text-[#6f7a6b]">Apply a saved meal plan template</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
