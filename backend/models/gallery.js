const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  coverImage: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
