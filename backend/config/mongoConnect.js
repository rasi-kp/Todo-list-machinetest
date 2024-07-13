const mongoose = require("mongoose");
const url = process.env.MONGODB_URI

const connect=mongoose.connect(url)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{

    console.log('db connection error',err);
})

module.exports=connect;
