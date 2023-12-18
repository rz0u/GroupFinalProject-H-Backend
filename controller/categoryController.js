const Category = require("../models/category");
// const router = require("express").Router();
const ErrorHandler = require("../utils/ErrorHandler");
// const sendToken = require("../utils/jwtToken");
// import * as jwt from "jsonwebtoken";

const createCategory = async (req, res) => {
  try {
    // const { role } = req.user;
    
    // if (role !== "admin") {
    //   return res.status(403).json({ error: 'Unauthorized: Access is denied.' });
    // }

    const name = req.body.name;
    console.log("name:", name)
    const newCategory = await Category.create({ name });
    res.status(200).json({
      message: 'Category successfully created',
      data: newCategory
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
}

const getAllCategory = async (req, res) => {
    try {
      // const { role } = req.user;
      
      // if (role !== "admin") {
      //   return res.status(403).json({ error: 'Unauthorized: Access is denied.' });
      // }

      const categoryId = parseInt(req.params.id);
      const category = await Category.get({ id: categoryId });
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get category' });
    }
  }

const editCategory = async (req, res) => {
    try {
      // const { role } = req.user;
      
      // if (role !== "admin") {
      //   return res.status(403).json({ error: 'Unauthorized: Access is denied.' });
      // }

      const categoryId = parseInt(req.params.id);
      const dataToUpdate = req.body;
      const editCategory = await Category.update(categoryId, dataToUpdate);
      res.status(200).json(editCategory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update category' });
    }
  }

const deleteCategory = async (req, res) => {
    try {
      // const { role } = req.user;
      
      // if (role !== "admin") {
      //   return res.status(403).json({ error: 'Unauthorized: Access is denied.' });
      // }

      const categoryId = parseInt(req.params.id);
      await Category.delete(categoryId);
      res.status(204).send(); // No content after successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }

  module.exports = {
    getAllCategory,
    createCategory,
    editCategory,
    deleteCategory
  }