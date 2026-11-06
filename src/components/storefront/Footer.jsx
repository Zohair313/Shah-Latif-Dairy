import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Store
} from 'lucide-react';
import { STORE_INFO } from '../../data/products';

export default function Footer({ onSwitchToPos }) {
  const currentYear = 2026;

  return (
    <footer className="bg-[#241B18] text-[#FDFBF7] pt-12 sm:pt-16 pb-8 border-t border-[#3f312b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500 text-[#2C221E] flex items-center justify-center font-serif-display font-black text-xl sm:text-2xl shadow-md shrink-0">
                ش
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-lg sm:text-xl text-white">
                  Shah Latif Dairy Hyderabad
                </h3>
                <p className="font-urdu text-xs sm:text-sm text-amber-300">
                  شاہ لطیف ڈیری و روایتی لچھا ربڑی
                </p>
              </div>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-md">
              Serving the people of Latifabad and greater Hyderabad with pure buffalo milk, traditional clotted-cream Lachha Rabri, Danedar Bilona Desi Ghee, and fresh earthen handi Dahi.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.1★ (1,449+ Google Reviews)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Khara Milk</span>
              </div>
            </div>
          </div>

          {/* Location & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-amber-400">
              Counter Location & Contact
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Main Branch:</p>
                  <p className="text-[11px] sm:text-xs">{STORE_INFO.address}</p>
                  <p className="text-stone-400 text-[10px] sm:text-[11px] mt-0.5">Near Gol Building, Latifabad Unit 7</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <span className="text-stone-400">Phone: </span>
                  <a href={`tel:${STORE_INFO.phoneRaw}`} className="text-white font-bold hover:text-amber-400">
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <span className="text-stone-400">WhatsApp: </span>
                  <a 
                    href={STORE_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    +92 346 3822668
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-[11px] sm:text-xs">Daily Timings:</p>
                  <p className="text-[11px] sm:text-xs">6:00 AM – 11:30 PM (Everyday)</p>
                  <p className="text-stone-400 text-[10px]">Morning: 6:00 AM • Evening: 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fast Staff Access & Delivery Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-amber-400">
              Delivery Coverage & Staff
            </h4>

            <div className="space-y-2 text-xs text-stone-300">
              <p className="text-[11px] leading-relaxed">
                Direct motorcycle cold-bag delivery across: Latifabad (Units 1-12), Qasimabad, Saddar, Auto Bhan, and Citizen Colony.
              </p>

              <div className="pt-2">
                <button
                  onClick={onSwitchToPos}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-400" />
                    <span>Counter Staff POS</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full group-hover:bg-amber-500/30">
                    Launch
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-stone-800 text-[11px] sm:text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {currentYear} Shah Latif Dairy Hyderabad. All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Crafted with pride for</span>
            <span className="font-semibold text-white">Hyderabad & Sindh</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
