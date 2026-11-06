import React from 'react';
import { Star, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { VERIFIED_REVIEWS } from '../../data/products';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#FDFBF7] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Header with Google Rating Summary Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#EBE3D5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="font-serif-display font-extrabold text-2xl sm:text-3xl text-[#2C221E]">
              Loved by 1,449+ Hyderabad Families
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              Authentic reviews from regular patrons visiting our Latifabad Unit 7 counter and home delivery customers across Hyderabad.
            </p>
          </div>

          {/* Rating Badge Display - Stacks nicely on narrow mobile */}
          <div className="flex items-center gap-4 sm:gap-5 bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <div className="text-center">
              <div className="font-serif-display font-black text-3xl sm:text-4xl text-[#2C221E] leading-none">
                4.1
              </div>
              <div className="flex items-center justify-center gap-0.5 text-amber-500 mt-1.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
                <Star className="w-3.5 h-3.5 fill-amber-500/30 text-amber-500" />
              </div>
              <p className="text-[10px] text-stone-500 font-semibold mt-1">Google Rating</p>
            </div>

            <div className="border-l border-amber-200/80 pl-4 sm:pl-5 space-y-1 text-xs">
              <p className="font-bold text-[#2C221E]">1,449+ Total Reviews</p>
              <p className="text-[#059669] font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>94% Recommend Rabri</span>
              </p>
              <p className="text-stone-500 text-[10px] sm:text-[11px]">Latifabad Unit 7 Branch</p>
            </div>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VERIFIED_REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DEC8] shadow-2xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3 sm:space-y-4"
            >
              <div className="space-y-2.5 sm:space-y-3">
                {/* Rating stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author & Product Tag */}
              <div className="pt-2.5 sm:pt-3 border-t border-stone-100 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#2C221E] truncate mr-1">{rev.author}</h4>
                  <span className="text-[9px] sm:text-[10px] bg-emerald-50 text-[#059669] font-semibold px-1.5 py-0.2 rounded-full border border-emerald-200/60 flex items-center gap-1 shrink-0">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-stone-500 truncate">
                  <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                  <span className="truncate">{rev.location}</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-amber-900 bg-amber-50/80 px-2 py-0.5 rounded-md inline-block font-medium truncate max-w-full">
                  Ordered: {rev.productPurchased}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Callout for WhatsApp Review or Inquiries */}
        <div className="bg-[#2C221E] text-white p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm">Have a custom catering or wedding Rabri requirement?</h3>
              <p className="text-[11px] sm:text-xs text-stone-300">We supply bulk Rabri matkas and pure milk across Hyderabad for events.</p>
            </div>
          </div>
          <a
            href="https://wa.me/923463822668?text=Salam%20Shah%20Latif%20Dairy,%20I%20have%20an%20inquiry%20for%20event%20catering%20or%20bulk%20Rabri."
            target="_blank"
            rel="noopener noreferrer"
            className="text-center shrink-0 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs px-4 sm:px-5 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Chat with Owner on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
