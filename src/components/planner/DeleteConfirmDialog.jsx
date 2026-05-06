import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
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
          className="relative bg-white w-full max-w-sm rounded-2xl shadow-modal overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaf0e4]">
            <div className="flex items-center gap-2 text-[#ba1a1a]">
              <AlertTriangle size={20} />
              <h2 className="font-bold text-[#171d16]">{title}</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f0f6ea] text-[#6f7a6b] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-[#3f4a3c] leading-relaxed">{message}</p>
          </div>

          <div className="p-6 bg-[#f5fbef] border-t border-[#eaf0e4] flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#6f7a6b] hover:bg-[#eaf0e4] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#ba1a1a] text-white shadow-lg shadow-[#ba1a1a]/20 hover:bg-[#9a0a0a] transition-all active:scale-95"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
