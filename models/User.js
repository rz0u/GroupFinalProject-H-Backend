const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class User {
  static async register({ username, email, password, avatar }) {
    return await prisma.user.create({
      data: {
        username,
        email,
        password: this.make_password(password),
        avatar,
      },
    });
  }
  static async get(fieldValuePair, options) {
    return await prisma.user.findUnique({ where: fieldValuePair, ...options });
  }
  static async update(userId, data) {
    return await prisma.user.update({ where: { id: userId }, data });
  }
  static async delete(userId) {
    return await prisma.user.delete({ where: { id: userId } });
  }
  static async make_password(password) {
    return await bcrypt.hash(password, 10);
  }
  static async compare_password(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
