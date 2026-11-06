import React from 'react';
import { 
  Star, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Milk
} from 'lucide-react';

export default function Hero({ onBrowseClick }) {
  return (
    <section className="relative overflow-x-clip pt-6 sm:pt-10 pb-12 sm:pb-16 lg:py-20 bg-linear-to-b from-[#FDFBF7] via-[#FAF6ED] to-[#FDFBF7]">
      {/* Subtle background ornamentation with contained bounds */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 sm:-mr-24 sm:-mt-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 sm:-ml-24 sm:-mb-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Proof, Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Local Hyderabad Verified Social Proof Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 bg-[#2C221E]/5 hover:bg-[#2C221E]/8 border border-[#2C221E]/10 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 transition-all max-w-full">
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-[#2C221E] text-[11px] sm:text-xs">4.1★ Rating</span>
              </div>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-[11px] sm:text-xs font-semibold text-stone-700">
                1,449+ Reviews
              </span>
              <span className="text-stone-400 text-xs hidden xs:inline">•</span>
              <span className="text-[11px] sm:text-xs font-medium text-[#059669] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Latifabad Unit 7, Hyderabad
              </span>
            </div>

            {/* Main Headline with Serif Elegance & Urdu Accent */}
            <div className="space-y-1 sm:space-y-2">
              <span className="font-urdu text-amber-900/80 text-lg sm:text-xl md:text-2xl font-bold block mb-0.5">
                روایتی ذائقہ، خالص پن اور دہائیوں کا اعتماد
              </span>
              <h1 className="font-serif-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2C221E] tracking-tight leading-[1.15]">
                Hyderabad’s Pride for <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-700 via-amber-600 to-amber-800 underline decoration-amber-400/40 decoration-wavy decoration-2">
                  Pure Dairy & Lachha Rabri
                </span>
              </h1>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="text-xs sm:text-base lg:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Fresh from grass-fed Sindhi buffaloes to our traditional iron kadhais in Latifabad Unit 7. 
              Taste unadulterated whole cream milk, heavenly golden Bilona Desi Ghee, and our legendary slow-simmered hand-scraped Lachha Rabri.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="https://wa.me/923463822668?text=Salam%20Shah%20Latif%20Dairy!%20I%20would%20like%20to%20place%20an%20order%20for%20fresh%20milk%20/%20rabri%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#059669] hover:bg-[#047857] text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>Order via WhatsApp</span>
                <span className="bg-white/20 text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-mono">
                  0346 3822668
                </span>
              </a>

              <button
                onClick={onBrowseClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-[#2C221E] border-2 border-[#D4C8B8] px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:border-[#2C221E] transition-all"
              >
                <span>Browse Fresh Menu</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </button>
            </div>

            {/* Quick Micro-Features */}
            <div className="pt-3 sm:pt-4 border-t border-[#EAE1D3] flex flex-wrap items-center justify-center lg:justify-start gap-y-1.5 gap-x-4 sm:gap-x-6 text-[11px] sm:text-xs text-stone-600">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                <span className="font-semibold text-stone-800">100% Khara Milk</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                <span className="font-semibold text-stone-800">Fresh Daily Kadhais</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                <span className="font-semibold text-stone-800">Latifabad & Hyderabad Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Dairy Product Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Card Showcase */}
              <div className="relative bg-white rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-[#E8DEC8] transform sm:rotate-1 hover:rotate-0 transition-transform duration-500">
                
                {/* Hero Image */}
                <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80"
                    alt="Famous Latifabad Lachha Rabri in traditional clay matka"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"></div>
                  
                  {/* Badge overlays */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#2C221E]/80 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-400/30 flex items-center gap-1.5">
                    <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse" />
                    <span>Hyderabad's #1 Rabri</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                    <p className="font-urdu text-xs sm:text-sm text-amber-200">شاہ لطیف روایتی لچھا ربڑی</p>
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="font-serif-display font-bold text-sm sm:text-lg lg:text-xl truncate">
                        Hand-Scraped Lachha Rabri
                      </h3>
                      <span className="font-extrabold text-amber-300 text-sm sm:text-lg lg:text-xl shrink-0">
                        Rs. 1,100<span className="text-[10px] sm:text-xs font-normal text-white/80">/KG</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Sub-grid of key items */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-stone-100">
                  <div className="bg-[#FAF7F2] p-2 sm:p-2.5 rounded-xl text-center border border-amber-900/5">
                    <div className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate">Buffalo Milk</div>
                    <div className="font-bold text-[11px] sm:text-xs text-[#2C221E] mt-0.5">Rs. 240/L</div>
                    <div className="text-[8px] sm:text-[9px] text-[#059669] font-semibold truncate">Morning Churn</div>
                  </div>

                  <div className="bg-[#FAF7F2] p-2 sm:p-2.5 rounded-xl text-center border border-amber-900/5">
                    <div className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate">Bilona Ghee</div>
                    <div className="font-bold text-[11px] sm:text-xs text-[#2C221E] mt-0.5">Rs. 2,600/KG</div>
                    <div className="text-[8px] sm:text-[9px] text-amber-700 font-semibold truncate">Danedar Pure</div>
                  </div>

                  <div className="bg-[#FAF7F2] p-2 sm:p-2.5 rounded-xl text-center border border-amber-900/5">
                    <div className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate">Malai Kulfi</div>
                    <div className="font-bold text-[11px] sm:text-xs text-[#2C221E] mt-0.5">Rs. 120/Pc</div>
                    <div className="text-[8px] sm:text-[9px] text-rose-700 font-semibold truncate">Khoya Pista</div>
                  </div>
                </div>

              </div>

              {/* Floating Quality Seal Widget (Optimized for small screens) */}
              <div className="absolute -bottom-4 left-2 sm:-left-6 bg-[#2C221E] text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-amber-500/30 max-w-[170px] sm:max-w-[200px]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold text-amber-300 leading-tight">100% Purity Guarantee</p>
                    <p className="text-[8px] sm:text-[9px] text-stone-300 leading-tight">Lactometer test welcome!</p>
                  </div>
                </div>
              </div>

              {/* Floating Dispatch Status Widget (Optimized for small screens) */}
              <div className="absolute -top-3 right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg border border-[#E8DEC8] flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-[#059669] flex items-center justify-center font-bold shrink-0">
                  <Milk className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase tracking-wider">Latifabad Counter</p>
                  <p className="text-[10px] sm:text-xs font-bold text-[#2C221E]">Walk-in & Delivery</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
