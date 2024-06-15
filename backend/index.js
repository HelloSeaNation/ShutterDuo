const express = require("express");
const { collection, Image } = require("./mongo");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Gallery = require("./models/gallery");
const nodemailer = require("nodemailer");
const sendGridMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const galleries = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const Users = collection;

app.get("/", (req, res) => {
  res.send("API is running");
});

console.log(collection);

app.post("/checkEmail", async (req, res) => {
  const { email } = req.body;
  console.log(`Email to check: ${email}`);

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
    const user = await collection.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
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
    res
      .status(500)
      .json({ message: "An error occurred while fetching the galleries" });
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
    res
      .status(500)
      .json({ message: "An error occurred while fetching the gallery" });
  }
});

// Delete gallery endpoint
app.delete("/deleteGallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    const deletedImages = await Image.deleteMany({ gallery: id });
    await Gallery.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Gallery and associated images deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the gallery" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Set the file name
  },
});

// Edit gallery endpoint
app.put("/editGallery/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (gallery) {
      res.json({ message: "Gallery updated successfully", gallery });
    } else {
      res.status(404).json({ message: "Gallery not found" });
    }
  } catch (error) {
    console.error("Error updating gallery:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the gallery" });
  }
});

const upload = multer({ storage: storage });

app.post("/uploadImages", upload.array("images", 12), async (req, res) => {
  const { galleryTitle } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  try {
    let gallery = await Gallery.findOne({ title: galleryTitle });
    if (!gallery) {
      gallery = new Gallery({ title: galleryTitle });
      await gallery.save();
    }

    const galleryID = gallery._id;

    const imageDocs = req.files.map((file) => ({
      filename: file.filename,
      imageURL: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      galleryTitle,
      galleryID,
    }));

    await Image.insertMany(imageDocs);

    res
      .status(200)
      .json({ message: "Images uploaded and saved to database successfully." });
  } catch (error) {
    console.error("Error uploading images:", error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading images." });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fetch images by galleryID
app.get("/imagesByGallery/:galleryID", async (req, res) => {
  const { galleryID } = req.params;

  try {
    const images = await Image.find({ galleryID });

    if (images.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found for this gallery" });
    }

    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching images" });
  }
});

// Delete image
app.delete("/deleteImages", async (req, res) => {
  const { ids } = req.body;

  try {
    const results = await Image.deleteMany({ _id: { $in: ids } });
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "Images deleted successfully" });
    } else {
      res.status(404).json({ message: "No images found to delete" });
    }
  } catch (error) {
    console.error("Error deleting images:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting images" });
  }
});
//send report email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "shutterduoteam@gmail.com",
    from: "nonameorkeshia@gmail.com",
    subject: `Message from ${name}`,
    text: `You have received a new message from ${name} \n\n(${email}):\n\n${message}`,
  };

  try {
    await sendGridMail.send(msg);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error response from SendGrid:", error.response.body);
    res.status(500).send("Error sending email");
  }
});

//search photographer using search router
const searchRouter = require("./router");
app.use("/api", searchRouter);

//upload profile picture
app.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  async (req, res) => {
    const { email } = req.body;

    try {
      const user = await collection.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create the URL for the uploaded file
      const profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;

      user.profilePicture = profilePictureUrl;
      await user.save();

      res.json({ message: "Profile picture uploaded successfully", user });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({
        message: "An error occurred while uploading the profile picture",
      });
    }
  }
);

// Endpoint to serve profile pictures
app.get("/profilePicture/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving profile picture:", err);
      res.status(404).json({ message: "Profile picture not found" });
    }
  });
});

// New route for updating gallery cover image
app.put(
  "/gallery/:id/coverImage",
  upload.single("coverImage"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const gallery = await Gallery.findById(id);

      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create the URL for the uploaded file
      const coverImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;

      gallery.coverImage = coverImageUrl;
      await gallery.save();

      res.json({
        message: "Gallery cover image updated successfully",
        gallery,
      });
    } catch (error) {
      console.error("Error updating gallery cover image:", error);
      res.status(500).json({
        message: "An error occurred while updating the gallery cover image",
      });
    }
  }
);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//upload highlights
app.post("/uploadHighlights", upload.array("highlights", 6), async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.files.forEach((file, index) => {
      if (file) {
        const highlightUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        user[`highLight${index}`] = highlightUrl;
      }
    });

    await user.save();
    res.json({ message: "Highlights uploaded successfully", user });
  } catch (error) {
    console.error("Error uploading highlights:", error);
    res.status(500).json({
      message: "An error occurred while uploading the highlights",
    });
  }
});

// Endpoint to serve highlights
app.get("/highlights/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error uploading highlight:", err);
      res.status(404).json({ message: "File not found" });
    }
  });
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
