const mongoose = require('mongoose');
const lessons= require('./lesson');
const bcrypt = require('bcrypt');
require('dotenv').config();

//////////////////////////////// Creating of User Schema //////////////////////////////////

const userSchema = new mongoose.Schema({
    lastname: { type: String, required: true},
    firstname: { type: String, required: true},
    gender: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    admin:{ type: Boolean, default: false},
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: lessons.Lesson}
}, { timestamps: true }); // Second argument, automatically generates timestamps for the users when created or updated.


//////////////////////////////// User Password Encryption before the User is created //////////////////////////////////
userSchema.pre('save', async function (next){
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(+process.env.SALT);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
          }
          next();      
    } catch (error) {
        next(error);
    }
});

//////////////////////////////// Creating and exporting of User Model //////////////////////////////////
module.exports.User = mongoose.model('users', userSchema);