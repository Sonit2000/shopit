const express = require('express');
const app = express();
const cors = require('cors')
//setting cors
app.use(cors())

app.use(express.json());
//Import all routes
const products = require('./routes/product')
app.use("/api/v1",products);
module.exports=app