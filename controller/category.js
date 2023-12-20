const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    console.log("name:", name);
    const newCategory = await Category.create({ name });
    res.status(200).json({
      message: "Category successfully created",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

const getCategoryId = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await Category.get({ id: categoryId });
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to get category" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.getAll();
    console.log(categories);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get category" });
  }
};

const editCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const dataToUpdate = req.body;
    const editCategory = await Category.update(categoryId, dataToUpdate);
    res.status(200).json(editCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    await Category.delete(categoryId);
    res.status(204).send(); // No content after successful deletion
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  getAllCategory,
  getCategoryId,
  createCategory,
  editCategory,
  deleteCategory,
};
