const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

//////////////////////////////// Creating of Lesson Schema //////////////////////////////////

const lessonSchema = new mongoose.Schema({
    lessonNo: {type: String, required: true},
    title: { type: String, required: true},
    deutsch:{ type: String, required: true},
    dari: { type: String, required: true},
    quiz: {
        number: { type: Number , required: true},
        quizText: { type: String, required: true},
        answer: { type: String, required: true}
    }
}, { timestamps: true });

//////////////////////////////// Creating and exporting of Lesson Model //////////////////////////////////

module.exports.Lesson = mongoose.model('lessons', lessonSchema);