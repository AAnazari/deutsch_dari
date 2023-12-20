const userM = require('../models/user');
const { reg_validator, updatePassValidator } = require('../middlewares/functions');
const passport = require('passport');
require('../utils/auth');


///////////////////////////////////// Showing the User Profile to the specified User get controller //////////////////////////////////
const profile_get = (req, res) => {
    res.render('users/profile', {title: 'User Profile'});
};

///////////////////////////////////// Edit User Profile get controller //////////////////////////////////
const editProfile_get = (req, res) => {
    res.render('users/setting/account', {title: 'Edit Profile'});
};

///////////////////////////////////// Edit User Profile Post controller //////////////////////////////////
const editProfile_post = async (req, res) => {
    try {
        //////////////////////////////// Checking for existing Email Address //////////////////////////////////
        await userM.User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: false });
        req.flash('success', 'Profile updated successfully');
        res.redirect('/users/profile');
    } catch (error) {
        req.flash('error', error.message);
    }
};

///////////////////////////////////// Reset Password get controller //////////////////////////////////
const updatePassGet = (req, res) => {
    res.render('users/setting/reset', {title: 'Change Password'});
};

///////////////////////////////////// Reset Password Post controller //////////////////////////////////
const updatePassPost = async (req, res) => {
    try {
        const {error, value} = updatePassValidator(req.body);
        const currentUser = await userM.User.findOne({email: req.user.email});
        if(!error) {
            const isMatch = await currentUser.isValidPassword(value.oldPassword);
            if(isMatch){
                currentUser.password = value.password;
                await currentUser.save();
                req.flash('success', 'Password is changed successfully');
                res.redirect('/users/profile');
            }else{
                req.flash('errer', "Invalid old password");
                res.redirect('/users/setting/reset');
            } 
        }else{
            req.flash('error', error.message);
            res.redirect('/users/setting/reset');
        }
    } catch (error) {
        req.flash('error', error.message);
    }
    
};

///////////////////////////////////// User Register get controller //////////////////////////////////
const register_get = (req, res) => {
    res.render('users/register', {title: 'Registration'});
};

///////////////////////////////////// User Register Post controller //////////////////////////////////
const register_post = async (req, res) => {
    try {
        //////////////////////////////// Checking for existing Email Address //////////////////////////////////
        const oldUser = await userM.User.findOne({email: req.body.email});
        if(oldUser) {
            req.flash('error', 'User already exists');
            res.redirect('/users/login');
        }

        //////////////////////////////// Form Validation using JOI //////////////////////////////////
        const {error, value} = reg_validator(req.body);
        if(!error){
            //////////////////////////////// If there is no Error, Register the User //////////////////////////////////
            const user = new userM.User(value);        
            await user.save();
            res.redirect('/users/login');
        }else{
            req.flash('error', error.message);
            res.redirect('/users/register');
        }
    } catch (error) {
        req.flash('error', error.message);
    }
};

///////////////////////////////////// User Login get controller //////////////////////////////////
const login_get = (req, res) => {
    res.render('users/login', {title: 'Login'});
};

///////////////////////////////////// User Login Post controller //////////////////////////////////
const login_post = (req,res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
      req.flash('error', 'Email and password are required');
      res.render("users/login", {
        email,
        password,
      });
    } else {
      passport.authenticate("local", {
        successReturnToOrRedirect: "/", 
        successFlash: true,
        failureRedirect: "/users/login",
        failureFlash: true,
      })(req, res);
    }
/*/////////////////////// Befor the Passport Local Strategy //////////////////////////
    try {
        //////////////////////////////// Checking if the User exists in the System //////////////////////////////////
        const email = req.body.email;
        const user = await userM.User.findOne({email: email});
        if (user){
            //////////////////////////////// Compare the Password entered by User and Password in the database //////////////////////////////////
            if(await bcrypt.compare(req.body.password, user.password)){
                req.flash('success', 'Loging was successfully');
                res.redirect("/");
            }else{
                req.flash('pass_failed',"The Password is not correct");
                res.redirect("/users/login");
            }
        }else{
            req.flash('email_failed',"The '"+ req.body.email + "' is not registered as an EMail address");
            res.redirect("/users/login");
        }
    } catch (error) {
        req.flash('error', error.message);
    }
/////////////////////////*/
};

///////////////////////////////////// User Logout controller //////////////////////////////////
const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            req.flash('error', err.message);
            return next(err); 
        }
        req.flash('success', 'You have been logged out successfully');
        res.redirect('/users/login');
      });
};

///////////////////////////////////// User Managing get controller //////////////////////////////////
const usersGet = async (req, res) => {
    try {
        const users = await userM.User.find();
        res.render('users/manageUser', {title: 'Managing Users', users: users});
        console.log(users);
    } catch (error) {
        req.flash('error', error.message);
    }

}

module.exports = {
    profile_get,
    editProfile_get,
    editProfile_post,
    updatePassGet,
    updatePassPost,
    register_get,
    register_post,
    login_get,
    login_post,
    logout,
    usersGet
};