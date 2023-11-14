import { UserController } from "./controller/UserController";
import express, { Request, Response } from "express";
import cors from "cors";

import { PostController } from "./controller/PostController";
import { userRouter } from "./router/userRouter";
import { postsRouter } from "./router/postsRouter";

const app = express();

app.use(express.json());

app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// app.get("/ping", (req: Request, res: Response) => {
//   res.send("Pong!");
// });

// -------------------------------CRUD USERS---------------------

// const userController = new UserController();
// app.get("/users", userController.getUsers);
// app.post("/users", userController.createUsers);
// app.put("/users/:id", userController.updateUsers);
// app.delete("/users/:id", userController.deleteUsers);

app.use("/users",userRouter)

// // ---------------------------CRUD POSTS ----------------------------------------
// const postController = new PostController();

// app.get("/posts", postController.getPosts);
// app.post("/posts", postController.createPosts);
// app.put("/posts/:id", postController.updatePosts);
// app.delete("/posts/:id", postController.deletePosts);

app.use("/posts",postsRouter)


