const express = require('express');
const questionRouter = express.Router();
const orderController = require('../controllers/questionController');

questionRouter.post('/addQuestion', orderController.addQuestion);


questionRouter.post('/addAnswer', orderController.addAnswer);


questionRouter.get('/getQuestion/:productName', orderController.getQuestionsByProduct);




module.exports = questionRouter;
