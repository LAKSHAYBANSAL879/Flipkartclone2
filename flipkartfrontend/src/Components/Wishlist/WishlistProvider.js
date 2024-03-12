import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({});
  const { user } = useContext(UserContext);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/wishlist/getWishlist/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setWishlist(data.wishlist);
      } else {
        console.error('Error fetching wishlist:', data.message);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId, productDetails) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/wishlist/addWishlist/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productDetails,
          userInfo: {
            name: user.name,
            email: user.email,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // setWishlist((prevItems) => ({
        //   ...prevItems,
        //   [productId]: { details: productDetails },
        // }));
        await fetchWishlist();
        toast.success('Product added to wishlist');
        console.log('Product added to wishlist:', data.message);
      } else {
        console.error('Error adding to wishlist:', data.message);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/wishlist/removeWishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInfo: { name: user.name, email: user.email } }),
      });

      const data = await response.json();

      if (response.ok) {
        setWishlist((prevItems) => {
          const updatedItems = { ...prevItems };
          delete updatedItems[productId];
          toast.warning('Product removed from wishlist');
          return updatedItems;
        });
        console.log('Product removed from wishlist:', data.message);
      } else {
        console.error('Error removing from wishlist:', data.message);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  const isProductInWishlist = (productId, productDetails) => {
 
    // const wishlist = useWishlist();
  
    if (wishlist && Array.isArray(wishlist)) {
      for (const product of wishlist) {
        if (product._id === productId) {
          return (
            product.name === productDetails.name &&
            product.price === productDetails.price
          );
        }
      }
    }
  
    return false;
  };
  

  
  
  
  
  const contextValue = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isProductInWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
export default WishlistProvider;