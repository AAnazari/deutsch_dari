const lessonM = require('../models/lesson');
const userM = require('../models/user');


///////////////////////////////////// Lessons Controllers //////////////////////////////////

const lessons_get = async (req, res) => {
    try {
        const lessons = await lessonM.Lesson.find(); 
        res.render('lessons/lesson', {title : 'All lessons', lessons: lessons});
    } catch (error) {
        console.log(error);
    }
};

const a_lesson_get = async (req, res) => {
    try {
        const lesson = await lessonM.Lesson.findById(req.params.id); 
        const userLesson = req.user.lesson_id;
        if(userLesson.indexOf(lesson.id) !== -1 || lesson.lessonNo === "1") {
            res.render('lessons/details', {title : 'A Lesson', lesson: lesson});
        }else{
            req.flash("warning", "You should learn step by step");
            res.redirect("/lessons");
        }
        
        
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

///////////////////////////////////// Quiz Controllers //////////////////////////////////

const quiz_get = async (req, res) => {
    try {
        const lesson = await lessonM.Lesson.findOne({lessonNo: req.params.lessonNo});
        const quizes = lesson.quiz;
        quizes.sort(function(a,b) {
            return a.qnumber - b.qnumber;
        });
        res.render('lessons/quiz', {title : 'Quizes', lessonNo: req.params.lessonNo, quizes: quizes});
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
    a_lesson_get,
    create_lesson_get,
    create_lesson_post,
    quiz_get,
    create_quiz_get,
    create_quiz_post
};