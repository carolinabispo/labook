import { PostController } from './../controller/PostController';
import express from "express"

export const postsRouter = express.Router()

const postsController = new PostController()

postsRouter.get("/",postsController.getPosts)
postsRouter.post("/",postsController.createPosts)
postsRouter.put("/:id",postsController.updatePosts)
postsRouter.delete("/:id",postsController.deletePosts)
