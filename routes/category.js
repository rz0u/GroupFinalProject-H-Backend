const { Router } = require("express");
const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controller/category");
// const { authenticateUser } = require("../middleware/error");

// Assuming the authenticateUser middleware extracts user information and attaches it to req.user

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.put("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
