import { UserController } from "./controller/UserController";
import express, { Request, Response } from "express";
import cors from "cors";

import { PostController } from "./controller/PostController";
import { userRouter } from "./router/userRouter";
import { postsRouter } from "./router/postsRouter";
import { likeRouter } from "./router/likeRouter";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json());

app.use(cors());
app.listen(Number(process.env.PORT || 3003), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

// app.get("/ping", (req: Request, res: Response) => {
//   res.send("Pong!");
// });

// -------------------------------CRUD USERS---------------------

app.use("/users",userRouter)

// // ---------------------------CRUD POSTS ----------------------------------------

app.use("/posts",postsRouter)

// ------------------- CRUD LIKES / DISLIKES ------------

app.use("/likes",likeRouter)

