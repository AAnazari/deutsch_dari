const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

///////////////////////////////////// Profile get route //////////////////////////////////
userRoute.get('/', userController.profile_get);

///////////////////////////////////// Register get and post routes //////////////////////////////////
userRoute.get('/register', userController.register_get);
userRoute.post('/register', userController.register_post);


///////////////////////////////////// Login get and post routes //////////////////////////////////
userRoute.get('/login', userController.login_get);
userRoute.post('/login', userController.login_post);

///////////////////////////////////// Logout get and post routes //////////////////////////////////
userRoute.get('/logout', userController.logout);

module.exports = userRoute;