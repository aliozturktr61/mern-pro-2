const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/db.js");
const product = require("./routes/product.js");
const user = require("./routes/user.js");
const cloudinary = require("cloudinary");

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, 
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", product);
app.use("/", user);

db();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Sunucu 4000 portunda çalışıyor");
});
