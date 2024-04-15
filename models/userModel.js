const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    isAdmin: { type: Boolean, require, default: false },
    token: { type: String },
    tokenCreatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
