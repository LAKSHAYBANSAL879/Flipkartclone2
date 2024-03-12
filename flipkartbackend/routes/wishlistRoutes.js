const express = require('express');
const wishlistRouter = express.Router();
const wishlistController = require('../controllers/wishlistController');

wishlistRouter.post('/addWishlist/:productId', wishlistController.addToWishlist);
wishlistRouter.delete('/removeWishlist/:productId', wishlistController.removeFromWishlist);
wishlistRouter.get('/getWishlist/:email', wishlistController.getWishlist);



module.exports = wishlistRouter;
