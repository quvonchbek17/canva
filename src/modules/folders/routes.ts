import {  createFolderDTO, deleteFolderDTO, getAllFolderItemsDTO, getFolderByIdDTO, moveItemDTO, updateFolderDTO, validate } from "@middlewares"
import { FoldersController } from "./folders"

const { Router } = require("express")

const FoldersRouter = Router()

FoldersRouter
    .get("/all", FoldersController.GetAllFolders)
    .get("/get-by-id", validate(getFolderByIdDTO, "query"), FoldersController.GetFolderById)
    .get("/folder-items", validate(getAllFolderItemsDTO, "query"), FoldersController.GetAllFolderItems)
    .post("/create", validate(createFolderDTO), FoldersController.CreateFolder)
    .post("/move-item", validate(moveItemDTO), FoldersController.MoveItem)
    .patch("/update", validate(updateFolderDTO), FoldersController.UpdateFolder)
    .delete("/delete", validate(deleteFolderDTO), FoldersController.DeleteFolder)

export {FoldersRouter}