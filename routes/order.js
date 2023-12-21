const { Router } = require("express");
const orderRouter = Router();

const {
  lastDayTransaction,
  postOrder,
  notifyTransaction,
  allTransaction,
} = require("../controller/order");

orderRouter.get("", allTransaction);
orderRouter.get("/lastday", lastDayTransaction);
orderRouter.post("/buy", postOrder);
orderRouter.post("/notifications", notifyTransaction); //no auth khusus untuk menerima notification payment dr midtrans

module.exports = orderRouter;
