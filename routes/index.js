const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const eventRouter = require("./event");
const uploadRouter = require("./upload");
const orderRouter = require("./order");

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/event", eventRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/order", orderRouter);

module.exports = apiRouter;
