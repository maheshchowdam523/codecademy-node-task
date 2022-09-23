const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Cat", schema);
