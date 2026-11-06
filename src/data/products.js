// Shah Latif Dairy Hyderabad - Core Product Catalog & Data
// Location: Main Road, Latifabad Unit 7, Hyderabad
// Phone/WhatsApp: +92 346 3822668

export const STORE_INFO = {
  name: "Shah Latif Dairy Hyderabad",
  nameUrdu: "شاہ لطیف ڈیری حیدرآباد",
  tagline: "Authentic Sindhi Heritage Dairy & Traditional Lachha Rabri",
  taglineUrdu: "روایتی ذائقہ، خالص پن اور دہائیوں کا اعتماد",
  phone: "+92 346 3822668",
  phoneRaw: "923463822668",
  whatsappUrl: "https://wa.me/923463822668",
  address: "Main Road, Latifabad Unit 7, Hyderabad, Sindh, Pakistan",
  shortAddress: "Latifabad Unit 7, Hyderabad",
  rating: 4.1,
  totalReviews: 1449,
  operatingHours: "6:00 AM – 11:30 PM (Daily)",
  morningBatchTime: "6:00 AM Fresh Dispatch",
  eveningBatchTime: "5:00 PM Evening Kadhai Batch",
  deliveryFee: 100,
  freeDeliveryThreshold: 1500,
  branches: [
    { id: 1, name: "Main Latifabad Unit 7 Branch", address: "Main Road, Near Gol Building, Latifabad Unit 7", phone: "+92 346 3822668" }
  ]
};

export const HYDERABAD_AREAS = [
  "Latifabad Unit 7 (Main Branch Area)",
  "Latifabad Unit 1",
  "Latifabad Unit 2",
  "Latifabad Unit 3",
  "Latifabad Unit 4",
  "Latifabad Unit 5",
  "Latifabad Unit 6",
  "Latifabad Unit 8",
  "Latifabad Unit 9",
  "Latifabad Unit 10",
  "Latifabad Unit 11",
  "Latifabad Unit 12",
  "Qasimabad Phase 1 & 2",
  "Qasimabad Sheedi Goth",
  "Saddar Cantt",
  "Auto Bhan Road",
  "Citizen Colony",
  "Hirabad",
  "Gul Centre / Station Road",
  "Wadhu Wah Road",
  "Other Area (Specify in Notes)"
];

export const CATEGORIES = [
  { id: "all", name: "All Products", nameUrdu: "تمام مصنوعات", icon: "Sparkles" },
  { id: "milk", name: "Fresh Milk", nameUrdu: "خالص دودھ", icon: "Milk" },
  { id: "rabri", name: "Lachha Rabri", nameUrdu: "لچھا ربڑی", icon: "Heart" },
  { id: "ghee-butter", name: "Desi Ghee & Butter", nameUrdu: "دیسی گھی و مکھن", icon: "Flame" },
  { id: "yogurt", name: "Fresh Dahi / Yogurt", nameUrdu: "تازہ دہی", icon: "Soup" },
  { id: "kulfi", name: "Traditional Kulfi", nameUrdu: "روایتی قلفی", icon: "IceCream" }
];

