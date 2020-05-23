const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./routes/user');
import { v1 as uuidv1 } from 'uuid';
uuidv1()

app.use('/',route)
require('dotenv').config()
dotenv.config()

mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});



app.listen(port, () => console.log(`Example app listening ${port}`));


