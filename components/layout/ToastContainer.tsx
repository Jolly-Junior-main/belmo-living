'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-belmo-charcoal text-belmo-ivory p-4 rounded-xl shadow-2xl border border-belmo-charcoal-muted/40 animate-in fade-in slide-in-from-bottom-3 duration-300 backdrop-blur-md"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-belmo-bronze-light" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-belmo-beige" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium tracking-wide text-white">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-belmo-beige/80 mt-1 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-belmo-beige/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
