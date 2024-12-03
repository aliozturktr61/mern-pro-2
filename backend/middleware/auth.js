const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authMid = async (req, res, next) => {
  try {
    // `req.cookies` null veya undefined olabilir, bu yüzden güvenli bir şekilde erişiyoruz
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Erişim için lütfen login olunuz" });
    }

    // Token doğrulama işlemi
    let decodedData;
    try {
      decodedData = jwt.verify(token, "SECRETTOKEN");
    } catch (err) {
      return res.status(401).json({ message: "Erişim tokeniniz geçersizdir!" });
    }

    // Kullanıcıyı bulma
    const user = await User.findById(decodedData.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }

    req.user = user; // Doğrulanmış kullanıcıyı `req.user` içine ekle
    next(); // Bir sonraki middleware'e geç
  } catch (error) {
    console.error("Auth Middleware Hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Önce giriş yapmalısınız!" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Bu işlemi yapmak için gerekli izniniz bulunmamaktadır!",
        });
      }
      next();
    } catch (error) {
      console.error("Role Check Middleware Hatası:", error.message);
      res.status(500).json({ message: "Sunucu hatası!" });
    }
  };
};

module.exports = { authMid, roleChecked };