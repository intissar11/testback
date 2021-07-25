const express = require("express");
const insertproduct = require("../controllers/ProductController");
const router = express.Router();

router.post('/product',insertproduct);
module.exports = router