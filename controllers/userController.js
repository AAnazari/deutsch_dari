const userM = require('../models/user');


const profile_get = (req, res) => {
    res.render('users/profile', {title: 'User Profile'});
};


const register_get = (req, res) => {
    res.render('users/register', {title: 'Registration'});
};

const register_post = async (req, res) => {
    try {
        const user = new userM.User(req.body);        
        await user.save();
        res.redirect('/users/login');
    } catch (error) {
        console.log("Error: " + error);
    }
};

const login_get = (req, res) => {
    res.render('users/login', {title: 'Login'});
};

const login_post = async (req,res) => {
    try {
        const email = req.body.email;
        const user = await userM.User.findOne({email: email});
        if (user && user.password === req.body.password) {
            console.log("Loging was successfully");
            res.redirect("/");
        }else{
            console.log("Login failed");
            res.redirect("/users/login");
        }
    } catch (error) {
        console.log("Error: " + error);
    }

}

module.exports = {
    profile_get,
    register_get,
    register_post,
    login_get,
    login_post
};