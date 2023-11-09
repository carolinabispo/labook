import { UserController } from './controller/UserController';
import express, { Request, Response } from "express";
import cors from "cors";
// import { db } from "./database/BaseDatabase";
import { TPosts, TUserDB } from "./types";
import { User } from "./models/Users";
import { Post } from "./models/Posts";
import { UserDatabase } from "./database/UserDatabese";

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

const userController = new UserController()
app.get("/users",userController.getUsers)
app.post("/users", userController.createUsers)
app.put("/users/:id", userController.updateUsers)
app.delete("/users/:id", userController.deleteUsers)




// // ---------------------------CRUD POSTS ----------------------------------------
// app.get("/posts", async (req: Request, res: Response) => {
//   try {
//     // const result = await db.select("*").from("posts");
//     // res.status(200).send(result);
//     const q = req.params.q;

//     let postsDB;

//     if (q) {
//       const result: TPosts[] = await db("posts").where(
//         "creator_id",
//         "LIKE",
//         `%${q}%`
//       );
//       postsDB = result;
//     } else {
//       const result: TPosts[] = await db("posts");
//       postsDB = result;
//     }

//     const post: Post[] = postsDB.map(
//       (postDB) =>
//         new Post(
//           postDB.id,
//           postDB.creator_id,
//           postDB.content,
//           postDB.likes,
//           postDB.dislikes_numbers,
//           postDB.created_at,
//           postDB.updated_at
//         )
//     );
//     res.status(200).send(post);
//   } catch (error) {
//     if (req.statusCode === 200) {
//       res.status(500);
//     }

//     if (error instanceof Error) {
//       res.send(error.message);
//     } else {
//       res.send("Erro inesperado");
//     }
//   }
// });

// app.post("/posts", async (req: Request, res: Response) => {
//   try {
//     const { id, creator_id, content, likes, dislikes_numbers} = req.body;

//     if (typeof id !== "string") {
//       res.statusCode = 404;
//       throw new Error("ID invalido");
//     }

//     if (creator_id < 3) {
//       res.statusCode = 404;
//       throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
//     }

//     if (typeof content !== "string") {
//       res.statusCode = 404;
//       throw new Error("Conteúdo inválido");
//     }

//     if (typeof likes !== "number") {
//       res.statusCode = 404;
//       throw new Error("likes deve ser número");
//     }
//     if (likes < 0) {
//       res.statusCode = 404;
//       throw new Error("likes não pode ser negativo");
//     }

//     if (typeof dislikes_numbers !== "number") {
//       res.statusCode = 404;
//       throw new Error("dislikesNumbers invalida");
//     }

//     const [postDBExist]: TPosts[] | undefined[] = await db("posts").where({
//       id,
//     });
//     if (postDBExist) {
//       res.status(400);
//       throw new Error("'id' já existe");
//     }

//     const post = new Post(
//       id,
//       creator_id,
//       content,
//       likes,
//       dislikes_numbers, 
//       new Date().toISOString()
//       ,
//       new Date().toISOString()

//     );

//     const newPost : TPosts={
//       id: post.getId(),
//       creator_id:post.getCreatorId(),
//       content:post.getContent(),
//       likes:post.getLikes(),
//       dislikes_numbers:post.getDislikes(),
//       created_at:post.getCreatedAt(),
//       updated_at:post.getUpdatedAt()
//     }
//     await db("posts").insert(newPost)
//     const [ postDB ]: TPosts[] = await db("posts").where({ id })

//     res.status(201).send(postDB)
//   } catch (error) {
//     if (error instanceof Error) {
//       res.send(error.message);
//     } else {
//       res.send("Erro inesperado");
//     }
//   }
// });

// app.put("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     const newId = req.body.id;
//     const newCreatorId = req.body.creator_id;
//     const newContent = req.body.content;
//     const newLikes = req.body.newLikes;
//     const newDislikesNumbers = req.body.dislikes_numbers;

//     if (newId !== undefined) {
//       if (typeof newId !== "string") {
//         res.status(400);
//         throw new Error("'id' deve ser string");
//       }
//       if (newId.length < 3) {
//         res.status(400);
//         throw new Error("'id' deve possuir no mínimo 3 caractere");
//       }
//     }

//     if (newCreatorId !== undefined) {
//       if (typeof newCreatorId !== "string") {
//         res.status(400);
//         throw new Error("'creator' deve ser string");
//       }

//       if (newCreatorId.length < 2) {
//         res.status(400);
//         throw new Error("'creator' deve possuir no mínimo 2 caracteres");
//       }
//     }

//     if (newContent !== undefined) {
//       if (typeof newContent !== "string") {
//         res.status(400);
//         throw new Error("'Conteudo' deve ser string");
//       }

//       if (newContent.length < 2) {
//         res.status(400);
//         throw new Error("'COnteuto' deve possuir no mínimo 2 caracteres");
//       }
//     }

//     if (newLikes !== undefined) {
//       if (typeof newLikes !== "number") {
//         res.status(400);
//         throw new Error("'Likes' deve ser string");
//       }
//       if (newLikes < 0) {
//         res.status(400);
//         throw new Error("'Likes' não pode ser negativo");
//       }
//     }

//     if (newDislikesNumbers !== undefined) {
//       if (typeof newDislikesNumbers !== "number") {
//         res.status(400);
//         throw new Error("'Dislikes' deve ser string");
//       }
//       if (newDislikesNumbers < 0) {
//         res.status(400);
//         throw new Error("'Dislikes' não pode ser negativo");
//       }
//     }

//     // const [posts] = await db("posts").where({ id: id });
//     const [posts]:TPosts[] | undefined[] = await db("posts").where({id})

//     if (posts) {
//       const updatedPost = {
//         id: newId || posts.id,
//         creator_id: newCreatorId || posts.creator_id,
//         content: newContent || posts.content,
//         likes: newLikes || posts.likes,
//         dislikes_numbers: newDislikesNumbers || posts.dislikes_numbers,
//       };
//       await db("posts").update(updatedPost).where({ id: id });
//     } else {
//       res.status(404);
//       throw new Error("'id' não encontrada");
//     }

//     res.status(200).send({ message: "Atualização realizada com sucesso" });

//   } catch (error) {
//     if (error instanceof Error) {
//       res.send(error.message);
//     } else {
//       res.send("Erro inesperado");
//     }
//   }
// });

// app.delete("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const idToDelete = req.params.id as string;

//     const [posts]: TPosts[] | undefined[] = await db("posts").where({ id: idToDelete });

//     if (!posts) {
//       res.status(404);
//       throw new Error("'id' não encotrada");
//     }

//     await db("posts").del().where({ id: idToDelete });
//     res.status(200).send({ message: "Post  deletado com sucesso" });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(500).send("Erro inesperado");
//     }
//   }
// });
