const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

///////////////////////////////////// Register get and post routes //////////////////////////////////
userRoute.get('/register', userController.register_get);
userRoute.post('/register', userController.register_post);


///////////////////////////////////// Login get and post routes //////////////////////////////////
userRoute.get('/login', userController.login_get);
userRoute.post('/login', userController.login_post);


module.exports = userRoute;