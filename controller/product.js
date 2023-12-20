const ErrorHandler = require("../utils/ErrorHandler");
const isAuthenticated = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/Product");
const User = require("../models/User");

// Create Product // butuh input Array dari frontend untuk gallery
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
    const products = await Product.getUserId(userId);

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

// All Product --- For Admin
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

// Publish Product --- For Admin
const publishProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.get({ id: productId });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    if (product.isPublish == true) {
      const ban = false;
      await Product.publish(product.id, ban);

      res.status(200).json({
        success: true,
        message: "Product is waiting for approval",
      });
    } else {
      const publish = true;
      await Product.publish(product.id, publish);

      res.status(200).json({
        success: true,
        message: "Product published successfully",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Promote Product --- For Admin
const promoteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.get({ id: productId });
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const promotedProduct = await Product.promote(product.id);

    res.status(200).json({
      success: true,
      message: "Product promoted successfully for a week!",
      promotedProduct,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete Image
const deleteImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.id);
    const image = await Product.getImage({ id: imageId });
    if (!image) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await Product.deleteImage(image.id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get Promoted Products
const getPromotedProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.getPromote();

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
  publishProduct,
  promoteProduct,
  deleteImage,
  getPromotedProducts,
};
