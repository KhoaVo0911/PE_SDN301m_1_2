import express from "express";
import sectionController from "../controllers/sectionController.js";
import { ensureAuthenticated } from "../configs/auth.js";

const sectionRouter = express.Router();

sectionRouter
  .route("/")
  .get(ensureAuthenticated, sectionController.getSections);

sectionRouter
  .route("/add-section")
  .get(ensureAuthenticated, sectionController.getAddSection)
  .post(ensureAuthenticated, sectionController.postAddSection);

sectionRouter
  .route("/edit-section/:sectionId")
  .get(ensureAuthenticated, sectionController.getEditSection);

sectionRouter
  .route("/edit-section")
  .post(ensureAuthenticated, sectionController.postEditSection);

sectionRouter
  .route("/delete-section")
  .post(ensureAuthenticated, sectionController.postDeleteSection);

export default sectionRouter;
