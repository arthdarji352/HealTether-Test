import express from "express";

import auth from "../middlewares/auth.js";
import {
  addEmployeeController,
  deleteEmployeeController,
  getEmployeeController,
  getSingleEmployeeController,
  updateEmployeeController,
} from "../controllers/employeeController.js";
const router = express.Router();

router.post("/", addEmployeeController);
router.get("/:id", getEmployeeController);
router.get("/single/:id", getSingleEmployeeController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);

export default router;
