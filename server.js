const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
app.use(express.json());
app.use('/auth', require('./routes/RegisterRouter'));
app.use('/cart', require('./routes/CartRouter'));
app.use('/product', require('./routes/ProductRouter'));
app.use('/order', require('./routes/OrderRouter'));

require("dotenv").config({path:'./config/.env',
  });
  connectDB();


const PORT=process.env.PORT||5000;
app.listen(PORT,(err)=> err? console.error(err):console.log(`Server is runnig on PORT ${PORT}`));