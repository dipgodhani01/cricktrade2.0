const express = require("express");
const { getAdmins, loginAdmin, getLoggedInAdmin, logoutAdmin } = require("../controllers/adminController");
const { isAuthenticatedAdmin } = require("../middlewares/isAuthenticatedAdmin");
const router = express.Router();

router.post("/login",loginAdmin);
router.get("/get",getAdmins);
router.get("/", isAuthenticatedAdmin, getLoggedInAdmin); 
router.post("/logout", isAuthenticatedAdmin, logoutAdmin); 


module.exports = router