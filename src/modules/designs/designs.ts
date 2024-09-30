import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
import * as fs from "fs"
import path from "path"
import axios from "axios"
dotenv.config();

export class DesignsController {
  static async GetAllDesigns(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let response = await canva.get("/designs", {params: req.query})

        res.status(200).send({
            success: true,
            message: "Designlar olindi",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetDesignById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { designId } = req.query

        let response = await canva.get(`/designs/${designId}`)

        res.status(200).send({
            success: true,
            message: "Design olindi",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetDesignImportJobById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { jobId } = req.query

        let response = await canva.get(`/imports/${jobId}`)

        res.status(200).send({
            success: true,
            message: "Design import job retrieved successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetDesignExportJobById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { exportId } = req.query

        let response = await canva.get(`/exports/${exportId}`)

        res.status(200).send({
            success: true,
            message: "Design import job retrieved successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateDesign(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      const response = await canva.post("/designs", req.body);

      res.status(201).send({
        success: true,
        message: "Design created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }

  static async CreateDesignExportJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      const response = await canva.post("/exports", req.body);

      res.status(201).send({
        success: true,
        message: "Design export created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || 500));
    }
  }


  static async CreateDesignImportJob(
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
          title_base64: Buffer.from(file.originalname).toString("base64"),
          mime_type: file.mimetype
        };
      }

      const response = await axios.post(
        "https://api.canva.com/rest/v1/imports",
        fs.createReadStream(filePath),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Length': fs.statSync(filePath).size,
            'Content-Type': 'application/octet-stream',
            'Import-Metadata': JSON.stringify(metadata),
          },
        }
      );

      res.status(201).send({
        success: true,
        message: "Design import created successfully",
        data: response.data,
      });

      fs.unlinkSync(filePath);
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.response?.status || error.status));
    }
  }



}