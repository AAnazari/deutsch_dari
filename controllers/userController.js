const User = require('../models/user');


const register_get = (req, res) => {
    console.log("Register");
    res.render('user/register', {title: 'Registration'});
};

const login_get = (req, res) => {
    console.log("Login");
    res.render('user/login', {title: 'Login'});
};



module.exports = {
    register_get,
    login_get
};