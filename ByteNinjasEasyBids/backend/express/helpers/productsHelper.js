const Product = require('../models/product.model');

// Get all Products
async function getAllProducts() {
    const products = await Product.find().exec();
    return products;
}

// Get one Product
async function getProduct(productId) {
    const product = await Product.findById(productId).exec();
    return product;
}

// Add a Product
async function addProduct(product) {
    const name = product.name;
    const description = product.description;
    const sellerId = product.sellerId;
    const startTime = product.startTime;
    const duration = product.duration;
    const originalPrice = product.originalPrice;
    const biddingPrice = product.biddingPrice;
    const minSellingPrice = product.minSellingPrice;
    const participants = product.participants;
    const winner = product.winner;
    const shippingStatus = product.shippingStatus;

    const newProduct = new Product({ 
        name, 
        description, 
        sellerId, 
        startTime, 
        duration,
        originalPrice,
        biddingPrice, 
        minSellingPrice, 
        participants,
        winner,
        shippingStatus,
    });

    await newProduct.save()
}

// Update a Product
async function updateProduct(productId, product) {
    const productToUpdate = await Product.findById(productId).exec();

    productToUpdate.name = product.name;
    productToUpdate.description = product.description;
    productToUpdate.sellerId = product.sellerId;
    productToUpdate.startTime = Number(product.startTime);
    productToUpdate.duration = Number(product.duration);
    productToUpdate.biddingPrice = Number(product.biddingPrice);
    productToUpdate.minSellingPrice = Number(product.minSellingPrice);
    productToUpdate.participants = product.participants;
    productToUpdate.winner = product.winner;
    productToUpdate.shippingStatus = product.shippingStatus;

    await productToUpdate.save();
}

// Delete a Product
async function deleteProduct(productId) {
    await Product.findByIdAndDelete(productId).exec();
}

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;