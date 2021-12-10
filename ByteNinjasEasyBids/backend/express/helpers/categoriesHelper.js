const Category = require('../models/category.model');

// Get all Categories
async function getAllCategories() {
    const categories = await Category.find().exec();
    return categories;
}

// Get one Category
async function getCategory(categoryId) {
    const category = await Category.findById(categoryId).exec();
    return category;
}

// Add a Category
async function addCategory(category) {
    const name = category.name;

    const newCategory = new Category({ name, });
    await newCategory.save();
}

// Update a Category
async function updateCategory(categoryId, category) {
    const categoryToUpdate = await Category.findById(categoryId).exec();

    categoryToUpdate.name = category.name;
    await categoryToUpdate.save();
}

// Delete a Category
async function deleteCategory(categoryId) {
    await Category.findByIdAndDelete(categoryId).exec();
}

module.exports.getAllCategories = getAllCategories;
module.exports.getCategory = getCategory;
module.exports.addCategory = addCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;