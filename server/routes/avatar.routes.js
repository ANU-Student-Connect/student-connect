import express from "express";
import { getAllAvatars } from "../controllers/avatar.controller.js";
const router = express.Router();

router.get("/", getAllAvatars);

export default router;
