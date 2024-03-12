const Order = require('../models/orderModels.js');


exports.addOrder = async (req, res) => {
  try {
    
    const { deliveryAddress, cartItems, modeofPayment,userInfo,cartTotal,supercoinsEarned } = req.body;

    const order = new Order({
      deliveryAddress,
      userInfo,
      cartItems,
      modeofPayment,
      cartTotal,
      supercoinsEarned,
      
    });

   
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


exports.getOrders = async (req, res) => {
  try {
   
    const orders = await Order.find();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


exports.getOrderById = async (req, res) => { 
   try {
    const orderId = req.params.id;

    
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error getting order by ID:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

   
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
