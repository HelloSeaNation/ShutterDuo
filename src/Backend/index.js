const express = require('express');
const collection = require('./mongo');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), ( req, res ) =>{

})

app.post("/", async( req, res ) =>{
  const{email, password}=req.body

  try{
    const check = await collection.findOne({email:email})
    if(check){
      res.json("Email already exists")
    }
    else{
      res.json("Email okay")
    }

  }catch(e){
    res.json("Email okay")
  }
})

app.post("/", async( req, res ) =>{ //signup
  const{firstName, surname, email, password}=req.body

  const data = {
    firstName: firstName,
    surname: surname,
    email:email,
    password:password
  }

  try{
    const check = await collection.findOne({email:email})
    if(check){
      res.json("Email already exists")
    }
    else{
      res.json("Email okay")
      await collection.insertMany([data])
    }

  }catch(e){
    res.json("Email okay")
  }
})


// app.get('/', (req, res) =>{
//   res.send("API is running")
// })

app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });