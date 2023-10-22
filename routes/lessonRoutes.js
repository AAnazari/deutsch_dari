const express = require('express');
const lessonRouter = express.Router();
const lessonController = require('../controllers/lessonController');
const {ensureAuthenticated, ensureNotAuthenticated} = require('../middlewares/functions');


///////////////////////////////////// All lessons get route //////////////////////////////////
lessonRouter.get('/', ensureAuthenticated, lessonController.lessons_get);

///////////////////////////////////// Create Lesson get and post routes //////////////////////////////////
lessonRouter.get('/create',ensureAuthenticated, lessonController.create_lesson_get);
lessonRouter.post('/create', lessonController.create_lesson_post);

///////////////////////////////////// Create Quiz get and post routes //////////////////////////////////
lessonRouter.get('/create_quiz', ensureAuthenticated, lessonController.create_quiz_get);
lessonRouter.post('/create_quiz', lessonController.create_quiz_post);

///////////////////////////////////// Access a lesson get route //////////////////////////////////
lessonRouter.get('/:id', ensureAuthenticated, lessonController.a_lesson_get);

///////////////////////////////////// Access a quiz get route //////////////////////////////////
lessonRouter.get('/quiz/:lessonNo', ensureAuthenticated, lessonController.quiz_get);


module.exports = lessonRouter;