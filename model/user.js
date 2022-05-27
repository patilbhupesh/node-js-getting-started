const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: false,
    default: true
  },
  branches: {
    type: Array,
    required: false,
    default: []
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: true
  },
  roles: {
    type: Array,
    required: false,
    default: []
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
module.exports = mongoose.model("users", UserSchema);
