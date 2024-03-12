const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
      
    },
    description: {
        type: String,
       
    },
    rating: {
        type: Number,
        
        min: 0,
        max: 5
    },
    productName: {
        type: String,
        ref: 'Product',
       
    },
    image: [{
        type: String, 
}],
    userName: {
        type: String,
        ref: 'User', 
       
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
