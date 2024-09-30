import { UsersController } from "./users"

const { Router } = require("express")

const UsersRouter = Router()

UsersRouter
    .get("/me", UsersController.GetMe)
    .get("/profile", UsersController.GetProfile)

export {UsersRouter}