export const PRODUCTS = [
  {
    id: "fresh-cream-milk",
    category: "milk",
    name: "Fresh Cream Buffalo Milk (Khara Doodh)",
    nameUrdu: "خالص کڑھا بھینس کا دودھ",
    shortDesc: "Rich, whole buffalo milk with thick natural malai layer. Delivered chilled and unadulterated.",
    fullDesc: "Sourced directly from selected Sindhi grass-fed buffaloes. Delivered within hours of milking. Natural 7%+ butterfat yielding thick golden clotted cream layer when boiled. 100% natural, zero water or starch.",
    basePrice: 240,
    unit: "Liter",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    badge: "Daily Morning & Evening Batch",
    isBestseller: true,
    isPopularInHyderabad: true,
    quickPos: true,
    freshnessNote: "Fresh Evening Batch Ready",
    fatContent: "7.2% Natural Fat",
    portions: [
      { label: "1 Liter", multiplier: 1, default: true },
      { label: "2 Liters", multiplier: 2 },
      { label: "5 Liters (Can)", multiplier: 5, discount: 50 },
      { label: "10 Liters (Family)", multiplier: 10, discount: 150 }
    ]
  },
  {
    id: "lachha-rabri",
    category: "rabri",
    name: "Famous Latifabad Lachha Rabri",
    nameUrdu: "شاہ لطیف روایتی لچھا ربڑی",
    shortDesc: "Our world-famous Hyderabad specialty. Thick hand-scraped layered cream flakes slow-cooked in iron kadhai.",
    fullDesc: "Prepared with 4 hours of gentle simmering in heavy iron pans. Sweetened delicately with cardamom and saffron essence. Served fresh with thick textural 'lachhey' (layers). Renowned throughout Hyderabad and Karachi travelers.",
    basePrice: 1100,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    badge: "Hyderabad Signature Specialty",
    isBestseller: true,
    isPopularInHyderabad: true,
    quickPos: true,
    freshnessNote: "Fresh Kadhai Batch Available",
    fatContent: "Pure Cream Flakes",
    portions: [
      { label: "250g (Quarter KG)", multiplier: 0.25, priceOverride: 280 },
      { label: "500g (Half KG Dabba)", multiplier: 0.5, priceOverride: 550, default: true },
      { label: "1 KG (Standard Box)", multiplier: 1, priceOverride: 1100 },
      { label: "2 KG (Traditional Clay Matka)", multiplier: 2, priceOverride: 2150 }
    ]
  },
  {
    id: "danedar-desi-ghee",
    category: "ghee-butter",
    name: "Danedar Desi Ghee (Bilona Churned)",
    nameUrdu: "خالص دانے دار دیسی گھی",
    shortDesc: "Slow-clarified traditional butterfat with heavenly aroma and golden granular texture.",
    fullDesc: "Crafted following the centuries-old Bilona method: cultured whole curd churned into white butter, then slow-simmered over low firewood flames. Golden grains (danedar), deep nutty aroma, 0% chemicals, 100% pure heritage fat.",
    basePrice: 2600,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    badge: "100% Pure Danedar Guaranteed",
    isBestseller: true,
    isPopularInHyderabad: true,
    quickPos: true,
    freshnessNote: "Pure Bilona Cultured",
    fatContent: "99.8% Pure Milk Fat",
    portions: [
      { label: "500g Glass Jar", multiplier: 0.5, priceOverride: 1350 },
      { label: "1 KG Tin / Jar", multiplier: 1, priceOverride: 2600, default: true },
      { label: "2 KG Tin Pack", multiplier: 2, priceOverride: 5100 },
      { label: "5 KG Catering Tin", multiplier: 5, priceOverride: 12500 }
    ]
  },
  {
    id: "pure-safaid-makhan",
    category: "ghee-butter",
    name: "Fresh White Village Butter (Safaid Makhan)",
    nameUrdu: "خالص سفید مکھن (ہاتھ کا مکھن)",
    shortDesc: "Daily churned unsalted white butter. Melt-in-mouth freshness perfect for hot parathas.",
    fullDesc: "Freshly churned each morning from natural fermented curd. Silky, non-greasy, unsalted, and completely free of artificial coloring or preservatives.",
    basePrice: 1250,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80",
    badge: "Daily Morning Churn",
    isBestseller: false,
    isPopularInHyderabad: false,
    quickPos: true,
    freshnessNote: "Morning Churn",
    fatContent: "82% Milk Fat",
    portions: [
      { label: "250g Pack", multiplier: 0.25, priceOverride: 320 },
      { label: "500g Tub", multiplier: 0.5, priceOverride: 640, default: true },
      { label: "1 KG Pack", multiplier: 1, priceOverride: 1250 }
    ]
  },
  {
    id: "meetha-handi-dahi",
    category: "yogurt",
    name: "Clay Handi Meetha Dahi (Sweet Yogurt)",
    nameUrdu: "مٹی کی ہانڈی والا میٹھا دہی",
    shortDesc: "Thick, naturally sweetened curd fermented inside porous earthen terracotta pots.",
    fullDesc: "The natural clay pot absorbs excess moisture, giving this yogurt a thick, pudding-like consistency with a distinct caramelized earthen fragrance. Mildly sweetened and topped with dry fruits.",
    basePrice: 420,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80",
    badge: "Clay Pot Fermented",
    isBestseller: false,
    isPopularInHyderabad: true,
    quickPos: false,
    freshnessNote: "Set in Clay Kunri",
    fatContent: "Rich Creamy Curd",
    portions: [
      { label: "500g Handi", multiplier: 0.5, priceOverride: 220 },
      { label: "1 KG Terracotta Handi", multiplier: 1, priceOverride: 420, default: true },
      { label: "2 KG Feast Bowl", multiplier: 2, priceOverride: 800 }
    ]
  },
  {
    id: "sada-khara-dahi",
    category: "yogurt",
    name: "Fresh Sada Plain Dahi (Thick Curd)",
    nameUrdu: "خالص سادہ گاڑھا دہی",
    shortDesc: "Dense, low-acid plain curd ideal for daily cooking, raita, and lassi.",
    fullDesc: "Made with whole buffalo milk. High live probiotic cultures, no added gelatins or stabilizers. Perfect balance of creamy texture and gentle tanginess.",
    basePrice: 320,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    badge: "Dense & Spoonable",
    isBestseller: false,
    isPopularInHyderabad: false,
    quickPos: true,
    freshnessNote: "Fresh Daily Set",
    fatContent: "Natural Probiotic",
    portions: [
      { label: "500g Bag / Tub", multiplier: 0.5, priceOverride: 160 },
      { label: "1 KG Tub", multiplier: 1, priceOverride: 320, default: true },
      { label: "2 KG Tub", multiplier: 2, priceOverride: 640 },
      { label: "5 KG Bucket", multiplier: 5, priceOverride: 1550 }
    ]
  },
  {
    id: "khoya-pista-kulfi",
    category: "kulfi",
    name: "Traditional Khoya Malai Pista Kulfi",
    nameUrdu: "شاہی ملائی و پستہ قلفی",
    shortDesc: "Slow-reduced rabri kulfi with crushed green pistachios, almonds, and saffron.",
    fullDesc: "Prepared with thick rabri condensed to half its volume, infused with fresh green pistachios and fragrant green cardamom. Served on wooden sticks or mini clay sakoras.",
    basePrice: 120,
    unit: "Piece",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
    badge: "Real Khoya & Pistachio",
    isBestseller: true,
    isPopularInHyderabad: true,
    quickPos: true,
    freshnessNote: "Freshly Frozen",
    fatContent: "Authentic Rabri Base",
    portions: [
      { label: "1 Single Stick", multiplier: 1, priceOverride: 120, default: true },
      { label: "Box of 6 Sticks", multiplier: 6, priceOverride: 680 },
      { label: "Clay Matka Kulfi (Large)", multiplier: 1.5, priceOverride: 180 },
      { label: "Party Pack (12 Sticks)", multiplier: 12, priceOverride: 1300 }
    ]
  },
  {
    id: "fresh-malai-paneer",
    category: "ghee-butter",
    name: "Fresh Soft Malai Paneer",
    nameUrdu: "تازہ ملائی پنیر",
    shortDesc: "Super soft, moist homemade cottage cheese made from fresh buffalo milk.",
    fullDesc: "Spongy, succulent, and rich in natural milk proteins. Ideal for Shahi Paneer, Palak Paneer, or grilled snacks.",
    basePrice: 950,
    unit: "KG",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    badge: "100% Fresh Daily Cut",
    isBestseller: false,
    isPopularInHyderabad: false,
    quickPos: false,
    freshnessNote: "Cut to Order",
    fatContent: "High Protein",
    portions: [
      { label: "250g Slab", multiplier: 0.25, priceOverride: 250 },
      { label: "500g Slab", multiplier: 0.5, priceOverride: 480, default: true },
      { label: "1 KG Slab", multiplier: 1, priceOverride: 950 }
    ]
  }
];

