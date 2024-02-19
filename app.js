import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World from LMS!");
});

//routes
import userRouters from "./routes/user.routes.js";

app.use("/api/users", userRouters);

//custom middlewares
import { handleError, notFound } from "./middlewares/errorHandler.js";
app.use(notFound);
app.use(handleError);
