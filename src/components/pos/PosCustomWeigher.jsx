import React, { useState } from 'react';
import { Scale, Plus, X } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPKR } from '../../utils/formatters';

export default function PosCustomWeigher({ onAddCustomItem, onClose }) {
  // Available base products suitable for custom scale weighing
  const weighableProducts = PRODUCTS.filter(p => ['milk', 'rabri', 'ghee-butter', 'yogurt'].includes(p.category));

  const [selectedProduct, setSelectedProduct] = useState(weighableProducts[0]);
  const [calculationMode, setCalculationMode] = useState('by-amount'); // 'by-amount' or 'by-weight'
  const [targetAmount, setTargetAmount] = useState('150');
  const [targetGrams, setTargetGrams] = useState('500');

  // Calculations
  const ratePerGram = selectedProduct.basePrice / 1000;

  let calculatedWeightGrams = 0;
  let calculatedPrice = 0;

  if (calculationMode === 'by-amount') {
    const amt = parseFloat(targetAmount) || 0;
    calculatedPrice = amt;
    calculatedWeightGrams = ratePerGram > 0 ? Math.round((amt / ratePerGram)) : 0;
  } else {
    const g = parseFloat(targetGrams) || 0;
    calculatedWeightGrams = g;
    calculatedPrice = Math.round(g * ratePerGram);
  }

  const handleAdd = () => {
    if (calculatedPrice <= 0 || calculatedWeightGrams <= 0) return;

    const portionLabel = calculatedWeightGrams >= 1000 
      ? `${(calculatedWeightGrams / 1000).toFixed(2)} KG (Custom Scale)` 
      : `${calculatedWeightGrams}g (Custom Scale)`;

    onAddCustomItem({
      productId: selectedProduct.id,
      name: `${selectedProduct.name}`,
      portionLabel: portionLabel,
      unitPrice: calculatedPrice,
      quantity: 1,
      image: selectedProduct.image,
      isCustomScale: true
    });

    if (onClose) onClose();
  };

  return (
    <div className="bg-[#FAF7F0] rounded-2xl p-3 sm:p-4 border border-[#E8DEC8] space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <h4 className="font-bold text-[11px] sm:text-xs text-[#2C221E] uppercase tracking-wider truncate">
            Custom Loose Weigher & Scale (تول کے حساب سے)
          </h4>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {/* Product Selector */}
        <div>
          <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-600 mb-1">
            Dairy Item:
          </label>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const p = weighableProducts.find(item => item.id === e.target.value);
              if (p) setSelectedProduct(p);
            }}
            className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl border border-stone-200 bg-white"
          >
            {weighableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({formatPKR(p.basePrice)}/{p.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Mode Toggle */}
        <div>
          <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-600 mb-1">
            Calculate By:
          </label>
          <div className="grid grid-cols-2 gap-1 bg-stone-200/70 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCalculationMode('by-amount')}
              className={`py-1.5 px-2 rounded-lg transition-colors text-center text-xs ${
                calculationMode === 'by-amount' ? 'bg-[#2C221E] text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              Amount (Rs.)
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode('by-weight')}
              className={`py-1.5 px-2 rounded-lg transition-colors text-center text-xs ${
                calculationMode === 'by-weight' ? 'bg-[#2C221E] text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              Weight (g)
            </button>
          </div>
        </div>

        {/* Input Value */}
        <div>
          <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-600 mb-1">
            {calculationMode === 'by-amount' ? 'Enter Cash (PKR):' : 'Enter Weight (Grams):'}
          </label>
          <input
            type="number"
            min="10"
            step="10"
            value={calculationMode === 'by-amount' ? targetAmount : targetGrams}
            onChange={(e) => {
              if (calculationMode === 'by-amount') {
                setTargetAmount(e.target.value);
              } else {
                setTargetGrams(e.target.value);
              }
            }}
            className="w-full text-xs font-bold py-2 px-3 rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Quick Amount Presets */}
      <div className="overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs min-w-max">
          <span className="text-[10px] text-stone-500 font-semibold uppercase">Presets:</span>
          {['50', '100', '150', '200', '250', '500'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setCalculationMode('by-amount');
                setTargetAmount(preset);
              }}
              className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 text-[11px] font-medium hover:border-amber-400"
            >
              Rs. {preset}
            </button>
          ))}
          {['250', '500', '750', '1000'].map((gram) => (
            <button
              key={`g-${gram}`}
              type="button"
              onClick={() => {
                setCalculationMode('by-weight');
                setTargetGrams(gram);
              }}
              className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700 text-[11px] font-medium hover:border-amber-400"
            >
              {gram}g
            </button>
          ))}
        </div>
      </div>

      {/* Result & Add Button */}
      <div className="pt-2 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="text-xs">
          <span className="text-stone-500 text-[11px]">Portion: </span>
          <strong className="text-emerald-700 text-xs sm:text-sm">
            {calculatedWeightGrams >= 1000 
              ? `${(calculatedWeightGrams / 1000).toFixed(2)} KG` 
              : `${calculatedWeightGrams} Grams`}
          </strong>
          <span className="text-stone-400 mx-1">•</span>
          <span className="text-stone-500 text-[11px]">Price: </span>
          <strong className="text-[#2C221E] text-xs sm:text-sm">{formatPKR(calculatedPrice)}</strong>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Weight</span>
        </button>
      </div>
    </div>
  );
}
