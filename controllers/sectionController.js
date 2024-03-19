import express from "express";
import Course from "../models/courseModel.js";
import { Section } from "../models/sectionModel.js";
import bcrypt from "bcrypt";

// Assuming express is already setup to use ES6 imports
const router = express.Router();

async function getSections(req, res) {
  try {
    const sections = await Section.find().lean(); // Assuming `Section.find().lean()`
    const courses = await Course.find().lean(); // Assuming `Courses.find().lean()`
    res.render("sections", {
      sects: sections,
      courses: courses,
      pageTitle: "All Sections",
      path: "/sections",
    });
  } catch (err) {
    console.log(err);
  }
};

async function getAddSection(req, res) {
  try {
    const courses = await Course.find().lean();
    res.render("edit-section", {
      pageTitle: "Add Section",
      path: "/sections/add-section",
      editing: false,
      courses: courses,
    });
  } catch (err) {
    console.log(err);
  }
};

async function postAddSection(req, res) {
  const { sectionName, sectionDescription, duration, isMainTask, courseId } =
    req.body;
  try {
    const section = new Section({
      sectionName,
      sectionDescription,
      duration,
      isMainTask: isMainTask === "true",
      course: courseId,
    });
    await section.save();
    console.log("Created Section");
    res.redirect("/sections");
  } catch (err) {
    console.log(err);
  }
};

async function postDeleteSection(req, res) {
  const { sectionId } = req.body;
  try {
    await Section.findByIdAndDelete(sectionId);
    console.log("DESTROYED section");
    res.redirect("/sections");
  } catch (err) {
    console.log(err);
  }
};

async function getEditSection(req, res) {
  const { edit } = req.query;
  const { sectionId } = req.params;
  if (!edit) {
    return res.redirect("/");
  }
  try {
    const section = await Section.findById(sectionId).lean();
    const courses = await Course.find().lean();
    if (!section) {
      return res.redirect("/");
    }
    res.render("edit-section", {
      pageTitle: "Edit Section",
      path: "/sections/edit-section",
      editing: edit,
      section: section,
      courses: courses,
    });
  } catch (err) {
    console.log(err);
  }
};

async function postEditSection(req, res) {
  const {
    sectionId,
    sectionName,
    sectionDescription,
    duration,
    isMainTask,
    courseId,
  } = req.body;
  try {
    await Section.findByIdAndUpdate(sectionId, {
      sectionName,
      sectionDescription,
      duration,
      isMainTask: isMainTask === "true",
      course: courseId,
    });
    console.log("UPDATED SECTION!");
    res.redirect("/sections");
  } catch (err) {
    console.log(err);
  }
};

export default {
  getSections,
  getAddSection,
  postAddSection,
  getEditSection,
  postEditSection,
  postDeleteSection,
};


