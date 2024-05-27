const express = require('express');
const collection = require('./mongo');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/checkEmail", async (req, res) => {
  const { email } = req.body;

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("Email already exists");
    } else {
      res.json("Email okay");
    }
  } catch (e) {
    res.status(500).json("An error occurred while checking the email");
  }
});


app.post("/", async( req, res ) =>{ //signup
  const{firstName, surname, email, password}=req.body

  const data = {
    firstName: firstName,
    surname: surname,
    email:email,
    password:password
  }

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("Email already exists");
    } else {
      await collection.insertMany([data]);
      res.json("Signup successful");
    }
  } catch (e) {
    res.status(500).json("An error occurred while signing up");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});