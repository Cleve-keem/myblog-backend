import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";
import {
  UserLoginRequest,
  UserSignUpRequest,
} from "../dtos/requests/UserRequest.dtos";
import { User } from "../data/model/User";
import hashPassword from "../utils/hashPassword";
import * as bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    user?: string;
  }
}

export class UserController {
  public static async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { firstname, lastname, email, password }: UserSignUpRequest =
      req.body;

    const hashedPassword = await hashPassword(password);

    try {
      const response = await UserService.createUser({
        firstname,
        lastname,
        email,
        hashedPassword,
        createdAt: new Date(),
      });

      req.session.user = firstname + " " + lastname;
      res.status(200).json({ ...response, user: req.session.user });
    } catch (error) {
      return next(error);
    }
  }

  public static async loginUser(
    req: Request,
    res: Response
    // next: NextFunction
  ): Promise<void> {
    try {
      const { email, password }: UserLoginRequest = req.body;
      const user: User = await UserService.getUserByEmail(email);

      if (!user) {
        throw "User doesn't exit";
      }

      const isMatch: Boolean = await bcrypt.compare(
        password,
        user?.hashedPassword
      );

      if (!isMatch) {
        throw "Invalid Credentials";
      }

      res.status(200).json({ status: "success", message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "failure",
        message: "Login failed",
      });
    }
  }
}
