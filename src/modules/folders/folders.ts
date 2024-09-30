import { Request, Response, NextFunction, response } from "express";
import { ErrorHandler } from "@errors";
import dotenv from "dotenv";
import { canvaBuilder } from "@config";
dotenv.config();

export class FoldersController {
  static async GetAllFolders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let response = await canva.get("/folders/root/items");

      let folders = response.data?.items?.filter((el:any) => el.type === "folder")

      res.status(200).send({
        success: true,
        message: "Folders retrieved successfully",
        data: folders
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async GetAllFolderItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { folderId, ...query } = req.query

      let response = await canva.get(`/folders/${folderId}/items`, {params: query});

      res.status(200).send({
        success: true,
        message: "Folder items retrieved successfully",
        data: response.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async GetFolderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { folderId } = req.query

      let response = await canva.get(`/folders/${folderId}`);

      res.status(200).send({
        success: true,
        message: "Folder by id retrieved successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { name, parent_folder_id = "root" } = req.body

      let response = await canva.post("/folders", {
        name,
        parent_folder_id
      });

      res.status(200).send({
        success: true,
        message: "Folder created successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async MoveItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { to_folder_id, item_id } = req.body

      let response = await canva.post("/folders/move", {
        to_folder_id, item_id
      });

      res.status(200).send({
        success: true,
        message: "Item moved successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { folderId, name} = req.body

      let response = await canva.patch(`/folders/${folderId}`, {
        name,
      });

      res.status(200).send({
        success: true,
        message: "Folder updated successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const canva = canvaBuilder(token);

      let { folderId } = req.body

      let response = await canva.delete(`/folders/${folderId}`);

      res.status(200).send({
        success: true,
        message: "Folder deleted successfully",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
