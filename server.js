import express from "express";
import { fileURLToPath } from 'url';
import path from "path"
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


import connectDB from "./configs/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
import sectionRouter from "./routes/sectionRoutes.js";
import indexRouter from "./routes/index.js"
import configurePassport from "./middlewares/passport.js";


connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/members", authRoutes);
app.use("/api", courseRoutes);
app.use("/", indexRouter);
app.use("/users", memberRouter);
app.use("/sections", sectionRouter);


const url = "mongodb://0.0.0.0/PE_SDN301m_TrialTest_StudentCodeDB";
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("ok!!!!");
});

// app.get("/", (req, res) => res.send("Server is ready"));
// // app.use(notFound);
// // app.use(errorHandler);


// // view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
