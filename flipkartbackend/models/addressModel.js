const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    houseNo:String,
    city:String,
    state:String,
    pincode:String,
    name:String,
    userName:{
        type:String,
        ref:'User'
    }
    
});

const Address = mongoose.model('Address', addressSchema);

module.exports =Address;
