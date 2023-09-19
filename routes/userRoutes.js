const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get('/register', userController.register_get);


module.exports = userRoute;