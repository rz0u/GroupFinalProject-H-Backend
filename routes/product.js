const { Router } = require("express");
const {
  getAllSellerProducts,
  deleteProduct,
  getAllProducts,
  adminGetAll,
  createProduct,
} = require("../controller/product");
const productRouter = Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");

productRouter.post("/create-product", isAuthenticated, createProduct);
productRouter.get("/get-all-products-shop/:id", getAllSellerProducts);
productRouter.get("/get-all-products", getAllProducts);
productRouter.delete(
  "/delete-shop-product/:id",
  isAuthenticated,
  deleteProduct
);
productRouter.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("admin"),
  adminGetAll
);

module.exports = productRouter;
