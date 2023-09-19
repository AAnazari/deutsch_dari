const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./middlewares/functions');
const userRoute = require('./routes/userRoutes');


//////////////////////////////// import User and Lesson Models //////////////////////////////////

const UserM = require('./models/user');
const lessonM = require('./models/lesson');





const app = express();

//////////////////////////////// Setting View Engine ////////////////////////////////
app.set('view engine', 'ejs');

//////////////////////////////// Making static / public folder /////////////////////
app.use(express.static('public'));


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


/////////////////////////////// Test Data Model /////////////////////////////////////////

app.get('/data', async (req, res) => {
    const data = {email: "ali@gmail.com", password:"سلام", name: {username:"ali", lastName:"Nazari", firstName:"Ali"}, lesson_id: "6508ad2bf7e06607c9edca08"};
    try {
        const user = new UserM.User(data);
        await user.save();
        console.log(user);
        res.render('index', { title: 'Home Home' }); 
    } catch (error) {
        console.log(error);
    }
});


////////////////////////////// Listen to Port //////////////////////////////////////
app.listen(process.env.PORT || 5000, process.env.HOST || 'localhost', () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
