const mongoose = require("mongoose");

const connection = ()=>{
    mongoose.connect(process.env.MONGODB_URI,).then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        console.log(`Some error occured while connecting to databse: ${err}`);
    });
}

module.exports = {connection};