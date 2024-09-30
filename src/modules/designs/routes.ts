import { createDesignDTO, createDesignExportJobDTO, getDesignByIdDto, getDesignExportJobByIdDto, getDesignImportJobByIdDto, validate } from "@middlewares"
import { DesignsController } from "./designs"
import { upload } from "@config"

const { Router } = require("express")

const DesignsRouter = Router()

DesignsRouter
    .get("/all", DesignsController.GetAllDesigns)
    .get("/design-import-job-by-id", validate(getDesignImportJobByIdDto, "query"), DesignsController.GetDesignImportJobById)
    .get("/design-export-job-by-id", validate(getDesignExportJobByIdDto, "query"), DesignsController.GetDesignExportJobById)
    .get("/get-by-id", validate(getDesignByIdDto, "query"), DesignsController.GetDesignById)
    .post("/create", validate(createDesignDTO), DesignsController.CreateDesign)
    .post("/create-design-import", upload.single("file"), DesignsController.CreateDesignImportJob)
    .post("/create-design-export", validate(createDesignExportJobDTO), DesignsController.CreateDesignExportJob)

export {DesignsRouter}