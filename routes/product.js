const { Router } = require("express");
const {
  getAllSellerProducts,
  deleteProduct,
  getAllProducts,
  adminGetAll,
  createProduct,
  publishProduct,
  deleteImage,
  promoteProduct,
  getPromotedProducts,
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
productRouter.put(
  "/publish-product/:id",
  isAuthenticated,
  isAdmin("admin"),
  publishProduct
);
productRouter.put(
  "/promote-product/:id",
  isAuthenticated,
  isAdmin("admin"),
  promoteProduct
);
productRouter.delete("/delete-image/:id", isAuthenticated, deleteImage);
productRouter.get("/get-promoted-products", getPromotedProducts);

module.exports = productRouter;
