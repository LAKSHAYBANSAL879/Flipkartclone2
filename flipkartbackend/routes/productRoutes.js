const express = require("express");
const productRouter = express.Router();


const{

getAllProducts,
getProductByName,
addProduct
} = require("../controllers/productController");

productRouter.post('/newProduct', addProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getProduct/:name', getProductByName);


module.exports = productRouter;
