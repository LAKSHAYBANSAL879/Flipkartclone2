const Razorpay = require('razorpay');
const crypto=require('crypto')
const Payment=require("../models/paymentModel");
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
exports.payment= async (req, res) => {
    const { amount, currency} = req.body;
  
    const options = {
      amount: amount * 100, 
      currency,
      
    };
  
    try {
      const paymentResponse = await instance.orders.create(options);
      res.json({ sucess:true,paymentResponse});
    } catch (error) {
      console.error('Razorpay payment error:', error);
      res.status(500).json({ error: 'Razorpay payment failed' });
    }
  };
  exports.paymentVerification=async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
   

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
  };