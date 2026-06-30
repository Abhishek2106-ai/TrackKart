const express = require("express");

const router = express.Router();

const {
  extractProduct
} = require("../controllers/extractController");

router.post("/", extractProduct);

module.exports = router;