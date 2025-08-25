const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRouter = require("./routes/adminRouter.js");
const { connection } = require("./database/db.js");
const { seedAdmin } = require("./controllers/adminController.js");
const cookieParser = require("cookie-parser");
const app = express();
module.exports = { app };
dotenv.config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin",adminRouter)

seedAdmin();
connection();
