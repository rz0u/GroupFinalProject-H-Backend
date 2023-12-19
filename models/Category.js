const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Category {
  static async create({ name }) {
    return await prisma.category.create({ data: { name } });
  }

  static async get(fieldValuePair, options) {
    return await prisma.category.findUnique({
      where: fieldValuePair,
      ...options,
    });
  }
  static async getAll(options) {
    const defaultOptions = {
      where: {
        isPublish: true,
      },
      orderBy: {
        random: true,
      },
      ...options,
    };

    return await prisma.category.findMany(defaultOptions);
  }
  static async update(id, updatedFields) {
    return await prisma.category.update({ where: { id }, data: updatedFields });
  }

  static async delete(id) {
    return await prisma.category.delete({ where: { id } });
  }
}

module.exports = Category;
