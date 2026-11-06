import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageSquare, 
  Plus, 
  Minus, 
  Check
} from 'lucide-react';
import { formatPKR, generateSingleProductWhatsAppUrl } from '../../utils/formatters';

export default function ProductCard({ product, onAddToCart, onShowToast }) {
  // Find default portion or first portion
  const defaultPortion = product.portions?.find(p => p.default) || product.portions?.[0] || {
    label: `1 ${product.unit}`,
    multiplier: 1,
    priceOverride: product.basePrice
  };

  const [selectedPortion, setSelectedPortion] = useState(defaultPortion);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Compute current price based on selected portion
  const currentUnitPrice = selectedPortion.priceOverride 
    ? selectedPortion.priceOverride 
    : (product.basePrice * (selectedPortion.multiplier || 1));

  const lineTotal = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      nameUrdu: product.nameUrdu,
      category: product.category,
      unit: product.unit,
      portionLabel: selectedPortion.label,
      multiplier: selectedPortion.multiplier || 1,
      unitPrice: currentUnitPrice,
      quantity: quantity,
      image: product.image
    });

    setJustAdded(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Added to Cart',
        message: `${quantity}x ${product.name} (${selectedPortion.label}) added successfully.`
      });
    }

    setTimeout(() => {
      setJustAdded(false);
      setQuantity(1);
    }, 1500);
  };

  const handleQuickWhatsAppOrder = (e) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, selectedPortion);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EBE3D5] hover:border-amber-400/80 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Area */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
          {product.badge && (
            <span className="bg-[#2C221E]/90 backdrop-blur-md text-amber-300 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-400/30 shadow-xs truncate">
              {product.badge}
            </span>
          )}
          {product.fatContent && (
            <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md ml-auto shrink-0">
              {product.fatContent}
            </span>
          )}
        </div>

        {/* Urdu Name & Base Price Bar */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-baseline justify-between text-white gap-2">
          <p className="font-urdu text-xs sm:text-sm text-amber-200 drop-shadow-sm truncate">
            {product.nameUrdu}
          </p>
          <span className="text-[11px] sm:text-xs text-stone-200 shrink-0">
            Base: <strong className="text-white">{formatPKR(product.basePrice)}</strong>/{product.unit}
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        
        {/* Title & Description */}
        <div className="space-y-1 sm:space-y-1.5">
          <h3 className="font-serif-display font-bold text-sm sm:text-base lg:text-lg text-[#2C221E] group-hover:text-amber-800 transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Portion Selector Pills */}
        {product.portions && product.portions.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] font-semibold text-stone-700 flex items-center justify-between">
              <span>Select Size:</span>
              <span className="text-amber-700 font-bold truncate ml-1">{selectedPortion.label}</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {product.portions.map((portion, idx) => {
                const isSelected = selectedPortion.label === portion.label;
                const portionPrice = portion.priceOverride || (product.basePrice * (portion.multiplier || 1));
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`text-left px-2 sm:px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold shadow-xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="truncate text-[10px] sm:text-[11px]">{portion.label}</div>
                    <div className="text-[10px] sm:text-[11px] text-amber-800 font-semibold">{formatPKR(portionPrice)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & Quantity Controls */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-semibold">Total Price</div>
            <div className="font-serif-display font-extrabold text-base sm:text-lg text-[#2C221E]">
              {formatPKR(lineTotal)}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 sm:p-1.5 text-stone-600 hover:text-[#2C221E] hover:bg-white rounded-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 sm:w-7 text-center font-bold text-xs text-[#2C221E]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 sm:p-1.5 text-stone-600 hover:text-[#2C221E] hover:bg-white rounded-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons: Add to Cart & Quick WhatsApp Order */}
        <div className="space-y-1.5 sm:space-y-2 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={justAdded}
            className={`w-full py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs ${
              justAdded
                ? 'bg-[#059669] text-white'
                : 'bg-[#2C221E] hover:bg-[#3f312b] text-white hover:shadow-md active:scale-[0.98]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Added to Basket!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Order Badge */}
          <button
            type="button"
            onClick={handleQuickWhatsAppOrder}
            className="w-full py-1.5 sm:py-2 px-3 rounded-xl text-[10px] sm:text-[11px] font-semibold text-[#059669] hover:bg-emerald-50 border border-emerald-300/80 flex items-center justify-center gap-1.5 transition-colors"
            title="Send direct WhatsApp order message for this specific item"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-emerald-600/10" />
            <span>Quick WhatsApp Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
