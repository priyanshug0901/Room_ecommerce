import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRouter from "./routes/roomRouter.js";
import cityRouter from "./routes/cityRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/room", roomRouter);
app.use("/city", cityRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ msg: "Welcome to our API" }));
app.use((req, res) => res.status(404).json({ msg: "Wrong link" }));

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/rent-all", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
