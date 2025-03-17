import { createContext, useState, useContext, useMemo, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from local storage if available
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // State for the saved cart
  const [savedCart, setSavedCart] = useState(() => {
    // Load saved cart from local storage if available
    const storedSavedCart = localStorage.getItem('savedCart');
    return storedSavedCart ? JSON.parse(storedSavedCart) : null;
  });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity below 1
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Function to save the current cart before clearing
  const saveCartAndClear = () => {
    // Get current cart details
    const cartDetailsToSave = getCartDetails();
    
    // Save current cart to savedCart state
    setSavedCart(cartDetailsToSave);
    
    // Also save to localStorage for persistence
    localStorage.setItem('savedCart', JSON.stringify(cartDetailsToSave));
    
    // Clear the active cart
    setCart([]);
  };

  // Standard clear cart function (without saving)
  const clearCart = () => {
    setCart([]);
  };

  // Function to get the saved cart
  const getSavedCart = () => {
    return savedCart;
  };

  // Function to clear the saved cart
  const clearSavedCart = () => {
    setSavedCart(null);
    localStorage.removeItem('savedCart');
  };

  // Function to get total item count in cart
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get all cart details including totals
  const getCartDetails = () => {
    const itemCount = getItemCount();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return {
      items: cart,
      itemCount,
      subtotal,
      isEmpty: cart.length === 0
    };
  };

  // Persist cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Persist saved cart to local storage whenever it changes
  useEffect(() => {
    if (savedCart) {
      localStorage.setItem('savedCart', JSON.stringify(savedCart));
    }
  }, [savedCart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      saveCartAndClear,
      getSavedCart,
      clearSavedCart,
      getItemCount,
      getCartDetails,
    }),
    [cart, savedCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};