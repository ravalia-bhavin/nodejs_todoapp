import express, { application } from "express";
import userRouter from "./routes/user.js"; // make sure to add .js
import taskRouter from "./routes/task.js"; // make sure to add .js
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origint: [process.env.FRONTEND_URL], // url of webiste e.x todoApp.com
    methods: ["GET", "POST", "PUT", "DELETE"], // which method allows
    credentials: true, // if credential in off then cookie not work
  })
);

// Using routes
// connect userRouter with app.js ✅✅✅
// connect taskRouter with app.js ✅✅✅
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => {
  res.send("<h1>First Route 🐌</h1>");
});

// uisng error middleware
app.use(errorMiddleware);
