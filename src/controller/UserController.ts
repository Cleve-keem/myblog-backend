import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";
import {
  UserLoginRequest,
  UserSignUpRequest,
} from "../dtos/requests/UserRequest.dtos";
import { User } from "../data/model/User";
import hashPassword from "../utils/hashPassword";
import * as bcrypt from "bcrypt";
import { Status } from "../dtos/responses/UserResponse.dto";
import { UserRepository } from "../data/repository/UserRepository";

declare module "express-session" {
  interface SessionData {
    user?: string;
  }
}

export class UserController {
  // public static async registerUser(
  //   req: Request,
  //   res: Response
  //   // next: NextFunction
  // ) {
  //   const { firstname, lastname, email, password }: UserSignUpRequest =
  //     req.body;

  //   const hashedPassword = await hashPassword(password);

  //   try {
  //     const response = await UserService.createUser({
  //       firstname,
  //       lastname,
  //       email,
  //       hashedPassword,
  //       createdAt: new Date(),
  //     });

  //     req.session.user = firstname + " " + lastname;
  //     res.status(200).json({ ...response, user: req.session.user });
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ status: "failure", message: "Internal error", error });
  //   }
  // }

  // public static async loginUser(
  //   req: Request,
  //   res: Response
  //   // next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const { email, password }: UserLoginRequest = req.body;
  //     const user: User = await UserService.getUserByEmail(email);

  //     if (!user) {
  //       throw "User doesn't exit";
  //     }

  //     const isMatch: Boolean = await bcrypt.compare(
  //       password,
  //       user?.hashedPassword
  //     );

  //     if (!isMatch) {
  //       throw "Invalid Credentials";
  //     }

  //     res.status(200).json({ status: "success", message: "Login successful" });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(400).json({
  //       status: "failure",
  //       message: "Login failed",
  //     });
  //   }
  // }
  // UserController.ts (recommended)
  public static async registerUser(req: Request, res: Response) {
    const { firstname, lastname, email, password }: UserSignUpRequest =
      req.body;

    try {
      const hashedPassword = await hashPassword(password);
      const response = await UserService.createUser({
        firstname,
        lastname,
        email,
        hashedPassword,
        createdAt: new Date(),
      });

      // attach session
      req.session.user = `${firstname} ${lastname}`;

      // send the repository response but also include the session user if success
      return res
        .status(response.status === Status.SUCCESS ? 201 : 400)
        .json({ ...response, user: req.session.user });
    } catch (error) {
      console.error("Register error:", error);
      return res
        .status(500)
        .json({ status: Status.FAILURE, message: "Internal server error" });
    }
  }

  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password }: UserLoginRequest = req.body;
      const user = await UserRepository.findUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ status: Status.FAILURE, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        return res
          .status(401)
          .json({ status: Status.FAILURE, message: "Invalid credentials" });
      }

      // success: set session and return minimal user info
      req.session.user = `${user.firstname} ${user.lastname}`;
      return res.status(200).json({
        status: Status.SUCCESS,
        message: "Login successful",
        user: req.session.user,
      });
    } catch (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ status: Status.FAILURE, message: "Internal server error" });
    }
  }
}
