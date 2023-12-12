const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Test!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
