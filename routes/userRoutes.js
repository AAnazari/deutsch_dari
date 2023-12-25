const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();
const {ensureAuthenticated, ensureNotAuthenticated, checkRole} = require('../middlewares/functions');

///////////////////////////////////// Profile get route //////////////////////////////////
userRoute.get('/profile',ensureAuthenticated, userController.profile_get);

///////////////////////////////////// Edit-Profile get & post route //////////////////////////////////
userRoute.get('/setting/account',ensureAuthenticated, userController.editProfile_get);
userRoute.post('/setting/account',ensureAuthenticated, userController.editProfile_post);

///////////////////////////////////// update Password get & post route //////////////////////////////////
userRoute.get('/setting/reset',ensureAuthenticated, userController.updatePassGet);
userRoute.post('/setting/reset',ensureAuthenticated, userController.updatePassPost);

///////////////////////////////////// Register get and post routes //////////////////////////////////
userRoute.get('/register',ensureNotAuthenticated, userController.register_get);
userRoute.post('/register', userController.register_post);


///////////////////////////////////// Login get and post routes //////////////////////////////////
userRoute.get('/login', ensureNotAuthenticated, userController.login_get);
userRoute.post('/login', userController.login_post);

///////////////////////////////////// Logout get and post routes //////////////////////////////////
userRoute.get('/logout', ensureAuthenticated, userController.logout);

///////////////////////////////////// Users Managing get route //////////////////////////////////
userRoute.get('/', ensureAuthenticated, checkRole, userController.usersGet);

///////////////////////////////////// Users Managing (Update Admin) post route //////////////////////////////////
userRoute.post('/setting/update_role', ensureAuthenticated, checkRole, userController.usersPost);

module.exports = userRoute;