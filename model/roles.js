const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  permission: {
    type: Array,
    required: false,
    default: []
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
  updatedAt: {
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
module.exports = mongoose.model("roles", RoleSchema);