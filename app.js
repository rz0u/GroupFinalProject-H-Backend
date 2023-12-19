const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routes/user");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, Test!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
