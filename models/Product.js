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
    await prisma.gallery.deleteMany({ where: { productId: id } });
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
  // update publish
  static async publish(id, isPublish) {
    return await prisma.product.update({
      where: { id: id },
      data: {
        isPublish: isPublish,
      },
    });
  }
  // add promotion date
  static async promote(productId) {
    const promotionWeek = new Date();
    promotionWeek.setDate(promotionWeek.getDate() + 7);
    return await prisma.product.update({
      where: { id: productId },
      data: {
        promotionDate: promotionWeek,
      },
    });
  }
  // get image from gallery
  static async getImage(id) {
    return await prisma.gallery.findUnique({ where: { id: id } });
  }
  // delete image from gallery
  static async deleteImage(id) {
    return await prisma.gallery.delete({ where: { id: id } });
  }
  // get promoted products
  static async getPromote(options) {
    const currentDate = new Date();

    const defaultOptions = {
      where: {
        isPublish: true,
        promotionDate: {
          gt: currentDate,
        },
      },
      ...options,
    };
    return await prisma.product.findMany(defaultOptions);
  }
}

module.exports = Product;
