import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
dotenv.config();

export class CommentsController {
  static async GetDesignComments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { designId } = req.query

        let response = await canva.get(`https:/designs/${designId}/comments`)

        res.status(200).send({
            success: true,
            message: "Design comments retrieved successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetCommentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { designId, commentId } = req.query

        let response = await canva.get(`/designs/${designId}/comments/${commentId}`)

        res.status(200).send({
            success: true,
            message: "Comment retrieved successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let response = await canva.post(`/comments`, req.body)

        res.status(200).send({
            success: true,
            message: "Design comment created successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateReply(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const canva = canvaBuilder(token);

        let { commentId, ...body } = req.body

        let response = await canva.post(`/comments/${commentId}/replies`, body)

        res.status(200).send({
            success: true,
            message: "Comment reply created successfully",
            data: response.data
        })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}