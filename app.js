const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./middlewares/functions');
const userRoute = require('./routes/userRoutes');


//////////////////////////////// import User and Lesson Models //////////////////////////////////
//const UserM = require('./models/user');
//const lessonM = require('./models/lesson');





const app = express();

//////////////////////////////// Setting View Engine ////////////////////////////////
app.set('view engine', 'ejs');

//////////////////////////////// Making static / public folder /////////////////////
app.use(express.static('public'));

///// Adding this 2 lines of code are for POST and PUT requests. Express provides with middleware to deal with incoming data objects in the body of the request.  ////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


////////////////////////////// Connect to Database //////////////////////////////////////
app.use((req, res, next) => {
    dbConnect(process.env.MONGODB_URI);
    next();
});


/////////////////////////////// Home Page /////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

/////////////////////////////// User Route /////////////////////////////////////////
app.use('/users', userRoute);



////////////////////////////// Listen to Port //////////////////////////////////////
app.listen(process.env.PORT || 5000, process.env.HOST || 'localhost', () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
