const express = require("express");
const dotenv = require("dotenv");
const adminRouter = require("./routes/adminRouter.js");
const { connection } = require("./database/db.js");
const { seedAdmin } = require("./controllers/adminController.js");

const app = express();
module.exports = { app };
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin",adminRouter)

seedAdmin();
connection()
