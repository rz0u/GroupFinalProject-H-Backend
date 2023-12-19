const ErrorHandler = require("../utils/ErrorHandler");
const isAuthenticated = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/Product");
const User = require("../models/User");

// Create Product // butuh input dari yg lain
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { title, description, img, categoryId, price, gallery } = req.body;
    const user = req.user.id;
    console.log("---------userId:", user);
    let arr = [];
    for (const item in gallery) {
      arr.push({ img: gallery[item].img });
    }

    const loadGallery = {
      create: arr,
    };

    console.log("body gallery: ", loadGallery);

    const newProduct = await Product.create({
      title,
      description,
      img,
      categoryId,
      price,
      gallery: loadGallery,
      userId: user,
    });

    res.status(201).json({
      success: true,
      newProduct,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Products from Seller
const getAllSellerProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const products = await Product.get({ userId: userId });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete Product //tambahin isSeller/auth
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.get({ id: productId });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await Product.delete(product.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Products  //tambahin kalau belum di acc sama admin gakeliatan(atau ada tanda unpublished)
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.getAll();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// All Product --- For Admin // tambahin isAdmin & isAuth
const adminGetAll = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.adminGetAll();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createProduct,
  getAllSellerProducts,
  deleteProduct,
  getAllProducts,
  adminGetAll,
};
