import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Member from "../models/memberModel.js"; // Đảm bảo đường dẫn đến model Member đúng

// Đăng nhập và nhận token
export const loginMember = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const member = await Member.findOne({ username });
    if (member && (await bcrypt.compare(password, member.password))) {
      // Tạo token
      const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: member._id,
        username: member.username,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while logging in",
        error: error.toString(),
      });
  }
});
