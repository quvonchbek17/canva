import { loginDto, refreshAccessTokenDto, validate } from "@middlewares"
import { AuthController } from "./auth"

const { Router } = require("express")

const AuthRouter = Router()


AuthRouter
    .get("/login", validate(loginDto, "query"), AuthController.Login)
    .post("/refresh-access-token", validate(refreshAccessTokenDto), AuthController.RefreshAccessToken)

export {AuthRouter}