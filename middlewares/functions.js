const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require('bcrypt');
require('dotenv').config();


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



////////////////////////  Creating JOI Update Password Schema //////////////////////////
const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string(),
    password: Joi.string()
        .min(8)
        .max(20)
        //.regex(/^[a-zA-Z0-9]{3,30}$/),
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ]
});

const updatePassValidator = (schema) => (payload) => 
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

//////////////////////// function to check user role //////////////

function checkRole(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        req.flash('error', 'You are not allowed to access this page.');
        res.redirect("back");
    }
}
  
//////////////////////// function to change String to number, then increase it by one, and finally change back to string //////////////

function increaseLessonNo(lessonNo) {
    const newLessonNo = Number(lessonNo) + 1;
    return String(newLessonNo);
}
  

module.exports = {
    dbConnect,
    reg_validator: reg_validator(registerSchema),
    updatePassValidator: updatePassValidator(updatePasswordSchema),
    ensureAuthenticated: ensureAuthenticated,
    ensureNotAuthenticated: ensureNotAuthenticated,
    checkRole,
    increaseLessonNo
}