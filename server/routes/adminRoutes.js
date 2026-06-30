const express = require("express");
const router = express.Router();

const { requireAdmin } = require("../middleware/adminMiddleware");
const {
  getStats,
  getAllUsers,
  getAllProducts,
  setUserAdmin,
  deleteUser,
  deleteAnyProduct,
} = require("../controllers/adminController");

router.use(requireAdmin);

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);
router.put("/users/:id/role", setUserAdmin);
router.delete("/users/:id", deleteUser);
router.delete("/products/:id", deleteAnyProduct);

module.exports = router;
