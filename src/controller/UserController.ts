import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { UserSignUpRequest } from "../dtos/requests/UserRequest.dtos";

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

    try {
      const response = await UserService.createUser({
        firstname,
        lastname,
        email,
        password,
        createdAt: new Date(),
      });

      req.session.user = firstname + " " + lastname;
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
