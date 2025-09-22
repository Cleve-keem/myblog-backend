import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
router.post("/auth/sign-up", UserController.registerUser);
router.post("/auth/login", UserController.loginUser);

export default router;
