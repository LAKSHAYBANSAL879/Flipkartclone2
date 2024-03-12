import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CartContextProvider = ({ children }) => {

  const initialCart = JSON.parse(sessionStorage.getItem('cart')) || {};
  const [cartItems, setCartItems] = useState(initialCart);

  const saveCartToStorage = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = (productId, productDetails,size) => {
    setCartItems((prevItems) => {
      const existingQuantity = prevItems[productId]?.quantity || 0;
      const updatedItems = {
        ...prevItems,
        [productId]: {
          ...prevItems[productId],
          quantity: existingQuantity + 1,
          size: size,
          ...productDetails,
        },
      };
      console.log("added to cart successfully",productDetails,size)
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    if (cartItems[productId]?.quantity > 1) {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        updatedItems[productId].quantity -= 1;
        saveCartToStorage(updatedItems);
        return updatedItems;
      });
    } else {
     
      removeFromCartCompletely(productId);
    }
  };
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  const itemTotal = (productId) => {
    const item = cartItems[productId];
    
    if (item && item.productDetails && item.productDetails.price && item.quantity) {
      const total = item.productDetails.price * item.quantity;
      return total;
    }

    return 0;
  };
  const getTotalCost = () => {
    let totalCost = 0;
  
    for (const productId in cartItems) {
    //   const productDetails = cartItems[productId].productDetails;
      totalCost += cartItems[productId].price * cartItems[productId].quantity;
    //   if (productDetails && productDetails.price) 
    //   {
    //     totalCost += productDetails.price * cartItems[productId].quantity;
    //   }
    }
  
    return totalCost;
  };
  const getTotalMrp=()=>{
    let totalMrp=0;
    for(const productId in cartItems){
      totalMrp+=cartItems[productId].mrp*cartItems[productId].quantity;
    }
    return totalMrp;
  }
  const removeFromCartCompletely = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[productId];
      saveCartToStorage(updatedItems);
      return updatedItems;
    });
  };
  const clearCart = () => {
    setCartItems({});
    saveCartToStorage({});
  };
  const supercoinsEarned = () => {
    let supercoins = 0;
    const totalCost = getTotalCost(); 
  
    if (totalCost > 10000) {
      supercoins = 100;
    } else {
      supercoins = totalCost / 100;
    }
    console.log("supercoins earned are ",supercoins);
    return supercoins;
  }
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalCost,
    itemTotal,
    removeFromCartCompletely,
    getTotalMrp,
    clearCart,
    supercoinsEarned
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
