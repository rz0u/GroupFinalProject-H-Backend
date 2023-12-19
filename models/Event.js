const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class Event {
  static async create({ name, description, startDate, finishDate, status, price, img, shopId, promotionDate, }) {
    return await prisma.event.create({
        data: {
          name,
          description,
          startDate,
          finishDate,
          status,
          price,
          img,
          shopId,
          promotionDate,
        },
      });
    } 
  static async get(fieldValuePair, options) {
    return await prisma.event.findUnique({
        where: fieldValuePair, ...options, });
  }
  static async update(eventId, updatedFields) {
    return await prisma.event.update({
        where: { id: eventId },
        data: updatedFields,
      });
    } 
  static async delete(eventId) {
    return await prisma.event.delete({ where: { id: eventId } });
  }
}

module.exports = Event;
