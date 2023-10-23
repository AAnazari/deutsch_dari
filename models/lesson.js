const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {ensureAuthenticated, ensureNotAuthenticated} = require('../middlewares/functions');

//////////////////////////////// Creating of Lesson Schema //////////////////////////////////

const lessonSchema = new mongoose.Schema({
    lessonNo: {type: String, required: true},
    title: { type: String, required: true},
    deutsch:{ type: String, required: true},
    dari: { type: String, required: true},
    quiz: [{
        qnumber: { type: Number , required: true},
        question: { type: String, required: true},
        options: { type: Array, required: true},
        answer: { type: String, required: true}
    }]
}, { timestamps: true });

//////////////////////////////// Creating and exporting of Lesson Model //////////////////////////////////

module.exports.Lesson = mongoose.model('lessons', lessonSchema);