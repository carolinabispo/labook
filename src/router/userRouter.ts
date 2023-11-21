import { UserBussiness } from '../bussiness/UserBussiness';
import { UserDatabase } from '../database/UserDatabase';
import { UserController } from './../controller/UserController';
import express from 'express'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBussiness(new UserDatabase)
)

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.createUsers)
userRouter.put("/:id", userController.updateUsers)
userRouter.delete("/:id", userController.deleteUsers)