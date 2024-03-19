import express from "express";
import memberController from "../controllers/memberController.js";

const router = express.Router();

/* GET home page. */
router.route("/").get(memberController.index);

export default router;
