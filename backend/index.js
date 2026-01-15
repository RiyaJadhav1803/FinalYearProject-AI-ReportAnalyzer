import express from "express";
import dotenv from "dotenv";
import connectdB from "./config/db.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import profileRoutes from "./routes/profileRoutes.js";
app.use("/api/profile", profileRoutes);


app.listen(port, () => {
  connectdB();
  console.log(`Server running on port ${port}`);
});
