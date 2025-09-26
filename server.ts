import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import initRepositories from "./src/utils/database.stater";
import userRoutes from "./src/routers/userRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hackhimblog.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "defaultsecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour,
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/api", userRoutes);

try {
  initRepositories();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.log("DB connection failed:", err);
}
