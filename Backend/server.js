import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./src/config/databaseConfig.js";
import labelRouter from "./src/routes/labelRoute.js";
import navigationRouter from "./src/routes/navigationRoute.js";
import orderRouter from "./src/routes/orderRoute.js";
import tableRouter from "./src/routes/tableRoute.js";

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.FRONTEND_URL || "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/labels", labelRouter);
app.use("/api/navigation", navigationRouter);
app.use("/api/order", orderRouter);
app.use("/api/tables", tableRouter);

app.listen(port, () => {
  console.log("Server started on port : ", port);
});