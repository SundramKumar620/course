import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import adminRouter from './routes/admin.routes.js';

mongoose.set("strictQuery", true);



const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("DB connected successfully");

    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1); // stops the backend if DB fails
  }
};

startServer();
