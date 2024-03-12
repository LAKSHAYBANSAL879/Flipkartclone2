const { timeStamp } = require('console');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  deliveryAddress: {
   
    houseNo: String,
    city: String,
    state: String,
    pincode: String,
    name: String,
    
   
  },
  userInfo: {
   
    name: String,
    email: String,

  },
  cartItems: [
    {
     name: String,
      price: Number,
      quantity: Number,
      image:String,
      size:Number,
    },
  ],
  deliveryStatus: {
    type: String,
    enum: ['placed', 'shipped', 'out for delivery', 'delivered','cancelled'],
    default: 'placed',
  },
  modeofPayment:{
    type:String
  },
  cartTotal:{
 totalamt:String
  },
  supercoinsEarned:Number,
  

},
{timestamps:true},

);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
