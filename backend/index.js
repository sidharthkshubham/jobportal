import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import userroute from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "https://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

const port = 3000;
app.use("/api/v1/user", userroute);

app.listen(port, () => {
  connectdb();
  console.log(`Server is running on the port ${port}`);
});