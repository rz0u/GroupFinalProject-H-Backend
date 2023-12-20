const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class Event {
  static async create({ name, userId, description, startDate, finishDate, status, price, img, shopId, promotionDate, }) {
    return await prisma.event.create({
        data: {
          name,
          userId,
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
  static async getAll() {
    return await prisma.event.findMany();
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
  // static async sellerDelete(eventId, userId) {
  //   const event = await prisma.event.findUnique({
  //     where: { id: eventId },
  //     select: { userId: true },
  //   });
  
  //   if (!event) {
  //     throw new Error('Event not found');
  //   }
  
  //   // Check if the authenticated user matches the event's userId
  //   if (event.userId !== userId) {
  //     throw new Error('Unauthorized to delete this event');
  //   }
  
  //   return await prisma.event.delete({ where: { id: eventId } });
  // }  
}

module.exports = Event;
