import { useEffect } from 'react';
import { useUiStore } from '../../stores/uiStore';

export default function Toast() {
  const toast = useUiStore((state) => state.toast);
  const hideToast = useUiStore((state) => state.hideToast);

  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => hideToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast?.visible) return null;

  const bgColor =
    toast.type === 'error'
      ? 'bg-red-500'
      : toast.type === 'success'
        ? 'bg-green-500'
        : 'bg-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColor} text-white px-4 py-3 rounded shadow-lg`}>
        {toast.message}
      </div>
    </div>
  );
}
