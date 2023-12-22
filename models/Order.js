const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Order {
  // -------- Create new Order -------- //
  static async create({ billCode, userId, productId, amount, snapUrl, token }) {
    return await prisma.order.create({
      data: {
        userId,
        productId,
        amount,
        snapUrl,
        token,
        billCode,
        transactionDate: new Date(),
      },
    });
  }

  // -------- Check Order daily -------- //
  static async checkTransactionPerDay(order_id) {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); //checking last 24 hours transaction with assumsion each transaction have a expire 24 hour from time post transaction
    let filter = {
      transactionDate: {
        gte: twentyFourHoursAgo, //greater than equals
      },
      paymentStatus: {
        not: {
          equals: "settlement",
        },
      },
    };
    //check if specific order_id
    if (typeof order_id !== "undefined") {
      // kalau order_id ada
      filter = {
        createdAt: {
          gte: twentyFourHoursAgo,
        },
        paymentStatus: {
          not: {
            equals: "settlement",
          },
        },
        billCode: order_id,
      };
    }
    return await prisma.order.findMany({
      where: filter,
    });
  }

  // -------- Update Transaction Status -------- //
  static async updateStatusTransaction(id, status) {
    return await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        paymentStatus: status,
      },
    });
  }

  // -------- Get All Transaction  -------- //
  static async allTransaction(limit, page) {
    const skip = (page - 1) * limit;
    const data = await prisma.order.findMany({
      take: parseInt(limit),
      skip: skip,
    });

    const resultCount = await prisma.order.count();

    const totalPage = Math.ceil(resultCount / limit);

    return {
      data: data,
      current_page: page - 0,
      total_page: totalPage,
      total_data: resultCount,
    };
  }

  // -------- Get Product ID -------- //
  static async getProductId(id) {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }
}

module.exports = Order;

// model Order {
//     id              Int      @id @default(autoincrement())
//     userId          Int
//     user            User     @relation(fields: [userId], references: [id])
//     productId       Int
//     product         Product  @relation(fields: [productId], references: [id])
//     eventId         Int
//     event           Event    @relation(fields: [eventId], references: [id])
//     transactionDate DateTime
//     amount          Int
//     paymentStatus   String   @default("")
//     token           String   @default("")
//     snapUrl         String   @default("")
//     billCode        String
//   }
