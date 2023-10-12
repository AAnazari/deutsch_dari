const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./middlewares/functions');
const userRoute = require('./routes/userRoutes');
const lessonRoute = require('./routes/lessonRoutes');
const session = require('express-session');
const connectFlash = require('connect-flash');





const app = express();

//////////////////////////////// Setting View Engine ////////////////////////////////
app.set('view engine', 'ejs');

//////////////////////////////// Making static / public folder /////////////////////
app.use(express.static('public'));

///// Adding this 2 lines of code are for POST and PUT requests. Express provides with middleware to deal with incoming data objects in the body of the request.  ////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//////////////////////////////// Making Session //////////////////////////////////
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
       // secure: true, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60   
        ////////////////////////////////// Cookie is setted for one Hour //////////////////////
    }  
}));

////////////////////////////// Initializing Connect-Flash //////////////////////////////////////
app.use(connectFlash());

////////////////////////////// Middleware of Connect-Flash Messages //////////////////////////////////////
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

/////////////////////////////// Home Page /////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

/////////////////////////////// About US Page /////////////////////////////////////////
app.get('/about', (req, res) => {
    res.render('about', { title: 'Ahout US' });
});

/////////////////////////////// User Route /////////////////////////////////////////
app.use('/users', userRoute);

/////////////////////////////// Lesson Route /////////////////////////////////////////
app.use('/lessons', lessonRoute);

////////////////////////////// Listen to Port //////////////////////////////////////
app.listen(process.env.PORT || 5000, process.env.HOST || 'localhost', () => {

    ////////////////////////////// Connect to Database //////////////////////////////////////
    dbConnect(process.env.MONGODB_URI);

    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
