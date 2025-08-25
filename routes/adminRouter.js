const { createAdmin } = require("../controllers/adminController");

const express = require("express");


const router = express.Router();

router.post("/create",createAdmin);

module.exports = router