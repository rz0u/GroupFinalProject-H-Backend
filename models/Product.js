const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class Product {
  // create
  static async create(data) {
    return await prisma.user.create({ data: data });
    // gallery: {
    //   create: [
    //     //contoh buat product
    //     {
    //       img: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     },
    //     {
    //       img: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     },
    //   ],
    // },
  }
  // get
  static async get(fieldValuePair, options) {
    return await prisma.user.findUnique({ where: fieldValuePair, ...options });
  }
  // get all
  static async getAll(options) {
    return await prisma.user.findMany(options);
  }
  // delete
  static async delete(id) {
    return await prisma.user.delete({ where: { id: id } });
  }
}

module.exports = Product;
