import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
  };

  const bgStyles = {
    success: "border-emerald-200 bg-[#f4fbf7]/95",
    error: "border-red-200 bg-[#fdf5f5]/95",
    info: "border-amber-200 bg-[#fffdf5]/95"
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-50 max-w-md sm:w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-3.5 sm:p-4 rounded-xl border shadow-xl flex items-start gap-2.5 sm:gap-3 backdrop-blur-md ${bgStyles[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-xs sm:text-sm min-w-0">
          <p className="font-semibold text-[#2C221E] truncate">{toast.title}</p>
          {toast.message && <p className="text-stone-600 mt-0.5 text-[11px] sm:text-xs leading-snug">{toast.message}</p>}
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-[#2C221E] transition-colors p-1 shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
