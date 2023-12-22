const handleUpload = (req, res) => {
  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
};

const showImage = (req, res) => {
  filePath = req.params.id;
};

module.exports = { handleUpload, showImage };
