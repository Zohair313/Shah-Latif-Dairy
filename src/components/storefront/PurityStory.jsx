import React from 'react';
import { Flame, CheckCircle, Shield } from 'lucide-react';

export default function PurityStory() {
  const processSteps = [
    {
      num: "01",
      title: "Grass-Fed Sindhi Buffaloes",
      urdu: "خالص سندھی بھینسیں",
      desc: "Milk procured twice daily from selected ethical farms along the Indus river plains. High natural butterfat (7.2%+) with zero artificial hormones."
    },
    {
      num: "02",
      title: "Iron Kadhai Simmering",
      urdu: "روایتی لوہے کی کڑاہیاں",
      desc: "Our Lachha Rabri is slowly reduced over gentle embers for 4+ hours. Flakes of clotted malai are hand-scraped and folded to create delicate tender ribbons."
    },
    {
      num: "03",
      title: "Terracotta Clay Kunri Fermentation",
      urdu: "مٹی کی ہانڈی میں دہی کا جھماؤ",
      desc: "Our Dahi and Matka Kulfis are matured in porous terracotta earthenware, absorbing excess water naturally to leave thick, spoonable curd."
    },
    {
      num: "04",
      title: "Ancient Bilona Ghee Churning",
      urdu: "روایتی مکھن سے دانے دار گھی",
      desc: "Curd is churned into white butter (makhan) and slowly clarified over wood fire until aromatic golden granules (danedar) form naturally."
    }
  ];

  return (
    <section id="rabri-heritage" className="py-12 sm:py-20 bg-[#FAF7F0] border-t border-[#EFE8DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Story text */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-100/90 text-amber-900 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border border-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Hyderabad's Culinary Heritage</span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <span className="font-urdu text-amber-900 text-base sm:text-lg block font-semibold">
                حیدرآباد کی پہچان — شاہ لطیف ربڑی و ڈیری
              </span>
              <h2 className="font-serif-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#2C221E] tracking-tight leading-tight">
                Why Hyderabad Families Trust Shah Latif Dairy for Generations
              </h2>
            </div>

            <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed">
              In Hyderabad, dairy is not just a grocery item—it is an art form. From celebratory feasts of Eid and weddings to the everyday morning chai, our milk, makhan, and rabri have stood for honest, unadulterated pure quality.
            </p>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2.5 sm:space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-[#2C221E] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#059669]" />
                <span>Our Uncompromising Purity Promise</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-stone-700">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>Zero milk powder or starch</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>Zero synthetic flavors or essences</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>Open counter Lactometer testing</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>Sanitized chilled cold-chain</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center font-bold text-[10px] sm:text-xs text-amber-900">
                  HYD
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-emerald-200 flex items-center justify-center font-bold text-[10px] sm:text-xs text-emerald-900">
                  L7
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center font-bold text-[10px] sm:text-xs text-stone-900">
                  4.1★
                </div>
              </div>
              <div className="text-[11px] sm:text-xs">
                <p className="font-bold text-[#2C221E]">Proudly Serving Latifabad & Hyderabad</p>
                <p className="text-stone-500">Over 1,449+ verified positive reviews</p>
              </div>
            </div>

          </div>

          {/* Right Column: Step by step craftsmanship cards */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8DEC8] hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-serif-display font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#2C221E] truncate">{step.title}</h4>
                    <span className="font-urdu text-[11px] sm:text-xs text-amber-800 font-semibold shrink-0">{step.urdu}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
