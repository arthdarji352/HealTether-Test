import express from "express";

import auth from "../middlewares/auth.js";
import {
  addEmployeeController,
  deleteEmployeeController,
  getEmployeeController,
  updateEmployeeController,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/", auth, addEmployeeController);
router.get("/", auth, getEmployeeController);
router.put("/:id", auth, updateEmployeeController);
router.delete("/:id", auth, deleteEmployeeController);

export default router;
