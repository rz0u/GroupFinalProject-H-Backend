const Product = require("../models/Product");
const path = require("path");
const router = require("express").Router();
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const upload = require("../utils/multer");
const isAuthenticated = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");

// Create Product //belum euy lieur
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.body.userId;

      const shopName = await User.get({ id: userId });
      if (!shopName) {
        return next(new ErrorHandler("User not found", 404));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);
        const productData = req.body;
        productData.images = imageUrls;
        productData.userId = userId;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All Products //user model belum
router.get(
  "/get-all-products/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.get({ userId: req.params.id });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Product //user model belum
router.delete(
  "/delete-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.get({ id: req.params.id });

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
  })
);

// Get All Products //user model belum //tambahin kalau belum di acc sama admin gakeliatan(atau ada tanda unpublished)
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.getAll();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// All Product --- For Admin // tambahin is flagged atau is published
router.get(
  "/all-products-admin",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.getAll();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
