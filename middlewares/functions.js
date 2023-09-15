//////////////////////// Connect to MongoDB //////////////////////////

const mongoose = require("mongoose");

async function dbConnect(dbURI){
    try{
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    }catch(error){console.log(error);}
}






module.exports = {
    dbConnect: dbConnect
}