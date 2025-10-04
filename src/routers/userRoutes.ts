import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
router.post("/account/sign-up", UserController.registerUser);
router.post("/account/login", UserController.loginUser);

export default router;