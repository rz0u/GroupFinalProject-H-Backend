const { Router } = require("express");
const { handleUpload, showImage } = require("../controller/upload");
const { upload } = require("../utils/multer");
const uploadRouter = Router();

uploadRouter.post("/", upload.single("photo"), handleUpload);
// uploadRouter.get("/:id", showImage);

module.exports = uploadRouter;
