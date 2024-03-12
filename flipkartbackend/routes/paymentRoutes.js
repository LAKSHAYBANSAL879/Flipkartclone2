const express = require('express');
const PaymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');
PaymentRouter.post('/payment',paymentController.payment);
PaymentRouter.post('/paymentVerification',paymentController.paymentVerification);
module.exports=PaymentRouter;