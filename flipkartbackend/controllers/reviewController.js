const Review = require('../models/reviewModel');
const User = require('../models/userModel'); 
const Product = require('../models/productModel'); 


const addReview = async (req, res) => {
    try {
        const { title, description, rating, productName, userName } = req.body;
        const image = req.files.map(file => file.filename);
        console.log(image);
        const existingProduct = await Product.findOne({name:productName});
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingUser = await User.findOne({name:userName});
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        // const userId = req.user._id;

        // Create a new review
        const newReview = new Review({
            title,
            description,
            rating,
            productName:existingProduct.name,
            userName:existingUser.name,
            image
           
        });

       
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
        console.log(req.body);
    } catch (error) {
        console.error('Error adding review:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAllReviews = async (req, res) => {
    try {
        const {productName}=req.params;
        const reviews = await Review.find({productName});

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateReview = async (req, res) => {
    try {
        const { title, description, rating, productName, userName, image } = req.body;
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const user = await User.findOne({ name: review.userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.name !== review.userName) {
            return res.status(403).json({ message: 'You do not have permission to update this review' });
        }

        review.title = title;
        review.description = description;
        review.rating = rating;
        review.productName = productName;
        review.userName = userName;
        review.image = image;

        const updatedReview = await review.save();

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const user = await User.findOne({ name: review.userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.name !== review.userName) {
            return res.status(403).json({ message: 'You do not have permission to delete this review' });
        }

        await Review.deleteOne({ _id: id }); 

        res.status(204).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
};
