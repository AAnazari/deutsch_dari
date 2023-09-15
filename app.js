const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./middlewares/functions');



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


////////////////////////////// Listen to Port //////////////////////////////////////
app.listen(process.env.PORT || 5000, process.env.HOST || 'localhost', () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
