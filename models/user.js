const mongoose = require('mongoose');
const lessons= require('./lesson');

//////////////////////////////// Creating of User Schema //////////////////////////////////

const userSchema = new mongoose.Schema({
    name: {
        username: { type: String, required: true},
        lastName: { type: String, required: true},
        firstName: { type: String, required: true}
    },
    password: { type: String, required: true},
    email: { type: String, required: true},
    admin:{ type: Boolean, default: false},
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: lessons.Lesson}
}, { timestamps: true }); // Second argument, automatically generates timestamps for the users when created or updated.

//////////////////////////////// Creating and exporting of User Model //////////////////////////////////

module.exports.User = mongoose.model('users', userSchema);