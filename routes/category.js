const { Router } = require("express");
const categoryRouter = Router();
const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getCategoryId,
} = require("../controller/category");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

categoryRouter.post("/", isAuthenticated, isAdmin("admin"), createCategory);
categoryRouter.get("/:id", getCategoryId);
categoryRouter.get("/", getAllCategory);
categoryRouter.put("/:id", isAuthenticated, isAdmin("admin"), editCategory);
categoryRouter.delete(
  "/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteCategory
);

module.exports = categoryRouter;
