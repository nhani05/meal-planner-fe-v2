import { X, FilePlus, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlanCreationModal({ isOpen, onClose, onCreateNew, onUseTemplate }) {
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
            <h2 className="font-bold text-[#171d16]">Create Plan</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <button
              onClick={() => { onCreateNew(); onClose(); }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-[#eaf0e4] hover:border-[#4caf50] hover:bg-[#f5fbef] transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eaf0e4] flex items-center justify-center text-[#006e1c] group-hover:bg-[#4caf50] group-hover:text-white transition-colors">
                <FilePlus size={24} />
              </div>
              <div>
                <p className="font-bold text-[#171d16]">Create from Scratch</p>
                <p className="text-xs text-[#6f7a6b]">Start with an empty meal plan</p>
              </div>
            </button>

            <button
              onClick={() => { onUseTemplate(); onClose(); }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-[#eaf0e4] hover:border-[#4caf50] hover:bg-[#f5fbef] transition-all text-left group"
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
