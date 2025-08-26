const express = require("express");
const {
  getAdmins,
  loginAdmin,
  getLoggedInAdmin,
  logoutAdmin,
} = require("../controllers/adminController.js");
const {
  isAuthenticatedAdmin,
} = require("../middlewares/isAuthenticatedAdmin.js");
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/get", getAdmins);
router.get("/profile", isAuthenticatedAdmin, getLoggedInAdmin);
router.post("/logout", isAuthenticatedAdmin, logoutAdmin);

module.exports = router;
