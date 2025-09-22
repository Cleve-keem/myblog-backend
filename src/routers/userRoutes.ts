import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
router.post("/auth/sign-up", UserController.registerUser);

export default router;
