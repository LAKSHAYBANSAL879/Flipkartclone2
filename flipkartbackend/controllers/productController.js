const Product = require('../models/productModel');

exports.addProduct = async (req, res) => {
    try {
        const {
            mainCategory,
            subCategory,
            name,
            brand,
            price,
            images,
            description,
            features,
            rating,
            color,
            mrp,
        } = req.body;

        const newProduct = new Product({
            mainCategory,
            subCategory,
            name,
            brand,
            price,
            images,
            description,
            features,
            rating,
            color,
            mrp,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error adding product',
            error: error.message,
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();

        res.status(200).json({
            success: true,
            message: 'All products retrieved successfully',
            data: allProducts,
        });
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching all products',
            error: error.message,
        });
    }
};

exports.getProductByName = async (req, res) => {
    const { name } = req.params;

    try {
        const product = await Product.findOne({ name });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            data: product,
        });
    } catch (error) {
        console.error('Error fetching product by name:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching product by name',
            error: error.message,
        });
    }
};
