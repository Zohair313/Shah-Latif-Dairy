import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Truck, 
  Phone, 
  Clock, 
  Store, 
  Scale, 
  PauseCircle, 
  Receipt, 
  History,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { formatPKR } from '../../utils/formatters';
import PosQuickItems from './PosQuickItems';
import PosCustomWeigher from './PosCustomWeigher';
import PosReceiptModal from './PosReceiptModal';
import PosRecentOrdersModal from './PosRecentOrdersModal';

function generateOrderNumber() {
  return `SLD-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getFormattedCurrentTimestamp() {
  return new Date().toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function getFormattedTimeOnly() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function PosDashboard({ onShowToast }) {
  // Mobile / Tablet Tab Switcher (For screens < lg)
  const [mobileTab, setMobileTab] = useState('catalog'); // 'catalog' or 'receipt'

  // POS Order State
  const [posItems, setPosItems] = useState([]);
  const [orderType, setOrderType] = useState('Walk-in Counter'); // 'Walk-in Counter', 'Phone Order', 'WhatsApp Delivery'
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // 'Cash', 'JazzCash/EasyPaisa', 'COD'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [packagingFee, setPackagingFee] = useState(0);
  const [amountTendered, setAmountTendered] = useState('');
  
  // Custom Weigher Panel toggle
  const [showCustomWeigher, setShowCustomWeigher] = useState(false);

  // Held Orders State
  const [heldOrders, setHeldOrders] = useState([]);

  // Completed Orders History
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [showRecentOrders, setShowRecentOrders] = useState(false);

  // Live Clock
  const [currentTime, setCurrentTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameUrdu.includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Billing calculations
  const subtotal = posItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const grandTotal = Math.max(0, subtotal + packagingFee - Number(discountAmount || 0));
  
  const tenderedNum = parseFloat(amountTendered) || 0;
  const changeDue = Math.max(0, tenderedNum - grandTotal);

  // Add Item handler
  const handleAddItem = (product, portion) => {
    const unitPrice = portion?.priceOverride || (product.basePrice * (portion?.multiplier || 1));
    const portionLabel = portion?.label || `1 ${product.unit}`;

    setPosItems(prev => {
      const existingIndex = prev.findIndex(
        it => it.productId === product.id && it.portionLabel === portionLabel
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            nameUrdu: product.nameUrdu,
            portionLabel: portionLabel,
            unitPrice: unitPrice,
            quantity: 1,
            image: product.image
          }
        ];
      }
    });

    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Item Added to Bill',
        message: `${product.name} (${portionLabel})`
      });
    }
  };

  // Quick add from fast picks
  const handleQuickAdd = (quickItem) => {
    const product = PRODUCTS.find(p => p.id === quickItem.productId);
    if (!product) return;

    setPosItems(prev => {
      const existingIndex = prev.findIndex(
        it => it.productId === quickItem.productId && it.portionLabel === quickItem.portionLabel
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: quickItem.productId,
            name: product.name,
            nameUrdu: product.nameUrdu,
            portionLabel: quickItem.portionLabel,
            unitPrice: quickItem.price,
            quantity: 1,
            image: product.image
          }
        ];
      }
    });
  };

  // Add custom scaled item
  const handleAddCustomItem = (customItem) => {
    setPosItems(prev => [...prev, customItem]);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Custom Scale Item Added',
        message: `${customItem.name} • ${customItem.portionLabel} for ${formatPKR(customItem.unitPrice)}`
      });
    }
  };

  // Modify quantity
  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setPosItems(prev => {
        const next = [...prev];
        next[index] = { ...next[index], quantity: newQty };
        return next;
      });
    }
  };

  // Remove single line item
  const handleRemoveItem = (index) => {
    setPosItems(prev => prev.filter((_, i) => i !== index));
  };

  // Clear entire active bill
  const handleClearOrder = () => {
    if (posItems.length === 0) return;
    if (window.confirm("Are you sure you want to clear the current order?")) {
      setPosItems([]);
      setDiscountAmount(0);
      setPackagingFee(0);
      setAmountTendered('');
      setCustomerName('');
      setCustomerPhone('');
    }
  };

  // Hold current order
  const handleHoldOrder = () => {
    if (posItems.length === 0) return;
    const held = {
      id: Date.now(),
      items: [...posItems],
      orderType,
      paymentMethod,
      customerName,
      customerPhone,
      timestamp: getFormattedTimeOnly()
    };

    setHeldOrders(prev => [held, ...prev]);
    setPosItems([]);
    setDiscountAmount(0);
    setPackagingFee(0);
    setAmountTendered('');
    setCustomerName('');
    setCustomerPhone('');

    if (onShowToast) {
      onShowToast({
        type: 'info',
        title: 'Order Put on Hold',
        message: 'Saved to Held Orders list. You can restore it anytime.'
      });
    }
  };

  // Restore held order
  const handleRestoreHeldOrder = (held) => {
    setPosItems(held.items);
    setOrderType(held.orderType);
    setPaymentMethod(held.paymentMethod);
    setCustomerName(held.customerName || '');
    setCustomerPhone(held.customerPhone || '');
    setHeldOrders(prev => prev.filter(h => h.id !== held.id));

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Held Order Restored',
        message: `Restored order with ${held.items.length} items.`
      });
    }
  };

  // Complete Order & Print Receipt
  const handleCompleteOrder = () => {
    if (posItems.length === 0) {
      alert("Please add at least one item to complete the order.");
      return;
    }

    const orderNum = generateOrderNumber();
    const newReceipt = {
      orderNumber: orderNum,
      timestamp: getFormattedCurrentTimestamp(),
      cashierName: "Counter #01 (Latifabad)",
      orderType,
      paymentMethod,
      items: [...posItems],
      subtotal,
      packagingFee,
      discount: Number(discountAmount || 0),
      grandTotal,
      amountTendered: tenderedNum || grandTotal,
      changeDue: tenderedNum > grandTotal ? changeDue : 0,
      customerName: customerName.trim() || undefined,
      customerPhone: customerPhone.trim() || undefined
    };

    // Save in history
    setCompletedOrders(prev => [newReceipt, ...prev]);
    setActiveReceipt(newReceipt);

    // Reset current active order state
    setPosItems([]);
    setDiscountAmount(0);
    setPackagingFee(0);
    setAmountTendered('');
    setCustomerName('');
    setCustomerPhone('');

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Order Completed & Recorded!',
        message: `Receipt #${orderNum} generated. Total: ${formatPKR(grandTotal)}`
      });
    }
  };

  return (
    <div className="bg-[#FAF7F0] min-h-[calc(100vh-80px)] p-2.5 sm:p-5 text-[#2C221E] pb-24 lg:pb-6">
      
      {/* Top POS Information & Status Bar */}
      <div className="max-w-7xl mx-auto mb-3 sm:mb-4 bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E8DEC8] shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold shrink-0">
            <Store className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h2 className="font-bold text-xs sm:text-sm text-[#2C221E] truncate">
                Shah Latif Dairy — Counter Terminal
              </h2>
              <span className="bg-emerald-100 text-[#059669] text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.2 rounded-full shrink-0">
                ONLINE
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">
              Latifabad Unit 7 Branch • Cashier: Counter #01
            </p>
          </div>
        </div>

        {/* Live Clock & Shift Orders Tracker */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs ml-auto">
          <div className="bg-stone-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-stone-200 flex items-center gap-1.5 font-mono">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" />
            <span className="font-bold text-[11px] sm:text-xs">{currentTime.toLocaleTimeString()}</span>
          </div>

          {/* Held Orders Pill Button */}
          {heldOrders.length > 0 && (
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 text-amber-900 px-2 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold animate-pulse">
              <PauseCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
              <span>{heldOrders.length} Held</span>
              <button
                onClick={() => handleRestoreHeldOrder(heldOrders[0])}
                className="underline ml-0.5 text-amber-800 text-[10px]"
              >
                Restore
              </button>
            </div>
          )}

          {/* Shift History Trigger */}
          <button
            onClick={() => setShowRecentOrders(true)}
            className="flex items-center gap-1 bg-[#FAF7F0] hover:bg-[#EDE4D3] text-stone-800 font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-stone-300 transition-colors text-[11px] sm:text-xs"
          >
            <History className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-600" />
            <span>Shift Sales ({completedOrders.length})</span>
          </button>
        </div>

      </div>

      {/* Mobile/Tablet Segmented Switcher (< lg screens) */}
      <div className="lg:hidden max-w-7xl mx-auto mb-3 grid grid-cols-2 gap-2 bg-stone-200/80 p-1 rounded-2xl text-xs font-bold">
        <button
          type="button"
          onClick={() => setMobileTab('catalog')}
          className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'catalog'
              ? 'bg-[#2C221E] text-white shadow-xs'
              : 'text-stone-700 hover:text-black'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Catalog & Fast-Picks</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('receipt')}
          className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'receipt'
              ? 'bg-[#059669] text-white shadow-xs'
              : 'text-stone-700 hover:text-black'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Active Bill ({posItems.length}) • {formatPKR(grandTotal)}</span>
        </button>
      </div>

      {/* Main Responsive Two-Column POS Dashboard */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        
        {/* Left Column (Product Quick-Select Station) - 7 cols on lg */}
        <div className={`lg:col-span-7 space-y-3 sm:space-y-4 ${
          mobileTab === 'receipt' ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Quick-add Grid for High-Volume Items (1-Tap Buttons) */}
          <PosQuickItems onQuickAdd={handleQuickAdd} />

          {/* Custom Weight / Scale Calculator Collapsible Card */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setShowCustomWeigher(!showCustomWeigher)}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2.5 sm:px-3 py-1.5 rounded-xl border border-amber-300/80 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-amber-700" />
                <span>{showCustomWeigher ? 'Hide Scale Tool' : 'Open Loose Scale / Rupees Tool'}</span>
              </button>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Custom Rs / grams</span>
            </div>

            {showCustomWeigher && (
              <PosCustomWeigher 
                onAddCustomItem={handleAddCustomItem} 
                onClose={() => setShowCustomWeigher(false)} 
              />
            )}
          </div>

          {/* Search & Category Filter Navigation */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E8DEC8] shadow-xs space-y-2.5 sm:space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog by name or Urdu (e.g. Rabri, Milk, Ghee)..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-stone-200 bg-stone-50/70 focus:bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            {/* Category Filter Buttons with Horizontal Scroll */}
            <div className="overflow-x-auto pb-1 no-scrollbar">
              <div className="flex items-center gap-1.5 min-w-max">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'bg-[#2C221E] text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catalog Grid Cards for Cashier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 max-h-[460px] overflow-y-auto pr-0.5">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  className="p-2.5 sm:p-3 rounded-xl border border-stone-200 hover:border-amber-400/80 bg-[#FAF7F0]/40 hover:bg-white transition-all flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div className="flex items-start gap-2.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0 bg-stone-100"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-[#2C221E] truncate">
                        {p.name}
                      </h4>
                      <div className="font-urdu text-[11px] text-amber-800 truncate">
                        {p.nameUrdu}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-stone-500 mt-0.5">
                        Base: <strong className="text-[#2C221E]">{formatPKR(p.basePrice)}</strong>/{p.unit}
                      </div>
                    </div>
                  </div>

                  {/* Portions Add Buttons */}
                  <div className="grid grid-cols-2 gap-1 sm:gap-1.5 pt-1 border-t border-stone-200/60">
                    {p.portions?.slice(0, 4).map((portion, idx) => {
                      const portionPrice = portion.priceOverride || (p.basePrice * (portion.multiplier || 1));
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddItem(p, portion)}
                          className="px-2 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-left transition-colors flex items-center justify-between gap-1"
                        >
                          <span className="text-[10px] font-medium text-stone-700 truncate">
                            {portion.label.split(' ')[0]}
                          </span>
                          <span className="text-[10px] font-bold text-amber-900 shrink-0">
                            {formatPKR(portionPrice)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column (Active Order Summary / Live Receipt Builder) - 5 cols on lg */}
        <div className={`lg:col-span-5 space-y-3 sm:space-y-4 ${
          mobileTab === 'catalog' ? 'hidden lg:block' : 'block'
        }`}>
          
          <div className="bg-white rounded-2xl border border-[#E8DEC8] shadow-md flex flex-col overflow-hidden">
            
            {/* Order Type Header Tabs */}
            <div className="p-3 bg-[#2C221E] text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-300 uppercase tracking-wider text-[11px] sm:text-xs">Active Order Builder</span>
                <span className="text-stone-300 font-mono text-[10px] sm:text-[11px]">
                  {posItems.length} {posItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Order Type Switcher */}
              <div className="grid grid-cols-3 gap-1 bg-black/30 p-1 rounded-xl text-[11px] sm:text-xs font-semibold">
                {[
                  { id: 'Walk-in Counter', label: 'Walk-in', icon: Store },
                  { id: 'Phone Order', label: 'Phone', icon: Phone },
                  { id: 'WhatsApp Delivery', label: 'WhatsApp', icon: Truck }
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = orderType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setOrderType(type.id)}
                      className={`py-1.5 px-1.5 sm:px-2 rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 transition-colors ${
                        isSelected
                          ? 'bg-[#059669] text-white shadow-xs'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Customer details for delivery/phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name (Optional)"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-stone-400 focus:outline-hidden focus:bg-white/20"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone / WhatsApp"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-stone-400 focus:outline-hidden focus:bg-white/20"
                />
              </div>
            </div>

            {/* Active Items Table / List */}
            <div className="p-2.5 sm:p-4 max-h-[280px] sm:max-h-[320px] overflow-y-auto space-y-1.5 sm:space-y-2">
              {posItems.length > 0 ? (
                posItems.map((item, idx) => {
                  const lineTotal = item.unitPrice * item.quantity;
                  return (
                    <div 
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex items-center justify-between gap-1.5 sm:gap-2 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[#2C221E] truncate text-xs">
                          {item.name}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-stone-500 truncate">
                          {item.portionLabel} • {formatPKR(item.unitPrice)}
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white p-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(idx, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 sm:w-5 text-center font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right shrink-0 min-w-[60px] sm:min-w-[70px]">
                        <div className="font-bold text-xs sm:text-sm text-[#2C221E]">
                          {formatPKR(lineTotal)}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-[10px] text-red-500 hover:text-red-700 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 sm:py-12 text-center text-stone-400 space-y-2">
                  <Receipt className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-stone-300" />
                  <p className="text-xs font-medium">Cart is currently empty.</p>
                  <p className="text-[11px]">Tap items or use Fast-Picks to add to bill.</p>
                </div>
              )}
            </div>

            {/* Modifiers & Extra Toggles (Packaging & Discount) */}
            <div className="p-3 bg-[#FAF7F0] border-t border-stone-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {/* Packaging Fee Toggle */}
                <div>
                  <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">
                    Packaging:
                  </label>
                  <select
                    value={packagingFee}
                    onChange={(e) => setPackagingFee(Number(e.target.value))}
                    className="w-full text-[11px] py-1.5 px-2 rounded-lg border border-stone-200 bg-white"
                  >
                    <option value={0}>Standard Bag / Free</option>
                    <option value={50}>Clay Matka (+Rs. 50)</option>
                    <option value={100}>Special Gift Box (+Rs. 100)</option>
                    <option value={40}>Chilled Ice Pack (+Rs. 40)</option>
                  </select>
                </div>

                {/* Discount Input */}
                <div>
                  <label className="block text-[10px] font-semibold text-stone-600 mb-0.5">
                    Discount (Rs):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={discountAmount || ''}
                    onChange={(e) => setDiscountAmount(Math.max(0, Number(e.target.value)))}
                    placeholder="Rs. 0"
                    className="w-full text-[11px] py-1.5 px-2 rounded-lg border border-stone-200 bg-white"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[10px] font-semibold text-stone-600 mb-1">
                  Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-bold">
                  {[
                    { id: 'Cash', label: 'Cash', icon: Banknote },
                    { id: 'JazzCash/EasyPaisa', label: 'JazzCash', icon: Smartphone },
                    { id: 'COD', label: 'COD', icon: CreditCard }
                  ].map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`py-1.5 px-1 sm:px-2 rounded-lg border flex items-center justify-center gap-1 transition-colors ${
                          isSelected
                            ? 'bg-[#2C221E] text-amber-400 border-[#2C221E]'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cash Tendered Calculator (If Cash selected) */}
              {paymentMethod === 'Cash' && (
                <div className="p-2 sm:p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 text-[11px] sm:text-xs">Cash Received (Rs):</span>
                    <input
                      type="number"
                      value={amountTendered}
                      onChange={(e) => setAmountTendered(e.target.value)}
                      placeholder="e.g. 1000"
                      className="w-24 text-right font-bold text-xs py-1 px-2 rounded-lg border border-amber-300 bg-white"
                    />
                  </div>

                  {/* Quick Notes buttons */}
                  <div className="flex items-center gap-1 justify-end flex-wrap">
                    <span className="text-[10px] text-stone-500 mr-1">Quick Note:</span>
                    {[
                      { label: 'Exact', val: grandTotal },
                      { label: '500', val: 500 },
                      { label: '1000', val: 1000 },
                      { label: '5000', val: 5000 }
                    ].map((note, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAmountTendered(String(note.val))}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-amber-300 text-stone-700 hover:bg-amber-100 font-semibold"
                      >
                        {note.label}
                      </button>
                    ))}
                  </div>

                  {/* Change Return Result */}
                  {tenderedNum > 0 && (
                    <div className="flex items-baseline justify-between pt-1 border-t border-amber-200 text-xs">
                      <span className="font-semibold text-stone-700">Change to Return:</span>
                      <span className={`font-serif-display font-extrabold text-sm ${
                        changeDue >= 0 ? 'text-[#059669]' : 'text-red-600'
                      }`}>
                        {changeDue >= 0 ? formatPKR(changeDue) : 'Insufficient Cash'}
                      </span>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Live Totals & Action Buttons */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200 space-y-2.5 sm:space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-600 text-[11px] sm:text-xs">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPKR(subtotal)}</span>
                </div>
                {packagingFee > 0 && (
                  <div className="flex justify-between text-stone-600 text-[11px] sm:text-xs">
                    <span>Packaging:</span>
                    <span className="font-semibold">+{formatPKR(packagingFee)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-600 text-[11px] sm:text-xs">
                    <span>Discount:</span>
                    <span className="font-semibold">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-[#2C221E] pt-1.5 border-t border-stone-100">
                  <span>Total Payable:</span>
                  <span className="font-serif-display text-base sm:text-lg text-[#059669]">
                    {formatPKR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Hold, Clear, Complete & Print */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleHoldOrder}
                  disabled={posItems.length === 0}
                  className="py-2.5 px-2 sm:px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <PauseCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Hold Order</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearOrder}
                  disabled={posItems.length === 0}
                  className="py-2.5 px-2 sm:px-3 rounded-xl border border-stone-200 bg-stone-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Clear Bill</span>
                </button>
              </div>

              {/* Primary Complete & Print Button */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={posItems.length === 0}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>Print Receipt & Complete</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-mono ml-1">
                  {formatPKR(grandTotal)}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Mobile Sticky Order Bar (< lg screens): Always visible when browsing catalog on mobile */}
      {mobileTab === 'catalog' && posItems.length > 0 && (
        <div className="lg:hidden fixed bottom-3 left-3 right-3 z-30 animate-in slide-in-from-bottom-3 duration-300">
          <div className="bg-[#2C221E] text-white p-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                Current Bill ({posItems.length} items)
              </div>
              <div className="font-serif-display font-black text-sm sm:text-base text-white">
                {formatPKR(grandTotal)}
              </div>
            </div>

            <button
              onClick={() => setMobileTab('receipt')}
              className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-md shrink-0"
            >
              <span>View & Pay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* POS Receipt Modal */}
      <PosReceiptModal 
        receiptData={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        onShowToast={onShowToast}
      />

      {/* Shift Transaction History Modal */}
      <PosRecentOrdersModal
        isOpen={showRecentOrders}
        onClose={() => setShowRecentOrders(false)}
        orders={completedOrders}
        onReprint={(order) => {
          setShowRecentOrders(false);
          setActiveReceipt(order);
        }}
      />

    </div>
  );
}
