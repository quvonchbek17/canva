import { createCommentDTO, createReplyDTO, getCommentByIdDTO, validate } from "@middlewares"
import { CommentsController } from "./comments"

const { Router } = require("express")

const CommentsRouter = Router()


CommentsRouter
    .get("/design-comments", CommentsController.GetDesignComments)
    .get("/get-by-id", validate(getCommentByIdDTO, "query"), CommentsController.GetCommentById)
    .post("/create", validate(createCommentDTO), CommentsController.CreateComment)
    .post("/create-reply", validate(createReplyDTO), CommentsController.CreateReply)



export {CommentsRouter}