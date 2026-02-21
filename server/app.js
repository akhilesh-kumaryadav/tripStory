import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/posts", postRoutes);
app.use("/auth", authRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established to MongoDb database.");

    app.listen(process.env.PORT, () =>
      console.log(
        `TripStory server is up and running on Port: ${process.env.PORT}`,
      ),
    );
  })
  .catch((error) => {
    console.log("Database connection failed.");
    console.error(error);
  });

mongoose.set("useFindAndModify", false);
