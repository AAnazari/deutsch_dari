const lessonM = require('../models/lesson');
const userM = require('../models/user');
const {increaseLessonNo} = require('../middlewares/functions');


///////////////////////////////////// Lessons Controllers //////////////////////////////////

const lessons_get = async (req, res) => {
    try {
        const lessons = await lessonM.Lesson.find(); 
        res.render('lessons/lesson', {title : 'All lessons', lessons: lessons});
    } catch (error) {
        req.flash('error', error.message);
    }
};

const a_lesson_get = async (req, res) => {
    try {
        const lesson = await lessonM.Lesson.findById(req.params.id); 
        const userLesson = req.user.lesson_id;
        if(userLesson.indexOf(lesson.id) !== -1 || lesson.lessonNo === "1" || req.user.admin) {
            res.render('lessons/details', {title : 'A Lesson', lesson: lesson});
        }else{
            req.flash("warning", "You should learn step by step");
            res.redirect("/lessons");
        }
        
        
    } catch (error) {
        req.flash('error', error.message);
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
        req.flash('error', error.message);
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
        res.render('lessons/quiz', {title : 'Quizes', lessonNo: req.params.lessonNo, quizes: quizes, lessonNO: req.params.lessonNo});
    } catch (error) {
        req.flash('error', error.message);
    }
};

const quizPost = async (req, res) => {
    try {
        let correctAnswer = 0;
        const lessonNo = req.params.lessonNo;
        const lesson = await lessonM.Lesson.findOne({lessonNo});

        ////////////////////////////////find all quizes of a given lesson /////////////////////////
        const quizes = lesson.quiz;
        ////////////////////////////////sort quizes /////////////////////////
        quizes.sort(function(a,b) {
            return a.qnumber - b.qnumber;
        });

        ////////////////////////////////compare quizes with user answers/////////////////////////
        const userAnswer = req.body;
        
        for(let i = 0; i < quizes.length; i++){
            if(quizes[i].answer === userAnswer["answer"+(i+1)]){
                correctAnswer += 1;
            }
        }

        /* ////////////////////////////// This for loop war for 'select options', now we changed the select option to Radio button options. ////////////////////////////////////
        //const userAnswer = req.body.answer;

        for(let i = 0; i < quizes.length; i++){
            if(typeof userAnswer == "string" && quizes[i].answer === userAnswer){
                correctAnswer += 1;
            }else if(quizes[i].answer === userAnswer[i] ){
                correctAnswer += 1;
            }
        }
        */

        ////////////////////////////////if the correct answers is greater than the half of the quiz number ///
        ///////////////////////// Then the user can continue to the next Lesson //////////////////
        //////////////////////////////// otherwise the user should learn the Lesson again //////////////////
        if(correctAnswer > quizes.length/2){
            const email = req.user.email;
            //////////////////////////////// increaseLessonNo is a function that returns the Next Lesson Number //////////////////
            const nextLesson = await lessonM.Lesson.findOne({lessonNo: increaseLessonNo(lessonNo)});
            if (nextLesson){
                const user = await userM.User.findOne({email});
                if(user.lesson_id.indexOf(nextLesson.id) === -1){
                    await userM.User.updateOne({email}, {$push: {lesson_id: nextLesson.id}});
                }
                req.flash('success', 'You have successfully finished the Lesson');
                req.flash('info', 'You can now start the next Lesson');
            } else {
                req.flash('success', 'You have successfully finished All the Lessons');
            }
            res.redirect('/lessons');
        }else {
            req.flash('warning', 'You should learn more, and try again later');
            res.redirect("back");
        }
    } catch (error) {
        req.flash('error', error.message);
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
        req.flash('error', error.message);
    }
};

module.exports = {
    lessons_get,
    a_lesson_get,
    create_lesson_get,
    create_lesson_post,
    quiz_get,
    quizPost,
    create_quiz_get,
    create_quiz_post
};