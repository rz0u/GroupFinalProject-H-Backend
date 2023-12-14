const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class User {
  static async register({ username, email, password }) {
    return await prisma.user.create({
      data: {
        username,
        email,
        password: this.make_password(password),
      },
    });
  }
  static async get(fieldValuePair, options) {
    return await prisma.user.findUnique({ where: fieldValuePair, ...options });
  }
  static async make_password(password) {
    return await bcrypt.hash(password, 10);
  }
}

module.exports = User;
