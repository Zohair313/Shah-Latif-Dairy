import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  MapPin, 
  Bike, 
  Store, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { STORE_INFO, HYDERABAD_AREAS } from '../../data/products';
import { formatPKR, generateWhatsAppOrderUrl } from '../../utils/formatters';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast
}) {
  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' or 'Pickup'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedArea, setSelectedArea] = useState(HYDERABAD_AREAS[0]);
  const [streetAddress, setStreetAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  // Computations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const isFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold;
  const deliveryFee = orderType === 'Delivery' 
    ? (isFreeDelivery ? 0 : STORE_INFO.deliveryFee) 
    : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    // Validate required fields
    if (!customerName.trim()) {
      setValidationError('Please enter your Name before checking out.');
      return;
    }
    if (!customerPhone.trim()) {
      setValidationError('Please enter your Phone or WhatsApp number.');
      return;
    }
    if (orderType === 'Delivery' && !streetAddress.trim()) {
      setValidationError('Please provide your street or house delivery address in Hyderabad.');
      return;
    }

    setValidationError('');

    const url = generateWhatsAppOrderUrl({
      cartItems: cartItems.map(item => ({
        name: item.name,
        portionLabel: item.portionLabel,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.unitPrice * item.quantity
      })),
      customer: {
        name: customerName,
        phone: customerPhone,
        area: selectedArea,
        address: streetAddress
      },
      orderType,
      deliveryFee,
      subtotal,
      grandTotal,
      specialNotes
    });

    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Opening WhatsApp Chat',
        message: 'Formatting your order details for Shah Latif Dairy Latifabad counter...'
      });
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EBE3D5] animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-3.5 sm:p-5 border-b border-[#EBE3D5] bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center font-bold shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#2C221E]">
                  Your Dairy Basket
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-stone-400 hover:text-[#2C221E] hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 sm:space-y-6">
            
            {/* Free Delivery Bar */}
            {orderType === 'Delivery' && (
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs">
                {subtotal >= STORE_INFO.freeDeliveryThreshold ? (
                  <p className="text-emerald-700 font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                    <span>You've qualified for <strong>FREE Delivery</strong> in Hyderabad!</span>
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-stone-700 font-medium text-[11px] sm:text-xs">
                      <span>Add {formatPKR(STORE_INFO.freeDeliveryThreshold - subtotal)} more for <strong>FREE Delivery</strong></span>
                      <span>{Math.round((subtotal / STORE_INFO.freeDeliveryThreshold) * 100)}%</span>
                    </div>
                    <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / STORE_INFO.freeDeliveryThreshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List */}
            {cartItems.length > 0 ? (
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Selected Items
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-red-600 hover:text-red-700 font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-stone-100 bg-white rounded-2xl border border-[#EBE3D5] overflow-hidden shadow-xs">
                  {cartItems.map((item, index) => {
                    const itemTotal = item.unitPrice * item.quantity;
                    return (
                      <div key={`${item.productId}-${item.portionLabel}-${index}`} className="p-3 sm:p-3.5 flex gap-2.5 sm:gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0 bg-stone-100"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-semibold text-xs text-[#2C221E] truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.productId, item.portionLabel)}
                              className="text-stone-300 hover:text-red-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="text-[10px] sm:text-[11px] text-amber-800 font-medium">
                            {item.portionLabel} • {formatPKR(item.unitPrice)}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.portionLabel, item.quantity - 1)}
                                className="p-1 sm:p-1.5 text-stone-500 hover:text-[#2C221E] hover:bg-white rounded transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 sm:w-6 text-center text-xs font-bold text-[#2C221E]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.portionLabel, item.quantity + 1)}
                                className="p-1 sm:p-1.5 text-stone-500 hover:text-[#2C221E] hover:bg-white rounded transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-bold text-xs text-[#2C221E]">
                              {formatPKR(itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-base text-[#2C221E]">Your basket is empty</h4>
                <p className="text-xs text-stone-500">
                  Select fresh milk, Rabri, desi ghee, or kulfi from the menu to build your order.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Delivery Details Form */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#EBE3D5] shadow-xs space-y-3 sm:space-y-4">
                
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-bold text-xs text-[#2C221E]">Fulfillment Method</span>
                  {/* Toggle Delivery vs Pickup */}
                  <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setOrderType('Delivery')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-xs ${
                        orderType === 'Delivery' ? 'bg-[#2C221E] text-white shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      <Bike className="w-3 h-3" />
                      <span>Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Pickup')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors text-xs ${
                        orderType === 'Pickup' ? 'bg-[#2C221E] text-white shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      <Store className="w-3 h-3" />
                      <span>Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields - using text-base on mobile to avoid iOS Safari zoom */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tariq Memon"
                      className="w-full px-3 py-2 text-sm sm:text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 0346 1234567"
                      className="w-full px-3 py-2 text-sm sm:text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {orderType === 'Delivery' ? (
                    <>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-700 mb-1">
                          Hyderabad Area / Sector *
                        </label>
                        <select
                          value={selectedArea}
                          onChange={(e) => setSelectedArea(e.target.value)}
                          className="w-full px-3 py-2 text-sm sm:text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        >
                          {HYDERABAD_AREAS.map((area, i) => (
                            <option key={i} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-700 mb-1">
                          Delivery Street Address & Landmarks *
                        </label>
                        <textarea
                          rows={2}
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="House / Flat #, Street, Near prominent landmark..."
                          className="w-full px-3 py-2 text-sm sm:text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs space-y-1">
                      <p className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Self Pickup Location:</span>
                      </p>
                      <p className="text-stone-700 text-[11px]">
                        Shah Latif Dairy, Main Road, Latifabad Unit 7, Hyderabad. Ready within 15 minutes of WhatsApp confirmation.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-stone-700 mb-1">
                      Special Delivery Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Deliver before 8 AM / Bring change for Rs. 2000"
                      className="w-full px-3 py-2 text-sm sm:text-xs rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {validationError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Drawer Footer with Calculation & WhatsApp Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-3.5 sm:p-5 border-t border-[#EBE3D5] bg-white space-y-2.5 sm:space-y-3 shrink-0 pb-6 sm:pb-5">
              
              {/* Billing Summary */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-600 text-[11px] sm:text-xs">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#2C221E]">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600 text-[11px] sm:text-xs">
                  <span>Delivery to Hyderabad:</span>
                  <span className="font-semibold text-[#2C221E]">
                    {orderType === 'Delivery' 
                      ? (deliveryFee === 0 ? <strong className="text-[#059669]">FREE</strong> : formatPKR(deliveryFee)) 
                      : 'N/A (Store Pickup)'}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-[#2C221E] pt-1.5 border-t border-stone-100">
                  <span>Grand Total:</span>
                  <span className="font-serif-display font-black text-sm sm:text-base text-[#059669]">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Main Checkout Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.01] active:scale-[0.99] group"
              >
                <MessageSquare className="w-4 h-4 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>Checkout via WhatsApp</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono">
                  {formatPKR(grandTotal)}
                </span>
              </button>

              <p className="text-[9px] sm:text-[10px] text-center text-stone-500">
                Direct routing to <strong>+92 346 3822668</strong> • Latifabad Unit 7 counter
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
