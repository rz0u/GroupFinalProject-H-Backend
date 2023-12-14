const categoryController = require("../controller/categoryController");
//const permission = require("../permission");
const { Router } = require("express");
const categoryRouter = Router()


categoryRouter.post(
  "/categories",
//   permission.is_authenticated,
  categoryController.createCategory
);
categoryRouter.get(
  "/categories", 
//   permission.is_authenticated, 
  categoryController.getCategory
);
categoryRouter.patch(
  "/categories/:id",
//   permission.is_authenticated,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/categories/:id",
//   permission.is_authenticated,
  categoryController.deleteCategory
);

module.exports = categoryRouter;