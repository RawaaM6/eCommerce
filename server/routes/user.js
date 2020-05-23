const express = require("express");
const route = express.Router();
const {sayHi} = require('../controllers/user')

route.get("/", sayHi);

module.exports = route;