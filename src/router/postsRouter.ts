import { PostBussiness } from '../bussiness/PostBussiness';
import { PostDataBase } from '../database/PostDatabase';
import { PostController } from './../controller/PostController';
import express from "express"

export const postsRouter = express.Router()

const postsController = new PostController(
    new PostBussiness(new PostDataBase)
)

postsRouter.get("/",postsController.getPosts)
postsRouter.post("/",postsController.createPosts)
postsRouter.put("/:id",postsController.updatePosts)
postsRouter.delete("/:id",postsController.deletePosts)
