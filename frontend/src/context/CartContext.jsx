import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [toast, setToast] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('baizona_cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      setCartItems(parsed);
      updateCartSummary(parsed);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('baizona_cart', JSON.stringify(cartItems));
    updateCartSummary(cartItems);
  }, [cartItems]);

  const updateCartSummary = (items) => {
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const showToast = (product) => {
    setToast({ product });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product, quantity = 1) => {
    let newItems;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { 
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images?.[0] || null,
          seller: product.seller?.business_name || 'Unknown',
          sellerId: product.seller_id,
          sellerPhone: product.seller?.phone
        }];
      }
      return newItems;
    });
    
    // Show toast notification (juu, hakuna buttons)
    showToast({ ...product, quantity });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      hideToast
    }}>
      {children}
      
      {/* Toast Notification - JUU, HAKUNA BUTTONS */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          animation: 'slideDown 0.3s ease'
        }}>
          <div style={{
            background: '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            minWidth: '280px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>✅</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>{toast.product?.name}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                Imeongezwa kwenye kikapu! (x{toast.product?.quantity || 1})
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </CartContext.Provider>
  );
}