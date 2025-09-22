import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
router.post("/sign-up", UserController.registerUser);

export default router;
