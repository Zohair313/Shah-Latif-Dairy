import React from 'react';
import { Star, Award, Clock, Truck } from 'lucide-react';
import { TRUST_FACTORS } from '../../data/products';

export default function TrustBar() {
  const iconMap = {
    Star: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
    Award: <Award className="w-5 h-5 text-[#059669]" />,
    Clock: <Clock className="w-5 h-5 text-amber-600" />,
    Truck: <Truck className="w-5 h-5 text-stone-700" />
  };

  return (
    <section className="border-y border-[#EFE8DE] bg-[#FAF7F0] py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {TRUST_FACTORS.map((factor) => (
            <div 
              key={factor.id}
              className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EBE3D5] shadow-2xs hover:border-amber-400/50 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                {iconMap[factor.icon]}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-[#2C221E] truncate sm:whitespace-normal">
                    {factor.title}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-snug line-clamp-2 sm:line-clamp-none">
                  {factor.subtitle}
                </p>
                <div className="pt-0.5">
                  <span className="inline-block text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200/50">
                    {factor.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
