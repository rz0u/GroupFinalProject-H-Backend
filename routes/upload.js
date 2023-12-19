const { Router } = require("express");
const { handleUpload } = require("../controller/upload");
const { upload } = require("../utils/multer");
const uploadRouter = Router();

uploadRouter.post("/", upload.single("photo"), handleUpload);

module.exports = uploadRouter;
