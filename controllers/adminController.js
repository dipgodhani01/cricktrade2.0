const { catchAsyncError } = require("../middlewares/catchAsyncError.js");
const ErrorHandler = require("../middlewares/error.js");
const Admin = require("../model/Admin.js");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken.js");

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: "prowesscheck@gmail.com",
    });
    if (adminExists) return;

    const hashedPassword = await bcrypt.hash("admin@123", 12);

    await Admin.create({
      username: "administrator",
      email: "prowesscheck@gmail.com",
      password: hashedPassword,
      role: 1,
    });
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ role: 1 }).select("-password"); 

    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json({
      status: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
};

const loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new ErrorHandler("Email and Password are required.", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect password.", 400));
    }

    sendToken(admin, 200, "Admin logged in successfully.", res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});

const getLoggedInAdmin = catchAsyncError(async (req, res, next) => {  
  console.log("req.admin",req.admin);
  res.status(200).json({
    status: true,
    admin: req.admin,
  });
});

const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", 
  });

  res.status(200).json({
    status: true,
    message: "Logged out successfully",
  });
});


module.exports = { seedAdmin, loginAdmin, getAdmins, getLoggedInAdmin ,logoutAdmin};
