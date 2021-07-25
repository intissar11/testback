const express = require('express');
const { addItem, getUserCart, deleteItem, deleteCart } = require('../controllers/CartController');

const isAuth = require("../middlewares/auth");
const router = express.Router();

router.post("/cart", isAuth, addItem);
router.get("/cart", isAuth, getUserCart);
router.delete("/:productId", isAuth, deleteItem);
router.delete("/cart", isAuth, deleteCart);

module.exports = router;
