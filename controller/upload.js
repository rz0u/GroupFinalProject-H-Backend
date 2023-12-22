const path = require("path");
const fs = require("fs");

const handleUpload = (req, res) => {
  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
};

// const showImage = (req, res) => {
//   const imageName = req.params.id;
//   // let filePath =
//   //   req.protocol + "://" + req.get("host") + "/uploads/" + imageName;
//   const filePath = path.join(__dirname, "../uploads/", imageName);
//   // Check if the file exists
//   console.log(`${filePath}`);
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       // File does not exist
//       return res
//         .status(404)
//         .json({ status: "error", message: "Image not found" });
//     }

//     // File exists, read and send the file as a response
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
//   });
// };

module.exports = { handleUpload /*showImage*/ };
