const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    mobile:{
      type: String,
      required: false,
      unique: true,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"]
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);