const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

///////////////////////////////////// Register get and post routes //////////////////////////////////
userRoute.get('/register', userController.register_get);

///////////////////////////////////// Login get and post routes //////////////////////////////////
userRoute.get('/login', userController.login_get);


module.exports = userRoute;