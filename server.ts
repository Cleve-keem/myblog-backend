import express from "express";
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
    origin: [
      process.env.FRONTEND_DEVELOPMENT_URL as string,
      process.env.PRODUCTION_FRONTEND_URL as string,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // credentials: true,
  })
);

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running on port 5000");
});

try {
  initRepositories();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.log("DB connection failed:", err);
}
