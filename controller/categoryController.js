const Category = require("../models/category");

exports.createCategory = async (req, res) => {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }
    const { id, name } = req.body;
    const category = await Category.create({ id, name });
  
    res.status(201).json(category);
  };

exports.getCategory = async (req, res) => {
  let query = {};
//   if (req.user.role === "admin" || req.user.role === "seller") 
  // {
  //   query = { id: req.category.id };
  // }
  const category = await Category.get(query);
  res.status(200).json(category);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedFields = { name };
  const category = await Category.get({ id });
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Unauthorized" });
//   }
  const updatedCategory = await Category.update(id, updatedFields);
  res.status(200).json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.get({ id });
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Unauthorized" });
//   }
  await Category.delete(id);
  res.status(204).end();
};