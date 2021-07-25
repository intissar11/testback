const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  productId: { type: String, required: true },

  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Product", ProductsSchema);
