const express = require("express");
const {
  Createorder,
  getOneOrder,
  getAllorder,
  getUserorder,
  orderToDelivered,
  updateOrderstatus,
} = require("../controllers/OrderController");
const isAuth = require("../middlewares/auth");
const router = express.Router();

router.post("/create_order", isAuth, Createorder);
router.get("/single_order/:id", isAuth, getOneOrder);
router.get("/all_order", isAuth, getAllorder);
router.get("/user_order", isAuth, getUserorder);
router.post("/update_order_delivered/:id", isAuth, orderToDelivered);
router.post("/update_order_status/:id", isAuth, updateOrderstatus);

module.exports = router;
