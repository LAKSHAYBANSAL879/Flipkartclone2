const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel'); 

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        let wishlist = await Wishlist.findOne({ 'userInfo.email': req.body.userInfo.email });

        if (!wishlist) {
            wishlist = new Wishlist({
                userInfo: {
                    name: req.body.userInfo.name,
                    email: req.body.userInfo.email,
                },
                wishlistItems: [],
            });
        }

        const existingProduct = wishlist.wishlistItems.find(item => item._id.toString() === productId);

        if (existingProduct) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }

   
        const productDetails = await Product.findById(productId);

        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, price, description, images } = productDetails;

        wishlist.wishlistItems.push({
            _id: productId, 
            name,
            price,
            description,
            images,
        });

        await wishlist.save();

        res.status(200).json({ message: 'Product added to the wishlist', wishlist: wishlist.wishlistItems });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

  exports.removeFromWishlist = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const wishlist = await Wishlist.findOne({ 'userInfo.email': req.body.userInfo.email });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      if (Array.isArray(wishlist.wishlistItems)) {
        wishlist.wishlistItems = wishlist.wishlistItems.filter(item => item._id.toString() !== productId);
      } else {
        console.error('wishlistItems is not an array');
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      await wishlist.save();
  
      res.status(200).json({ message: 'Product removed from the wishlist', wishlist: wishlist.wishlistItems });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.getWishlist = async (req, res) => {
    try {
      const { email } = req.params;
    //   console.log('Email:', email);
  
      let wishlist = await Wishlist.findOne({ 'userInfo.email': email });
    //   console.log('Wishlist:', wishlist);
  
      res.status(200).json({ message: 'Wishlist retrieved successfully', wishlist: wishlist.wishlistItems });
    } catch (error) {
      console.error('Error getting wishlist:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  