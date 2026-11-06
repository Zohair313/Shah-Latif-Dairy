import React from 'react';
import { Zap, Plus } from 'lucide-react';
import { QUICK_POS_ITEMS } from '../../data/products';
import { formatPKR } from '../../utils/formatters';

export default function PosQuickItems({ onQuickAdd }) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E8DEC8] shadow-xs space-y-2.5 sm:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-600" />
          </div>
          <h3 className="font-bold text-[11px] sm:text-xs text-[#2C221E] uppercase tracking-wider">
            Counter Fast-Picks (1-Tap Add)
          </h3>
        </div>
        <span className="text-[10px] text-stone-500 font-medium hidden xs:inline">Top High-Volume</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
        {QUICK_POS_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onQuickAdd(item)}
            className={`p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-2xs hover:shadow-xs cursor-pointer ${item.color}`}
          >
            <div className="font-semibold text-[11px] sm:text-xs leading-tight line-clamp-1">
              {item.name}
            </div>
            <div className="flex items-baseline justify-between mt-1.5 sm:mt-2 pt-1 border-t border-black/10 gap-1">
              <span className="font-extrabold text-[11px] sm:text-xs truncate">
                {formatPKR(item.price)}
              </span>
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <Plus className="w-2.5 h-2.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
