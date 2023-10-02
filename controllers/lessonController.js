const lessonM = require('../models/lesson');

const lessons_get = async (req, res) => {
    try {
        res.render('lessons/lesson', {title : 'All lessons'});
    } catch (error) {
        console.log(error);
    }
};

const create_lesson_get = (req, res) => {
        res.render('lessons/create_lesson', {title : 'Create a new lesson'});
};

const create_lesson_post = async (req, res) => {
    try {
        const lesson = new lessonM.Lesson(req.body);
        console.log(lesson);
        await lesson.save();
        res.redirect("/lessons/create_quiz");
        //lesson.save();
    } catch (error) {
        console.log(error);
    }
};

const create_quiz_get = (req, res) => {
        res.render('lessons/create_quiz', {title : 'Create a new quiz'});
};
const create_quiz_post = async (req, res) => {
    try {
        console.log(req.body);
        await lessonM.Lesson.updateOne({lessonNo: req.body.lessonNo}, {$push: {quiz: [req.body]}});
        res.redirect('/lessons');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    lessons_get,
    create_lesson_get,
    create_lesson_post,
    create_quiz_get,
    create_quiz_post
};