export const TRUST_FACTORS = [
  {
    id: 1,
    title: "4.1★ Verified Rating",
    subtitle: "1,449+ authentic local Hyderabad reviews on Google Maps",
    icon: "Star",
    highlight: "Latifabad's Pride"
  },
  {
    id: 2,
    title: "100% Danedar Desi Ghee",
    subtitle: "Bilona churned from pure curd. Zero chemical essence or palm oil.",
    icon: "Award",
    highlight: "Lab Tested Pure"
  },
  {
    id: 3,
    title: "Farm-Fresh Twice Daily",
    subtitle: "Morning 6:00 AM dispatch & evening 5:00 PM hot kadhai Rabri",
    icon: "Clock",
    highlight: "Guaranteed Fresh"
  },
  {
    id: 4,
    title: "Latifabad Cold Delivery",
    subtitle: "Fast insulated delivery across Latifabad, Qasimabad, Saddar",
    icon: "Truck",
    highlight: "Under 45 Mins"
  }
];

export const VERIFIED_REVIEWS = [
  {
    id: 1,
    author: "Engr. Tariq Mehmood Memon",
    location: "Latifabad Unit 6, Hyderabad",
    rating: 5,
    date: "2 days ago",
    review: "The Lachha Rabri at Shah Latif Dairy is truly the best in all of Hyderabad. Even better than the old city shops! The layers are so distinct and not overly sugary. Whenever relatives visit from Karachi, I always buy from here.",
    productPurchased: "Lachha Rabri (1 KG Box)"
  },
  {
    id: 2,
    author: "Dr. Farzana Shaikh",
    location: "Qasimabad Phase 2, Hyderabad",
    rating: 5,
    date: "1 week ago",
    review: "We have been getting their fresh buffalo milk every morning for our family. The malai layer is so thick my mother makes our own desi ghee from it every two weeks. Completely pure khara doodh.",
    productPurchased: "Fresh Cream Buffalo Milk"
  },
  {
    id: 3,
    author: "Haji Abdul Rehman Ansari",
    location: "Latifabad Unit 7 (Main Road)",
    rating: 4,
    date: "2 weeks ago",
    review: "Their Danedar Desi Ghee has the traditional aroma that our elders used to make in the village. Danedar texture and pure butterfat flavor. Highly recommended for sweets and daily cooking.",
    productPurchased: "Danedar Desi Ghee (2 KG Tin)"
  },
  {
    id: 4,
    author: "Kashif Ali Mughal",
    location: "Auto Bhan Road, Hyderabad",
    rating: 5,
    date: "3 weeks ago",
    review: "Very fast WhatsApp delivery service in Hyderabad! Sent an order for 2kg Rabri and 6 Pista Kulfis for a dinner party, arrived within 35 minutes nicely packed with ice bags.",
    productPurchased: "Rabri + Khoya Kulfi"
  }
];

