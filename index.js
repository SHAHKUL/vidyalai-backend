require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/user");
const PDFController = require("./controllers/PDF");


app.use(express.json());
app.use(cors());
mongoose.connect(process.env.URL);

app.use("/user", authController);

app.use("/pdf", PDFController);

app.get('/',(req,res)=>{
 res.json({message:"server running successfully"})
})

app.listen(process.env.PORT, () => {
  console.log("server connected");
});
