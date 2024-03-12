const express = require('express');
const reviewRouter = express.Router();
const multer = require('multer');
const reviewController = require('../controllers/reviewController');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage }).any();

reviewRouter.post('/add', upload, reviewController.addReview);
reviewRouter.get('/all/:productName', reviewController.getAllReviews);
reviewRouter.put('/update/:id', upload, reviewController.updateReview);
reviewRouter.delete('/delete/:id', reviewController.deleteReview);


reviewRouter.use('/uploads', express.static('uploads'));

module.exports = reviewRouter;
