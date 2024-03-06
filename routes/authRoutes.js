import express from "express";
import { loginMember } from "../controllers/authController.js";

const router = express.Router();

// Route đăng nhập
router.post("/login/", loginMember);

export default router;
