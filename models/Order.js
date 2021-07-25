const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "cartuser",
    },

    amount: {
      type: Number,
      required: true,
    },
    deliveryprice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: "object",
      required: true,
    },

    date_added: {
      type: Date,
    },
    orderStatus: {
      type: String,
      default: "processing",
      enum: ["processing", "accepted", "dispatched", "cancelled"],
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
