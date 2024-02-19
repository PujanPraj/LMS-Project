import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./db/connect.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server : ", error);
  }
};

start();
