import { getAllBrandTemplatesDTO, getBrandTemplateByIdDTO, getBrandTemplateDatasetDTO, getDesignByIdDto, validate } from "@middlewares"
import { BrandTemplatesController } from "./brandTemplates"

const { Router } = require("express")

const BrandTemplatesRouter = Router()


BrandTemplatesRouter
    .get("/all", validate(getAllBrandTemplatesDTO, "query"), BrandTemplatesController.GetAllBrandTemplates)
    .get("/get-by-id", validate(getBrandTemplateByIdDTO, "query"), BrandTemplatesController.GetBrandTemplateById)
    .get("/dataset", validate(getBrandTemplateDatasetDTO, "query"), BrandTemplatesController.GetBrandTemplateDataset)

export {BrandTemplatesRouter}