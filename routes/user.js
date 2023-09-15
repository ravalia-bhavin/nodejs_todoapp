import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// registe new users
router.post("/users/new", register);

// login existing users
router.post("/users/login", login);

// logout
router.get("/users/logout", logout);

// get info of user
router.get("/users/me", isAuthenticated, getMyProfile);

export default router;
