import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { courseName, courseDescription } = req.body;

  const newCourse = await Course.create({
    courseName,
    courseDescription,
  });

  res.status(201).json(newCourse);
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find(); // Tìm tất cả các courses
  res.status(200).json(courses);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const course = await Course.findById(id); // Tìm course theo ID

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }); // Cập nhật course
  res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const course = await Course.findById(id); // Tìm course theo ID

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  await course.deleteOne(); // Xóa course
  res.status(200).json({ message: "Course removed" });
});
