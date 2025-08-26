const Admin = require("../model/Admin.js");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./error.js");

exports.isAuthenticatedAdmin = async (req, res, next) => {
  try {
    const { admin_token } = req.cookies;

    if (!admin_token) {
      return next(
        new ErrorHandler("Please login as admin to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(admin_token, process.env.JWT_SECRET);
    console.log("decodedData", decodedData);

    const admin = await Admin.findById(decodedData.id).select("-password");
    console.log("admin", admin);
    if (!admin) {
      return next(new ErrorHandler("Admin not found", 404));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};
