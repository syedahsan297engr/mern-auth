import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
//we have to make this update route secure by adding the middleware to check if the user is authenticated or not
//verifyUser file is in utils see that for more details
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;