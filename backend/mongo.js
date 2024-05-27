const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ShutterDuo:YooBee123@shutterduo.tcwmeif.mongodb.net/").then(() =>{
    console.log("MongoDB connected");
}).catch(() =>{
    console.log("connection failed");
})

const newSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection