const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const uploadRouter = require("./routes/upload");
const Cors = require("cors");
const eventRouter = require("./routes/eventRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(Cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/upload", uploadRouter);

app.get("/", (req, res) => {
  res.send("Hello, Test!");
});

app.post("/api/upload", upload.single("photo"),(req,res)=> {
  // membuat url gambar
  // save ke db
  let finalImageURL = 
    req.protocol + "://" +  req.get("host") + "/uploads/" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
