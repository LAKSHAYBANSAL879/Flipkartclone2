const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        
    },
    userName: {
        type: String, 
        ref: 'User',
    },
});

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    answers: [answerSchema], 
    userName: {
        type: String, 
        ref: 'User',
    },
    productName: {
        type: String, 
        ref: 'Product',
        required: true,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
