import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import empoyeeRoute from "./routes/employeeRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/employee", empoyeeRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
