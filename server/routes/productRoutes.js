const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  refreshProduct,
} = require(
  "../controllers/productController"
);
router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put(
  "/:id",
  updateProduct
);
router.post("/:id/refresh", refreshProduct);

module.exports = router;