const Order = require("../models/Order");
const Cartuser = require("../models/UserCart");

const Createorder = async (req, res) => {
  try {
    const ordercart = await Cartuser.findOne({ userId: req.User._id });
    if (!ordercart) return res.status(201).json({ error: "no order found" });

    const order = new Order({
      customer: req.User._id,
      cart: req.cartitems,
      amount: req.body.amount,
      deliveryprice: req.body.deliveryPrice,
      shippingAddress: req.body.shippingAddress,
      date_added: req.body.date_added,
      isDelivered: req.body.isDelivered,
    });

    const newOrder = await order.save();
    res.status(201).json({ newOrder });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getOneOrder = async (req, res) => {
  const _id = req.params.id;

  try {
    await Order.findOne({ _id: _id }, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const getAllorder = async (req, res) => {
  const _id = req.params.id;

  try {
    await Order.find({}, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order: order.length });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const getUserorder = async (req, res) => {
  try {
    await Order.find({ user: req.user._id }, (err, order) => {
      if (err) return res.status(400).json({ err });

      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
const updateOrderstatus = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const order = await Order.findOne({ _id: _id });

    if (!order) {
      res.status(400).json({ error: "order not found" });
    } else {
      order.orderStatus = req.body.orderStatus;

      const updateOrder = await order.save();

      res.status(200).json({ updateOrder });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const orderToDelivered = async (req, res) => {
  const _id = req.params.id;

  try {
    const order = await Order.findOne({ _id: _id });

    if (!order) {
      res.status(400).json({ error: "order not found" });
    } else {
      order.isDelivered = req.body.isDelivered;
      order.date_added = Date.now();

      const updateOrder = await order.save();

      res.status(200).json({ updateOrder });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports = {
  Createorder,
  getOneOrder,
  getAllorder,
  getUserorder,
  updateOrderstatus,
  orderToDelivered,
};
