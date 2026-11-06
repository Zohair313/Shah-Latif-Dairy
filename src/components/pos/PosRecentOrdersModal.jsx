import React from 'react';
import { 
  X, 
  Receipt, 
  Printer, 
  ShoppingBag
} from 'lucide-react';
import { formatPKR } from '../../utils/formatters';

export default function PosRecentOrdersModal({ isOpen, onClose, orders = [], onReprint }) {
  if (!isOpen) return null;

  const totalRevenue = orders.reduce((acc, o) => acc + (o.grandTotal || 0), 0);
  const cashTotal = orders.filter(o => o.paymentMethod === 'Cash').reduce((acc, o) => acc + (o.grandTotal || 0), 0);
  const digitalTotal = orders.filter(o => o.paymentMethod !== 'Cash').reduce((acc, o) => acc + (o.grandTotal || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-stone-200 bg-[#FAF7F0] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#2C221E]">
                Shift Transaction History
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Counter 01 • Main Road, Latifabad Unit 7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shift Revenue Metric Badges - Responsive 1 col on mobile, 3 col on tablet+ */}
        <div className="p-3 sm:p-4 bg-white border-b border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <div className="p-2.5 sm:p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
            <div className="text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase">Total Sales</div>
            <div className="font-serif-display font-black text-base sm:text-lg text-amber-950 mt-0.5">
              {formatPKR(totalRevenue)}
            </div>
            <div className="text-[10px] text-amber-800 font-medium">{orders.length} Orders Completed</div>
          </div>

          <div className="p-2.5 sm:p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
            <div className="text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase">Cash in Drawer</div>
            <div className="font-serif-display font-black text-base sm:text-lg text-emerald-950 mt-0.5">
              {formatPKR(cashTotal)}
            </div>
            <div className="text-[10px] text-emerald-800 font-medium">Physical Cash Tendered</div>
          </div>

          <div className="p-2.5 sm:p-3 bg-blue-50/60 rounded-xl border border-blue-200/80">
            <div className="text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase">Digital / JazzCash</div>
            <div className="font-serif-display font-black text-base sm:text-lg text-blue-950 mt-0.5">
              {formatPKR(digitalTotal)}
            </div>
            <div className="text-[10px] text-blue-800 font-medium">Online Transfers</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          {orders.length > 0 ? (
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
              {orders.map((order) => (
                <div key={order.orderNumber} className="p-3 sm:p-3.5 hover:bg-stone-50/80 flex items-center justify-between gap-2.5 sm:gap-3 transition-colors">
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#2C221E]">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[9px] sm:text-[10px] bg-stone-100 px-1.5 py-0.2 rounded-full font-semibold text-stone-600">
                        {order.orderType}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {order.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-stone-600 truncate">
                      {order.items.map(it => `${it.quantity}x ${it.name} (${it.portionLabel})`).join(', ')}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-500">
                      <span>Customer: <strong>{order.customerName || 'Walk-in'}</strong></span>
                      <span>•</span>
                      <span>Mode: <strong>{order.paymentMethod}</strong></span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <div className="font-serif-display font-extrabold text-xs sm:text-sm text-[#059669]">
                      {formatPKR(order.grandTotal)}
                    </div>
                    <button
                      onClick={() => onReprint(order)}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-800 hover:text-amber-950 font-semibold px-2 py-0.5 sm:py-1 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      <span>View Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 text-stone-400 space-y-2">
              <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-stone-300" />
              <p className="text-xs">No orders recorded in this shift yet.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#2C221E] text-white text-xs font-bold hover:bg-stone-900 transition-colors"
          >
            Close History
          </button>
        </div>

      </div>
    </div>
  );
}
