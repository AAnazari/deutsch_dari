const express = require('express');
const lessonRouter = express.Router();
const lessonController = require('../controllers/lessonController');

///////////////////////////////////// All lessons get route //////////////////////////////////
lessonRouter.get('/', lessonController.lessons_get);

///////////////////////////////////// Create Lesson get and post routes //////////////////////////////////
lessonRouter.get('/create', lessonController.create_lesson_get);
lessonRouter.post('/create', lessonController.create_lesson_post);

///////////////////////////////////// Create Quiz get and post routes //////////////////////////////////
lessonRouter.get('/create_quiz', lessonController.create_quiz_get);
lessonRouter.post('/create_quiz', lessonController.create_quiz_post);

///////////////////////////////////// Access a lesson get route //////////////////////////////////

lessonRouter.get('/', lessonController.lessons_get);

///////////////////////////////////// Access a quiz get route //////////////////////////////////



module.exports = lessonRouter;