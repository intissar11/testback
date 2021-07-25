const Product = require("../models/Products");
const insertproduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      rate: req.body.rate,
    });
    const Newproduct = await product.save();
    res.status(201).json({ Newproduct });
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports = insertproduct
