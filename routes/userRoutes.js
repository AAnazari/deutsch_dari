const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();
const {ensureAuthenticated, ensureNotAuthenticated} = require('../middlewares/functions');

///////////////////////////////////// Profile get route //////////////////////////////////
userRoute.get('/', userController.profile_get);

///////////////////////////////////// Register get and post routes //////////////////////////////////
userRoute.get('/register',ensureNotAuthenticated, userController.register_get);
userRoute.post('/register', userController.register_post);


///////////////////////////////////// Login get and post routes //////////////////////////////////
userRoute.get('/login', ensureNotAuthenticated, userController.login_get);
userRoute.post('/login', userController.login_post);

///////////////////////////////////// Logout get and post routes //////////////////////////////////
userRoute.get('/logout', ensureAuthenticated, userController.logout);

module.exports = userRoute;