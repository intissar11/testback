const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cartitems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        price: { type: Number, required: true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    updatedon: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cartuser", CartSchema);
