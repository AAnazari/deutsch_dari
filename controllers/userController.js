const userM = require('../models/user');



const register_get = (req, res) => {
    console.log("Register");
    res.render('user/register', {title: 'Registration'});
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
    console.log("Login");
    res.render('user/login', {title: 'Login'});
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
    register_get,
    register_post,
    login_get,
    login_post
};