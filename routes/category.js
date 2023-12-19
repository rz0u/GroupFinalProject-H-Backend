const { Router } = require("express");
const categoryRouter = Router();
const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getCategoryId,
} = require("../controller/category");

categoryRouter.post("/", createCategory); //works
categoryRouter.get("/:id", getCategoryId); //works
categoryRouter.get("/", getAllCategory); //
categoryRouter.put("/:id", editCategory); //works
categoryRouter.delete("/:id", deleteCategory); //works

module.exports = categoryRouter;
