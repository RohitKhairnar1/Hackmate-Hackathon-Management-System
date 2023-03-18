const mongoose = require('mongoose');
require('dotenv/config')

const connectDb = async () => { 
    
    try{
        console.log("connecting to mongodb")
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected : ${mongoose.connection.host}`);
    }catch(err){
        console.log("err",err);
        process.exit(1);
    }
}

module.exports = connectDb