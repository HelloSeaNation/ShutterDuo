const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const Gallery = require("./models/gallery"); //Gallery model
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.post("/", async (req, res) => {
  //signup
  const { firstName, surname, email, password } = req.body;
  console.log(`Received data: ${firstName}, ${surname}, ${email}`);

  const data = {
    firstName: firstName,
    surname: surname,
    email: email,
    password: password,
  };

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

//login endpoint
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({
      email: email,
      password: password,
    });
    if (check) {
      res.json("Login Successful");
    } else {
      res.json("Invalid Email and Password");
    }
  } catch (e) {
    console.error("An error occurred during login:", e);
    res.status(500).json("An error occured during a login");
  }
});

//Create Gallery endpoint
app.post("/createGallery", async (req, res) => {
  const { title, description } = req.body;

  const galleryData = {
    title,
    description,
  };

  try {
    await Gallery.insertMany([galleryData]);
    res.json({ message: "Gallery created successfully" });
  } catch (e) {
    console.error("An error occurred while creating the gallery:", e);
    res
      .status(500)
      .json({ message: "An error occurred while creating the gallery" });
  }
});

app.get("/galleries", async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (e) {
    console.error("An error occurred while fetching the galleries:", e);
    res.status(500).json({ message: "An error occurred while fetching the galleries" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
