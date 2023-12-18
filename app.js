const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
// const router = require("./routes");
const categoryRoutes = require("./routes/categoryRoutes");


dotenv.config();
const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
})

const upload = multer({storage});

app.use(express.json());
// app.use(router);
app.use("/api/v1/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.send("Hello, Test!");
});

app.post("/api/upload", upload.single("photo"),(req,res)=> {
  // membuat url gambar
  // save ke db
  let finalImageURL = 
    req.protocol + "://" +  req.get("host") + "/uploads" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
