import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controllers/task.js"; // make sure to add .js
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// add task
router.post("/task/new", isAuthenticated, newTask);

// get taks of current user
router.get("/task/my", isAuthenticated, getMyTask);

/*
// upate task
router.put("/task/id:", updateTask);

// delte task
router.delete("/task/id:", delteTask);

*/

// OR
router
  .route("/task/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
