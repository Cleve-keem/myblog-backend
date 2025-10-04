import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import {
  UserLoginRequest,
  UserSignUpRequest,
} from "../dtos/requests/UserRequest.dtos";
import hashPassword from "../utils/hashPassword";
import * as bcrypt from "bcrypt";
import { Status } from "../dtos/responses/UserResponse.dto";
import { UserRepository } from "../data/repository/UserRepository";
import jwt, { JwtPayload } from "jsonwebtoken";
import MailService from "../services/mailService";

const SECRET = process.env.JWT_SECRETKEY as string;

export class UserController {
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
        isVerified: false,
        createdAt: new Date(),
      });

      if (response.status === Status.FAILURE) {
        return res.status(400).json({ response });
      }

      let token = jwt.sign({ id: response.id, email }, SECRET, {
        expiresIn: "1h",
      });

      // send a mail
      MailService.sendVerificationMail({ email, lastname }, token).catch(
        (error) => console.log("error", error)
      );

      console.log("Mail sent from controller");
      return res.json({
        status: Status.SUCCESS,
        message: `${response.message}. Please verify your email.`,
      });
    } catch (error) {
      console.error("Register error:", error);
      return res
        .status(500)
        .json({ status: Status.FAILURE, message: "Internal server error" });
    }
  }

  public static verifyUser(req: Request, res: Response) {
    // const token = req.headers["authorization"]?.split(" ")[1];
    const { id: token } = req.params;
    if (!token) return res.status(401).json("Missing token");

    try {
      const decode = jwt.verify(token, SECRET) as JwtPayload;
      return res.status(201).json({ decode });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Failed to verify user" });
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
        return res.status(401).json({
          status: Status.FAILURE,
          message: "Invalid email or password!",
        });
      }

      return res.status(200).json({
        status: Status.SUCCESS,
        message: "Login successful",
      });
    } catch (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ status: Status.FAILURE, message: "Internal server error" });
    }
  }
}
