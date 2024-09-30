import { deleteAssetDTO, getAssetByIdDTO, getAssetUploadJobDTO, updateAssetDTO, validate } from "@middlewares"
import { AssetsController } from "./assets"
import { upload } from "src/config/multer"

const { Router } = require("express")

const AssetsRouter = Router()

AssetsRouter
    .get("/asset-upload-job", validate(getAssetUploadJobDTO, "query"), AssetsController.GetAssetUploadJob)
    .get("/get-by-id", validate(getAssetByIdDTO, "query"), AssetsController.GetAssetById)
    .post("/upload", upload.single("file"), AssetsController.CreateAssetUploadJob)
    .patch("/update", validate(updateAssetDTO), AssetsController.UpdateAsset)
    .delete("/delete", validate(deleteAssetDTO), AssetsController.DeleteAsset)

export {AssetsRouter}