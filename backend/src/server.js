import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
