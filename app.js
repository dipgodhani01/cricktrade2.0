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
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        "http://localhost:3011", 
        "http://localhost:3000",
        "http://localhost:5173",
      ];
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
  })
);
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", adminRouter);

seedAdmin();
connection();
