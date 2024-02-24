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
  res.send(`<a href="http://localhost:4000/google">Login with google</a>`);
});

//routes
import userRouters from "./routes/user.routes.js";
import googleRouter from "./routes/google.routes.js";
import tutCategoryRouter from "./routes/tutCategory.routes.js";
import tutorialRouter from "./routes/tutorial.routes.js";
import newsletterRouter from "./routes/newsletter.routes.js";
import reviewRouter from "./routes/review.routes.js";
import contactRouter from "./routes/contact.routes.js";

app.use("/api/users", userRouters);
app.use("/", googleRouter);
app.use("/api/tutCategory", tutCategoryRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/", newsletterRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);

//custom middlewares
import { handleError, notFound } from "./middlewares/errorHandler.js";
app.use(notFound);
app.use(handleError);
