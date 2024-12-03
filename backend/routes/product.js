const express = require("express");
const {
  allProducts,
  detailProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product.js");
const { authMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", authMid,roleChecked("admin"),adminProducts);
router.get("/products/:id", detailProducts);
router.post("/product/new", authMid,roleChecked("admin"),createProduct);
router.post("/product/newReview", authMid,createReview);
router.delete("products/:id", authMid,roleChecked("admin"),deleteProduct);
router.put("/products/:id",authMid ,roleChecked("admin"),updateProduct);

module.exports = router;
