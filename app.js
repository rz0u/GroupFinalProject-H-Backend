const express = require("express");
const dotenv = require("dotenv");
const applyMiddleware = require("./middleware");
const apiRouter = require("./routes");
const cron = require("node-cron");
const { ENABLE_CRON, INTERVAL_INQUIRY } = require("./config/config");
const { checkOrder } = require("./controller/order");

dotenv.config();
const app = express();

applyMiddleware(app);

const port = process.env.PORT;

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello, Test!");
});

if (ENABLE_CRON == "true") {
  cron.schedule(INTERVAL_INQUIRY, () => {
    checkOrder();
  });
}

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
