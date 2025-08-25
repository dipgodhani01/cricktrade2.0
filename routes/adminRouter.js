const express = require("express");
const { getAdmins } = require("../controllers/adminController");
const router = express.Router();

router.get("/get",getAdmins);

module.exports = router