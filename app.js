const express = require('express');
require('dotenv').config();

const app = express();


/////////////////////////////// Home Page /////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('Herzlich welcommen');
});




app.listen(process.env.PORT || 5000);