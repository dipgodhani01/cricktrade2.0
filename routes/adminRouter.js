const express = require("express");
const { getAdmins } = require("../controllers/adminController");
const router = express.Router();

router.post("/get",getAdmins);

module.exports = router