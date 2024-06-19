const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
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

const userSchema = new mongoose.Schema({
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
  highLight0: {
    type: String
  },
  highLight1: {
    type: String
  },
  highLight2: {
    type: String
  },
  highLight3: {
    type: String
  },
  highLight4: {
    type: String
  },
  highLight5: {
    type: String
  }
});

const collection = mongoose.model("Users", userSchema);

const ImageSchema = new mongoose.Schema({
  filename: String,
  imageURL: String,
  galleryTitle: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  galleryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery'
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = {
  collection,
  Image
};
