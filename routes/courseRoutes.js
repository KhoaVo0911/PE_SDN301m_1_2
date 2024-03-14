import express from "express";
import { createCourse, getAllCourses, updateCourse, deleteCourse  } from "../controllers/courseController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/courses/", protect, createCourse);
router.get('/courses', protect, getAllCourses);
router.put('/courses/:id', protect, updateCourse);
router.delete('/courses/:id', protect, deleteCourse);

export default router;
