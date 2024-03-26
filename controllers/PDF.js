const PDFController = require("express").Router();
const PDF = require("../model/PDF");
const multer = require("multer");

const authentication = require("../middleware/authetication");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

PDFController.get(
  "/get",
  authentication,
  upload.single("file"),
  async (req, res) => {
    try {
      const data = await PDF.find({ created: req.val });
      res.send(data);
    } catch (error) {
      res.json({ message: "could't not get data" });
    }
  }
);

PDFController.get("/get/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await PDF.findById({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ message: "could't not get data" });
  }
});

PDFController.post(
  "/create",
  authentication,
  upload.single("file"),
  async (req, res) => {
    const name = req.body.name;
    const file = req.body.files;
    try {
      const data = await PDF.create({ name, file, created: req.val });
      res.json(data);
    } catch (error) {
      res.json({ message: "could't not post pdf data" });
    }
  }
);

PDFController.delete("/delete/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await PDF.findByIdAndDelete({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ message: "could't not delete pdf data" });
  }
});

module.exports = PDFController;
