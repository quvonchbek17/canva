import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
import axios from "axios";
import * as fs from "fs";
import path from "path";
dotenv.config();

export class AssetsController {
  static async CreateAssetUploadJob(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;

      const file = req.file as Express.Multer.File | undefined;
      let filePath = "";
      let metadata = {};
      if (file) {
        filePath = path.join(process.cwd(), "uploads", file.fieldname);
        metadata = {
          name_base64: Buffer.from(file.originalname).toString("base64"),
        };
      }

      // Axios POST request to Canva API
      const response = await axios.post(
        "https://api.canva.com/rest/v1/asset-uploads",
        fs.createReadStream(filePath),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/octet-stream",
            "Asset-Upload-Metadata": JSON.stringify(metadata),
            "Content-Length": fs.statSync(filePath).size,
          },
        }
      );

      res.status(201).send({
        success: true,
        message: "Asset uploaded successfully",
        data: response.data,
      });

      fs.unlinkSync(filePath);
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || error.status));
    }
  }


  static async GetAssetUploadJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token)

        let { jobId } = req.query

        let response = await canva.get(`/asset-uploads/${jobId}`)

        res.status(201).send({
          success: true,
          message: "Asset upload retrieved successfully",
          data: response.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.response?.status || error.status));
      }
  }

  static async GetAssetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token)

        let { assetId } = req.query

        let response = await canva.get(`/assets/${assetId}`)

        res.status(201).send({
          success: true,
          message: "Asset retrieved successfully",
          data: response.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.response?.status || error.status));
      }
  }

  static async UpdateAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token)

        let { assetId, ...body } = req.body

        let response = await canva.patch(`/assets/${assetId}`, body)

        res.status(201).send({
          success: true,
          message: "Asset updated successfully",
          data: response.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.response?.status || error.status));
      }
  }

  static async DeleteAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token)

        let { assetId } = req.body

        let response = await canva.delete(`/assets/${assetId}`)

        res.status(201).send({
          success: true,
          message: "Asset deleted successfully",
          data: response.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.response?.status || error.status));
      }
  }
}
