import express from "express";
import {
  loginController,
  registerController,
  getUserController,
  signout,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getuser", auth, getUserController);
router.get("/signout", signout);
export default router;
