const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userInfo: {
    name: String,
    email: String,
  },
  wishlistItems: [
    {
      name: String,
      price: Number,
      description: String,
      images:[
        {
            type:String,
        },
      
      ],
    },
  ],
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
