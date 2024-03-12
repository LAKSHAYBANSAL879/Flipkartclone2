const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.post('/addOrder', orderController.addOrder);


orderRouter.get('/getOrders', orderController.getOrders);


orderRouter.get('/getOrder/:id', orderController.getOrderById);


orderRouter.put('/updateOrder/:id', orderController.updateOrder);

module.exports = orderRouter;
