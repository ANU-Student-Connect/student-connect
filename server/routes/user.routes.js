import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers,getUserById,editUser} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);
router.get('/:id', getUserById);

router.post("/edit", protectRoute, editUser);

export default router;