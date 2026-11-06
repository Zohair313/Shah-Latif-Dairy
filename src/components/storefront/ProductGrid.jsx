import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Milk, 
  Heart, 
  Flame, 
  Soup, 
  IceCream, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ onAddToCart, onShowToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const categoryIcons = {
    Sparkles: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    Milk: <Milk className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    Heart: <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    Flame: <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    Soup: <Soup className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
    IceCream: <IceCream className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.nameUrdu.includes(q) ||
        product.shortDesc.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      }
      if (sortBy === 'price-low') {
        return a.basePrice - b.basePrice;
      }
      if (sortBy === 'price-high') {
        return b.basePrice - a.basePrice;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="py-10 sm:py-16 bg-[#FDFBF7] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-[11px] sm:text-xs font-bold border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Farm-Fresh Catalog • Latifabad Unit 7</span>
          </div>
          <h2 className="font-serif-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#2C221E] tracking-tight">
            Our Traditional Handcrafted Dairy Menu
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Every product is made with 100% natural Sindhi buffalo milk and cultured butter, slow-simmered in daily batches. Order in portions of your choice for home delivery or store pickup.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-[#EBE3D5] shadow-xs space-y-3 sm:space-y-4">
          
          {/* Top Row: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search milk, rabri, desi ghee, makhan, dahi..."
                className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs sm:text-sm text-[#2C221E] placeholder:text-stone-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & Product Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-1 sm:pt-0">
              <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Showing <strong className="text-[#2C221E]">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[11px] sm:text-xs py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

          {/* Bottom Row: Category Filter Tabs with Horizontal Edge-to-Edge Touch Scroll */}
          <div className="overflow-x-auto pb-1 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = cat.id === 'all' 
                  ? PRODUCTS.length 
                  : PRODUCTS.filter(p => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isSelected
                        ? 'bg-[#2C221E] text-white shadow-md shadow-stone-900/10'
                        : 'bg-[#FAF7F0] hover:bg-[#F0EBE0] text-stone-700 border border-stone-200/80'
                    }`}
                  >
                    <span className={isSelected ? 'text-amber-400' : 'text-stone-500'}>
                      {categoryIcons[cat.icon]}
                    </span>
                    <span>{cat.name}</span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Product Cards Grid: Responsive 1 col mobile, 2 col tablet, 3-4 col desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#2C221E]">No dairy products found</h3>
            <p className="text-xs text-stone-600">
              No items match your search for "{searchQuery}". Try searching for "rabri", "ghee", or "doodh".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-bold text-amber-800 underline hover:text-amber-900"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
