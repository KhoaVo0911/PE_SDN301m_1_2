// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const Course = require("../models/courseModel.js");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   token = req.cookies.jwt;
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await Course.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         res.status(401);
//         throw new Error("Not authorized, token has expired");
//       } else {
//         res.status(401);
//         throw new Error("Not authorized, invalid token");
//       }
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };

//

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Kiểm tra token từ cookies hoặc header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Course.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      if (error.name === "TokenExpiredError") {
        throw new Error("Not authorized, token has expired");
      } else {
        throw new Error("Not authorized, invalid token");
      }
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
