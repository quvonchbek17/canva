import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
dotenv.config();

export class BrandTemplatesController {
  static async GetAllBrandTemplates(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      const response = await canva.get("/brand-templates", {params: req.query});

      res.status(200).send({
        success: true,
        message: "Brand templates retrieved successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }

  static async GetBrandTemplateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { brandTemplateId } = req.query

      const response = await canva.get(`/brand-templates/${brandTemplateId}`);

      res.status(200).send({
        success: true,
        message: "Brand template by id retrieved successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }

  static async GetBrandTemplateDataset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { brandTemplateId } = req.query

      const response = await canva.get(`/brand-templates/${brandTemplateId}/dataset`);

      res.status(200).send({
        success: true,
        message: "Brand template dataset retrieved successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }

}
