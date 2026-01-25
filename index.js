import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import adminRouter from './routes/admin.routes.js';

mongoose.set("strictQuery", true);

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://asustufa15521_db_user:Cp4kTU3QMlif3VuV@learingdb.brlufgj.mongodb.net/course-backend");
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
