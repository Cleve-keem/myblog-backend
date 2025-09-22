import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import initRepositories from "./src/utils/database.stater";
import userRoutes from "./src/routers/userRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 hour,
  })
);

app.use("/auth", userRoutes);

try {
  initRepositories();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.log("DB connection failed:", err);
}
