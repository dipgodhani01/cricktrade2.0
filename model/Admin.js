const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  { timestamps: true }
);

adminSchema.methods.generateToken = function () {
  let role = this.role === 1 ? "admin" : "subadmin";
  console.log(role);
  
  return jwt.sign(
    { id: this._id, email: this.email, role: role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "1d" }
  );
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
