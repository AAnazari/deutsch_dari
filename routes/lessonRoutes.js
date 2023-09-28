const express = require('express');
const lessonRouter = express.Router();
const lessonController = require('../controllers/lessonController');

lessonRouter.get('/', lessonController.lessons_get);



module.exports = lessonRouter;