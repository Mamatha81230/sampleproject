const mongoose = require("mongoose");

const DB = process.env.MONGODB_URI;



mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));