export const QUICK_POS_ITEMS = [
  { id: "fresh-cream-milk-1l", productId: "fresh-cream-milk", name: "1L Milk (Doodh)", portionLabel: "1 Liter", price: 240, color: "bg-emerald-50 text-emerald-800 border-emerald-300" },
  { id: "fresh-cream-milk-2l", productId: "fresh-cream-milk", name: "2L Milk (Doodh)", portionLabel: "2 Liters", price: 480, color: "bg-emerald-50 text-emerald-800 border-emerald-300" },
  { id: "fresh-cream-milk-5l", productId: "fresh-cream-milk", name: "5L Milk (Can)", portionLabel: "5 Liters (Can)", price: 1150, color: "bg-emerald-100 text-emerald-900 border-emerald-400" },
  { id: "lachha-rabri-250g", productId: "lachha-rabri", name: "Rabri 250g (Pao)", portionLabel: "250g (Quarter KG)", price: 280, color: "bg-amber-50 text-amber-900 border-amber-300" },
  { id: "lachha-rabri-500g", productId: "lachha-rabri", name: "Rabri 500g (Aadha KG)", portionLabel: "500g (Half KG Dabba)", price: 550, color: "bg-amber-100 text-amber-950 border-amber-400" },
  { id: "lachha-rabri-1kg", productId: "lachha-rabri", name: "Rabri 1 KG Dabba", portionLabel: "1 KG (Standard Box)", price: 1100, color: "bg-amber-200 text-amber-950 border-amber-500 font-bold" },
  { id: "danedar-ghee-1kg", productId: "danedar-desi-ghee", name: "Desi Ghee 1 KG", portionLabel: "1 KG Tin / Jar", price: 2600, color: "bg-yellow-50 text-yellow-900 border-yellow-300" },
  { id: "sada-dahi-1kg", productId: "sada-khara-dahi", name: "Sada Dahi 1 KG", portionLabel: "1 KG Tub", price: 320, color: "bg-stone-100 text-stone-900 border-stone-300" },
  { id: "sada-dahi-500g", productId: "sada-khara-dahi", name: "Sada Dahi 500g", portionLabel: "500g Bag / Tub", price: 160, color: "bg-stone-50 text-stone-800 border-stone-200" },
  { id: "pista-kulfi-1", productId: "khoya-pista-kulfi", name: "Pista Kulfi (1 Pc)", portionLabel: "1 Single Stick", price: 120, color: "bg-rose-50 text-rose-900 border-rose-300" },
  { id: "pista-kulfi-box", productId: "khoya-pista-kulfi", name: "Kulfi Box (6 Pcs)", portionLabel: "Box of 6 Sticks", price: 680, color: "bg-rose-100 text-rose-950 border-rose-400" }
];

