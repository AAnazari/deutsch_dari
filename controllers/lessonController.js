const lessonM = require('../models/lesson');

const lessons_get = (req, res) => {
    try {
        res.render('lessons/lesson', {title : 'All lessons'});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    lessons_get
};