import { UserController } from './../controller/UserController';
import express from 'express'

export const userRouter = express.Router()

const userController = new UserController()

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.createUsers)
userRouter.put("/:id", userController.updateUsers)
userRouter.delete("/:id", userController.deleteUsers)