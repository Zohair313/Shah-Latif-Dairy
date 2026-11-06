import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Terminal, 
  Store, 
  MessageSquare, 
  Star, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { formatPKR } from '../utils/formatters';

export default function Header({ 
  currentMode, 
  setCurrentMode, 
  cartCount, 
  cartSubtotal, 
  setIsCartOpen 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EFE8DE] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#2C221E] text-[#FDFBF7] text-xs px-3 sm:px-4 py-1.5 sm:py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Fresh Batch Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-[#059669] text-white font-medium px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Fresh Batch
            </span>
            <span className="text-amber-200/90 font-medium text-[11px] sm:text-xs truncate">
              Latifabad Unit 7, Hyderabad
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:inline text-stone-300 truncate">
              Morning & Evening Kadhais Simmering
            </span>
          </div>

          {/* Right: Rating & Call */}
          <div className="flex items-center gap-2 sm:gap-4 text-stone-300 text-[11px] sm:text-xs shrink-0">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
              <span className="font-bold text-white text-[11px] sm:text-xs">4.1★</span>
              <span className="hidden xs:inline text-stone-400 text-[10px] sm:text-xs">(1,449+)</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_INFO.operatingHours}</span>
            </div>
            <a 
              href={`tel:${STORE_INFO.phoneRaw}`} 
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold text-[11px] sm:text-xs"
              title="Call Shah Latif Dairy"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">{STORE_INFO.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={() => setCurrentMode('storefront')}
              className="text-left flex items-center gap-2 sm:gap-3 group focus:outline-hidden"
              aria-label="Shah Latif Dairy Home"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2C221E] text-amber-400 flex items-center justify-center font-serif-display font-black text-xl sm:text-2xl shadow-md border border-amber-600/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <span>ش</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="font-serif-display font-bold text-base sm:text-xl lg:text-2xl text-[#2C221E] tracking-tight leading-none group-hover:text-amber-800 transition-colors truncate">
                    Shah Latif Dairy
                  </h1>
                  <span className="font-urdu text-xs sm:text-sm text-amber-800 font-semibold hidden md:inline">
                    شاہ لطیف ڈیری
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
                  <p className="text-[10px] sm:text-xs font-medium text-stone-600 flex items-center gap-0.5 sm:gap-1 truncate">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#059669] shrink-0" />
                    <span className="truncate">Latifabad Unit 7</span>
                  </p>
                  <span className="text-[9px] sm:text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold border border-amber-200 shrink-0">
                    Est. Heritage
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Mode Switcher Pill (Desktop / Tablet Large) */}
          <div className="hidden lg:flex items-center bg-[#EDE4D3]/60 p-1.5 rounded-full border border-[#D4C8B8]/60 shadow-inner">
            <button
              onClick={() => setCurrentMode('storefront')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                currentMode === 'storefront'
                  ? 'bg-[#2C221E] text-[#FDFBF7] shadow-md shadow-stone-800/10'
                  : 'text-[#2C221E]/80 hover:text-[#2C221E] hover:bg-white/50'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Store</span>
            </button>

            <button
              onClick={() => setCurrentMode('pos')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                currentMode === 'pos'
                  ? 'bg-[#059669] text-white shadow-md shadow-emerald-900/10'
                  : 'text-[#2C221E]/80 hover:text-[#2C221E] hover:bg-white/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-200" />
              <span>Staff POS Mode</span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-mono">
                Staff
              </span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Mode Toggle for Tablet & Mobile (Visible outside dropdown for fast switching) */}
            <button
              onClick={() => setCurrentMode(currentMode === 'storefront' ? 'pos' : 'storefront')}
              className={`lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                currentMode === 'pos'
                  ? 'bg-[#059669] text-white border-emerald-700'
                  : 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
              }`}
              title="Toggle between Storefront and Staff POS"
            >
              {currentMode === 'storefront' ? (
                <>
                  <Terminal className="w-3 h-3 text-emerald-700" />
                  <span>POS</span>
                </>
              ) : (
                <>
                  <Store className="w-3 h-3 text-amber-300" />
                  <span>Store</span>
                </>
              )}
            </button>

            {/* WhatsApp Link button (hidden on very small mobile) */}
            <a
              href="https://wa.me/923463822668?text=Salam%20Shah%20Latif%20Dairy,%20I%20would%20like%20to%20inquire%20about%20today's%20fresh%20dairy%20rates%20and%20Lachha%20Rabri."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-[#059669]/10 hover:bg-[#059669]/20 text-[#059669] px-3 py-2 rounded-xl text-xs font-semibold border border-[#059669]/30 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-[#059669]/20" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-[#2C221E] hover:bg-[#3f312b] text-[#FDFBF7] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-stone-900/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#059669] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#2C221E]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="font-bold text-amber-300 text-[11px] sm:text-xs border-l border-white/20 pl-1.5 sm:pl-2">
                  {formatPKR(cartSubtotal)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#2C221E] hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer / Banner */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EFE8DE] py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <p className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Select Mode:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => {
                    setCurrentMode('storefront');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${
                    currentMode === 'storefront'
                      ? 'bg-[#2C221E] text-white shadow-xs'
                      : 'bg-white border text-stone-700'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-300" />
                  <span>Customer Store</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentMode('pos');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${
                    currentMode === 'pos'
                      ? 'bg-[#059669] text-white shadow-xs'
                      : 'bg-white border text-stone-700'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-200" />
                  <span>Staff POS Mode</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1 text-xs sm:text-sm text-[#2C221E]">
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-stone-100 font-semibold flex items-center justify-between"
              >
                <span>Browse Dairy Menu</span>
                <span className="text-[11px] text-amber-800">Fresh Stock →</span>
              </a>
              <a 
                href="#rabri-heritage" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-stone-100 font-semibold"
              >
                Our Lachha Rabri Heritage
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-stone-100 font-semibold"
              >
                1,449+ Local Hyderabad Reviews (4.1★)
              </a>
              <a 
                href="https://wa.me/923463822668" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 text-[#059669] font-bold bg-emerald-50 rounded-lg mt-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +92 346 3822668</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
