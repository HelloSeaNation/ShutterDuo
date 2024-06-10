const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
})
.then(() => {
  console.log("MongoDB connected");
})
.catch((error) => {
  console.error("Connection failed", error);
});

const newSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  business: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  job: {
    type: String,
  },
  phone: {
    type: String,
  },
  facebook: {
    type: String,
  },
  insta: {
    type: String,
  },
  pinterest: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youtube: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

const collection = mongoose.model("Users", newSchema);

const ImageSchema = new mongoose.Schema({
  filename: String,
  imageURL: String,
  galleryTitle: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = {
  collection,
  Image
};
