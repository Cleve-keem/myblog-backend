import express from "express";
// import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import initRepositories from "./src/utils/database.stater";
import userRoutes from "./src/routers/userRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hackhimblog.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // credentials: true,
  })
);

app.use("/api", userRoutes);

try {
  initRepositories();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.log("DB connection failed:", err);
}
