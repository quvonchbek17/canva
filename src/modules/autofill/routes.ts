import { createAutofillDTO, getDesignAutofillDTO, validate } from "@middlewares"
import { AutofillController } from "./autofill"

const { Router } = require("express")

const AutofillRouter = Router()


AutofillRouter
    .get("/get-by-id", validate(getDesignAutofillDTO, "query"), AutofillController.GetDesignAutofillJobById)
    .post("/create-design-autofill-job", validate(createAutofillDTO), AutofillController.CreateDesignAutofillJob)

export {AutofillRouter}