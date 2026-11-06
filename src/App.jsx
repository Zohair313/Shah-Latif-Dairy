import React, { useState } from 'react';
import Header from './components/Header';
import NotificationToast from './components/NotificationToast';

// Storefront components
import Hero from './components/storefront/Hero';
import TrustBar from './components/storefront/TrustBar';
import ProductGrid from './components/storefront/ProductGrid';
import PurityStory from './components/storefront/PurityStory';
import ReviewsSection from './components/storefront/ReviewsSection';
import CartDrawer from './components/storefront/CartDrawer';
import Footer from './components/storefront/Footer';

// POS component
import PosDashboard from './components/pos/PosDashboard';

export default function App() {
  // Application Mode: 'storefront' (Customer View) or 'pos' (Internal Cashier View)
  const [currentMode, setCurrentMode] = useState('storefront');

  // Customer Shopping Cart State
  const [cartItems, setCartItems] = useState([
    // Seed initial cart item so the user immediately sees a live cart in action!
    {
      productId: 'lachha-rabri',
      name: 'Famous Latifabad Lachha Rabri',
      nameUrdu: 'شاہ لطیف روایتی لچھا ربڑی',
      category: 'rabri',
      unit: 'KG',
      portionLabel: '500g (Half KG Dabba)',
      multiplier: 0.5,
      unitPrice: 550,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Helper to trigger toast notification with auto-dismiss
  const showToast = ({ type = 'info', title, message }) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Cart operations
  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === newItem.productId && item.portionLabel === newItem.portionLabel
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + newItem.quantity
        };
        return next;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (productId, portionLabel, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, portionLabel);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.portionLabel === portionLabel
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId, portionLabel) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.portionLabel === portionLabel)
      )
    );
    showToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Item removed from your cart.'
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast({
      type: 'info',
      title: 'Cart Cleared',
      message: 'Your shopping cart is now empty.'
    });
  };

  // Total calculations for Header badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C221E] selection:bg-amber-200 selection:text-amber-950 font-sans">
      
      {/* Global Header & Navigation */}
      <Header
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        cartCount={totalCartCount}
        cartSubtotal={cartSubtotal}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Content Area based on Mode */}
      <main className="flex-1">
        {currentMode === 'storefront' ? (
          <div>
            {/* Customer Storefront Mode */}
            <Hero onBrowseClick={scrollToProducts} />
            <TrustBar />
            <ProductGrid 
              onAddToCart={handleAddToCart} 
              onShowToast={showToast} 
            />
            <PurityStory />
            <ReviewsSection />
          </div>
        ) : (
          <div>
            {/* Internal Cashier / Counter POS Mode */}
            <PosDashboard onShowToast={showToast} />
          </div>
        )}
      </main>

      {/* Footer (Visible primarily on Storefront, but also provides quick link from POS) */}
      <Footer onSwitchToPos={() => {
        setCurrentMode('pos');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Floating Notification Toast */}
      <NotificationToast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />

    </div>
  );
}
