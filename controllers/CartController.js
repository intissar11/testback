const Cartuser = require("../models/UserCart");
const getUserCart = async (req, res) => {
  try {
    let cart = await Cartuser.findOne({ userId: req.User._id });
    return res.status(201).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: `server error, ${error}` }] });
  }
};

const addItem = async (req, res) => {
  await Cartuser.findOne({ user: req.user._id }, (err, cart) => {
    if (err) return res.status(400).json({ err });

    if (cart) {
      const product = req.body.cartItems.product;
      const isItemAdded = cart.cartItems?.find((c) => c.product == product);

      if (isItemAdded) {
        Cartuser.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$.quantity":
                isItemAdded.quantity + req.body.cartItems.quantity,
              "cartItems.$.price": isItemAdded.price + req.body.cartItems.price,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      } else {
        Cartuser.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      }
    } else {
      const cart = new Cartuser({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      try {
        cart.save((err, result) => {
          if (err) return res.status(400).json({ err });

          res.status(201).json({ result });
        });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  });
};

const deleteCart = async (req, res) => {
  try {
    await Cartuser.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ message: "user cart deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteItem = async (req, res) => {
  await Cartuser.findOne({ user: req.user._id }, (err, cart) => {
    if (err) return res.status(400).json({ err });

    if (!cart) {
      res.status(400).json({ error: "can't find your cart" });
    } else {
      const product = req.body.cartItems.product;
      const isItemAdded = cart.cartItems?.find((c) => c.product == product);

      if (isItemAdded && isItemAdded?.quantity === 1) {
        Cartuser.updateOne(
          {
            user: req.user._id,
            "cartItems.product": product,
          },
          {
            $pull: {
              cartItems: { product: product },
            },
          },
          { safe: true, multi: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ message: "product deleted" });
        });
      } else {
        Cartuser.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": product,
          },
          {
            $set: {
              "cartItems.$.quantity":
                isItemAdded?.quantity - req.body.cartItems.quantity,
              "cartItems.$.price":
                isItemAdded?.price - req.body.cartItems.price,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) return res.status(400).json({ error });
          res.status(200).json({ cart });
        });
      }
    }
  });
};
module.exports = { getUserCart, addItem, deleteItem, deleteCart }