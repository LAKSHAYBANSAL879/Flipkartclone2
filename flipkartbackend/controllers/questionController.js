const Question = require('../models/questionModel');


const addQuestion = async (req, res) => {
    try {
        const { content, userName, productName } = req.body;

        const question = new Question({
            content,
            userName,
            productName,
        });

        await question.save();

        res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addAnswer = async (req, res) => {
    try {
        const { questionId, content, userName } = req.body;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        question.answers.push({
            content,
            userName,
        });

        await question.save();

        res.status(201).json({ message: 'Answer added successfully', question });
    } catch (error) {
        console.error('Error adding answer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getQuestionsByProduct = async (req, res) => {
    try {
        let { productName } = req.params;
    
        productName = decodeURIComponent(productName);

        const questions = await Question.find({ productName });
      console.log({questions});
        res.json({questions});
    } catch (error) {
        console.error('Error getting questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addQuestion, addAnswer, getQuestionsByProduct };
