import express from "express";
import { createCourse, getAllCourses, updateCourse, deleteCourse  } from "../controllers/courseController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/courses/", protect, createCourse);
router.get('/courses', getAllCourses);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;
