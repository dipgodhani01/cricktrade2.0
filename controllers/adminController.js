const Admin = require("../model/Admin.js");

const createAdmin = async (req, res) => {
  try {
    const { username, email } = req.body;

    const newAdmin = new Admin({ username, email });
    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createAdmin };
