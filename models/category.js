const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Category {
  static async create({ name }) {
      return await prisma.category.create({ data: { name }, });
    } 

  static async get(fieldValuePair, options) {
      return await prisma.category.findUnique({ where: fieldValuePair, ...options });
    } 

  static async update(id, updatedFields) {
      return await prisma.category.update({ where: { id }, data: updatedFields, });
    } 

  static async delete(id) {
      return await prisma.category.delete({ where: { id }, });
    } 
}

module.exports = Category;
