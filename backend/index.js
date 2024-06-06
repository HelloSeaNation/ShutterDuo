const express = require("express");
const collection = require("./mongo");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Gallery = require("./models/gallery"); //Gallery model
const app = express();
const galleries = [];

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

 //register
app.post("/register", async (req, res) => {
  const { firstName, surname, email, password } = req.body;
  console.log(`Received data: ${firstName}, ${surname}, ${email}`);

  const data = {
    firstName: firstName,
    surname: surname,
    email: email,
    password: password,
  };

  try {
    const user = await collection.findOne({ email: email });
    if (user) {
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({
      email: email,
      password: password,
    });
    if (user) {
      res.json({ message: "Login Successful", user: user });
    } else {
      res.json("Invalid Email and Password");
    }
  } catch (e) {
    console.error("An error occurred during login:", e);
    res.status(500).json("An error occured during a login");
  }
});

app.get("/user/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await collection.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(500).json("An error occurred while fetching user data");
  }
});

app.put("/user/:email", async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  try {
    const user = await collection.findOneAndUpdate({ email }, updateData, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(500).json("An error occurred while updating user data");
  }
});

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

// Get a gallery by ID
app.get("/gallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findById(id);
    if (gallery) {
      res.json(gallery);
    } else {
      res.status(404).json({ message: "Gallery not found" });
    }
  } catch (e) {
    console.error("An error occurred while fetching the gallery:", e);
    res.status(500).json({ message: "An error occurred while fetching the gallery" });
  }
});

// Delete gallery endpoint
app.delete('/deleteGallery/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findByIdAndDelete(id);
    if (gallery) {
      res.status(200).json({ message: "Gallery deleted successfully" });
    } else {
      res.status(404).json({ message: "Gallery not found" });
    }
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ message: "An error occurred while deleting the gallery" });
  }
});

//upload profile picture
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Set the file name
  }
});

const upload = multer({ storage: storage });

app.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = req.file.path;
    await user.save();

    res.json({ message: 'Profile picture uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'An error occurred while uploading the profile picture' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});