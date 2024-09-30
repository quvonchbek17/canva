import { AssetsRouter, AuthRouter, BrandTemplatesRouter, CommentsRouter, DesignsRouter, FoldersRouter, UsersRouter } from "@modules"
import { AutofillRouter } from "src/modules/autofill"

const { Router } = require("express")

const router = Router()

router.use("/auth", AuthRouter)
router.use("/designs", DesignsRouter)
router.use("/brand-templates", BrandTemplatesRouter)
router.use("/folders", FoldersRouter)
router.use("/comments", CommentsRouter)
router.use("/assets", AssetsRouter)
router.use("/autofills", AutofillRouter)
router.use("/users", UsersRouter)

export default router