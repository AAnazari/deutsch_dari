const mongoose = require("mongoose");


//////////////////////// Connect to MongoDB //////////////////////////
async function dbConnect(dbURI, dbName){
    try{
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    }catch(error){console.log(error);}
}





module.exports = {
    dbConnect: dbConnect,
}