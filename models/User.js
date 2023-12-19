const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class User {
  static async register({
    shopName,
    email,
    password,
    avatar,
    phoneNumber,
    zipcode,
    address,
  }) {
    return await prisma.user.create({
      data: {
        shopName,
        email,
        password: await this.make_password(password),
        avatar,
        phoneNumber,
        zipcode,
        address,
      },
    });
  }
  static async get(fieldValuePair, options) {
    return await prisma.user.findUnique({ where: fieldValuePair, ...options });
  }
  static async update(userId, updatedFields) {
    return await prisma.user.update({
      where: { id: userId },
      data: updatedFields,
    });
  }
  static async delete(userId) {
    return await prisma.user.delete({ where: { id: userId } });
  }
  static async make_password(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  static compare_password(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  static getJwtToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
  static async find({ orderBy = "desc", filterBy = {} }) {
    const users = await prisma.user.findMany({
      where: filterBy,
      orderBy: { createdAt: orderBy },
    });
    return users;
  }
  static createActivationToken(user) {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "1d", // ganti waktunya ketika mau deploy
    });
  }
}

module.exports = User;