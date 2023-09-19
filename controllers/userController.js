const User = require('../models/user');


const register_get = (req, res) => {
    console.log("Register");
    res.render('user/register', {title: 'Registration'});
};




module.exports = {
    register_get
};