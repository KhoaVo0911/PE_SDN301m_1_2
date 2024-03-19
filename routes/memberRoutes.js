import express from "express";
import memberController from "../controllers/memberController.js";
import { ensureAuthenticated } from "../configs/auth.js";

const memberRouter = express.Router();

memberRouter
  .route("/")
  .get(memberController.index)
  .post(memberController.regist);

memberRouter
  .route("/login")
  .get(memberController.login)
  .post(memberController.signin);

memberRouter.route("/logout").get(memberController.signout);

memberRouter
  .route("/dashboard")
  .get(ensureAuthenticated, memberController.dashboard);

export default memberRouter;
