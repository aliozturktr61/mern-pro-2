const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config(); 
const register = async (req, res) => {
  const avatar = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 130,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(500)
      .json({ message: "Böyle bir kullanıcı zaten var !!!!" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res
      .status(500)
      .json({ message: "Şifre 6 karakterden küçük olamaz !!!" });
  }

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  });

  const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(201).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(500)
      .json({ message: "Böyle bir kullanıcı bulunamadı !!!" });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(500).json({ message: "Yanlış şifre girdiniz" });
  }

  const token = await jwt.sign({ id: user._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };

  res.status(200).cookie("token", null, cookieOptions).json({
    message: "Çıkış işlemi başarılı",
  });
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(500)
      .json({ message: "Böyle bir kullanıcı bulunamadı !!!!" });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const passwordUrl = `${req.protocol}://localhost:3000/reset/${resetToken}`;

  const message = `Şifreni Sifirlamak için kullanacağın token : ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yazıcam@gmail.com",
        pass: "zreoxfwrnwdsielo",
      },
    });

    const mailData = {
      from: "yazıcam@gmail.com", // Gönderen adres
      to: req.body.email, // Alıcı adres
      subject: "Şifre Sıfırlama",
      text: message, // E-posta içeriği
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
        // Hata durumunda işlemleri burada gerçekleştir
      } else {
        console.log("Email sent: " + info.response);
        // Başarılı durumda işlemleri burada gerçekleştir
      }
    });

    res.status(200).json({ message: "Mailinizi kontrol ediniz" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ message: error.message });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Ortam değişkeninden Gmail kullanıcı adı
      pass: process.env.GMAIL_PASS, // Ortam değişkeninden Gmail uygulama şifresi
    },
  });

  const mailData = {
    from: process.env.GMAIL_USER, // Gönderen adres (genellikle auth'daki kullanıcı)
    to: req.body.email, // Alıcı adres
    subject: "Şifre Sıfırlama",
    text: message, // E-posta içeriği
  };

  // E-posta gönderimi
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log("E-posta gönderimi başarısız:", error);
    } else {
      console.log("E-posta başarıyla gönderildi:", info.response);
    }
  });
};

const resetPassword = async (req, res) => {
  // Şifre sıfırlama işlemleri burada gerçekleştirilecek
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(500).json({ message: "Gecersiz Token !!!" });
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  const token = jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const userDetail = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
};
