const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class Product {
  // create
  static async create({
    title,
    description,
    img,
    categoryId,
    price,
    gallery,
    userId,
  }) {
    return await prisma.product.create({
      data: {
        title,
        description,
        img,
        categoryId,
        price,
        gallery,
        userId,
      },
    });
  }
  // get
  static async get(fieldValuePair, options) {
    return await prisma.product.findUnique({
      where: fieldValuePair,
      ...options,
    });
  }
  // get all
  static async getAll(options) {
    const defaultOptions = {
      where: {
        isPublish: true,
      },
      orderBy: {
        _orderBy: () => "random()",
      },
      ...options,
    };
    return await prisma.product.findMany(defaultOptions);
  }
  // get all admin
  static async adminGetAll(options) {
    return await prisma.product.findMany(options);
  }
  // delete
  static async delete(id) {
    return await prisma.product.delete({ where: { id: id } });
  }
  // getUserId
  static async getUserId(id) {
    return await prisma.product.findMany({
      where: { userId: id },
      include: {
        gallery: true,
      },
    });
  }
}

module.exports = Product;
