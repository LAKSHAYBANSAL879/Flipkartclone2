const express = require("express");
const addressRouter = express.Router();


const{
addAddress,
getAddresses,
editAddress

} = require("../controllers/addressController");

addressRouter.post('/addAddress', addAddress);
addressRouter.get('/getAddress',getAddresses);
addressRouter.put('/editAddress', editAddress);


module.exports = addressRouter;
