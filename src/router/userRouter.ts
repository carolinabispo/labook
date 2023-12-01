import { UserBussiness } from '../bussiness/UserBussiness';
import { UserDatabase } from '../database/UserDatabase';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/idGenerator';
import { UserController } from './../controller/UserController';
import express from 'express'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBussiness(
        new UserDatabase,
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
        )
)

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.createUsers)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.put("/:id", userController.updateUsers)
userRouter.delete("/:id", userController.deleteUsers)