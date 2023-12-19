const { Router } = require("express");
const categoryRouter = Router();
const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getCategoryId,
} = require("../controller/categoryController");

categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryId);
categoryRouter.get("/", getAllCategory);
categoryRouter.put("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;