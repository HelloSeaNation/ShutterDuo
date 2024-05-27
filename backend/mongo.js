const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ann:keshia&ann@cluster1.kqvqone.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1").then(() =>{
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