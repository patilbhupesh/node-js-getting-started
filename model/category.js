const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: false
  },
  predefined: {
    type: Boolean,
    required: false,
    default: false
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

// export model user with UserSchema
module.exports = mongoose.model("category", CategorySchema, "category");