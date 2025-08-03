import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
