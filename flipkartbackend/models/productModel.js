
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    mainCategory: String,
    subCategory: String,
    name: String,
    brand:String,
    price: Number,
    images: [String], 
    description: String,
    features: [String],
    rating: Number,
    color:String,
    mrp:String,
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports=Product;