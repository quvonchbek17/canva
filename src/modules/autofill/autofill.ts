import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
dotenv.config();

export class AutofillController {

    static async GetDesignAutofillJobById(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const token = req.headers.access_token as string;
          const canva = canvaBuilder(token);

          let { jobId } = req.query

          const response = await canva.get(`/autofills/${jobId}`);

          res.status(200).send({
            success: true,
            message: "Design autofill retrieved successfully",
            data: response.data,
          });
        } catch (error: any) {
          next(new ErrorHandler(error.message, error.response?.status || 500));
        }
      }

  static async CreateDesignAutofillJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      const response = await canva.post("/autofills", req.body);

      res.status(200).send({
        success: true,
        message: "Design autofill created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }
}
