import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
dotenv.config();

export class UsersController {
  static async GetMe(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let response = await canva.get("/users/me");

      res.status(200).send({
        success: true,
        message: "Me retrieved successfully",
        data: response.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let response = await canva.get("/users/me/profile");

      res.status(200).send({
        success: true,
        message: "Profile retrieved successfully",
        data: response.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

}
