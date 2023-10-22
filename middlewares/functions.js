const mongoose = require("mongoose");
const Joi = require("joi");


//////////////////////// Connect to MongoDB //////////////////////////
async function dbConnect(dbURI, dbName){
    try{
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    }catch(error){console.log(error);}
}

////////////////////////  Creating JOI Schema //////////////////////////
const registerSchema = Joi.object({
    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    gender: Joi.string(),
    
    password: Joi.string()
        .min(8)
        .max(20)
        //.regex(/^[a-zA-Z0-9]{3,30}$/),
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

const reg_validator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });


////////////////////////  Protect Routes using Passport JS //////////////////////////
////////////////////////  Routes after login //////////////////////////
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }else{
        res.redirect("/users/login");
    }
}

////////////////////////  Routes before login or after logout /////////
function ensureNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        res.redirect("back");
    }else{
        next();
    }
}




module.exports = {
    dbConnect: dbConnect,
    reg_validator: reg_validator(registerSchema),
    ensureAuthenticated: ensureAuthenticated,
    ensureNotAuthenticated: ensureNotAuthenticated
}