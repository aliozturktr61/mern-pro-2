const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb+srv://aliozturktr61:ahzs1357@cluster0.egtld.mongodb.net/mern2")
    .then(() => {
      console.log("MongoDB başarılı bir şekilde bağlandı");
    })
    .catch((err) => {
      console.error("MongoDB bağlantı hatası:", err);
    });
};

module.exports = db;
 