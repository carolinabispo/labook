import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

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

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.select("*").from("users");
    res.status(200).send(result);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, role } = req.body;

    if (typeof id !== "string") {
      res.statusCode = 404;
      throw new Error("ID invalido");
    }

    if (name.length < 3) {
      res.statusCode = 404;
      throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
    }

    if (typeof name !== "string") {
      res.statusCode = 404;
      throw new Error("Nome de usuário invalido");
    }

    if (typeof email !== "string") {
      res.statusCode = 404;
      throw new Error("Email invalido");
    }

    if (typeof password !== "string") {
      res.statusCode = 404;
      throw new Error("Senha invalida");
    }

    if (typeof role !== "string") {
      res.statusCode = 404;
      throw new Error("Role invalida");
    }

    if (role !== "normal" && "admin") {
      res.statusCode = 404;
      throw new Error("Role precisa ser admin ou normal");
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
      role: role,
    };

    await db("users").insert(newUser);

    const [isID] = await db.select("id").from("users").where({ id: id });

    if (!isID) {
      res.status(404);
      throw new Error("id invalido");
    } else {
      newUser;

      res.status(201).send("Usuário criado com sucesso");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newRole = req.body.role;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 2) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 2 caracteres");
      }
    }

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }
    }

    if (newRole !== undefined) {
      if (typeof newRole !== "string") {
        res.status(400);
        throw new Error("'Role' deve ser number");
      }

      // if (newRole.toLowerCase() !== "NORMAL" || "ADMIN") {
      //   res.status(400);
      //   throw new Error("'role' deve ser ser 'admin' ou 'normal'");
      // }
    }

    const [user] = await db.select("*").from("users").where({ id: id });

    if (user) {
      await db
        .update({
          id: newId || user.id,
          name: newName || user.name,
          email: newEmail || user.email,
          password: newPassword || user.password,
          role: newRole || user.role,
        })
        .from("users")
        .where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

// ---------------------------CRUD POSTS ----------------------------------------
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const result = await db.select("*").from("posts");
    res.status(200).send(result);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/posts", async (req: Request, res: Response) => {
  try {
    const { id, creator_id, content, likes, dislikes_numbers } = req.body;

    if (typeof id !== "string") {
      res.statusCode = 404;
      throw new Error("ID invalido");
    }

    if (creator_id < 3) {
      res.statusCode = 404;
      throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
    }

    if (typeof content !== "string") {
      res.statusCode = 404;
      throw new Error("Conteúdo inválido");
    }

    if (typeof likes !== "number") {
      res.statusCode = 404;
      throw new Error("likes deve ser número");
    }
    if (likes < 0) {
      res.statusCode = 404;
      throw new Error("likes não pode ser negativo");
    }

    if (typeof dislikes_numbers !== "number") {
      res.statusCode = 404;
      throw new Error("dislikesNumbers invalida");
    }

    const newPost = {
      id: id,
      creator_id: creator_id,
      content: content,
      likes: likes,
      dislikes_numbers: dislikes_numbers,
    };

    await db("posts").insert(newPost);

    const [isID] = await db.select("id").from("posts").where({ id: id });

    if (!isID) {
      res.status(404);
      throw new Error("id invalido");
    } else {
      newPost;

      res.status(201).send("Novo post criado com sucesso");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newCreatorId = req.body.creator_id;
    const newContent = req.body.content;
    const newLikes = req.body.newLikes;
    const newDislikesNumbers = req.body.dislikes_numbers;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }
      if (newId.length < 3) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 3 caractere");
      }
    }

    if (newCreatorId !== undefined) {
      if (typeof newCreatorId !== "string") {
        res.status(400);
        throw new Error("'creator' deve ser string");
      }

      if (newCreatorId.length < 2) {
        res.status(400);
        throw new Error("'creator' deve possuir no mínimo 2 caracteres");
      }
    }

    if (newContent !== undefined) {
      if (typeof newContent !== "string") {
        res.status(400);
        throw new Error("'Conteudo' deve ser string");
      }

      if (newContent.length < 2) {
        res.status(400);
        throw new Error("'COnteuto' deve possuir no mínimo 2 caracteres");
      }
    }

    if (newLikes !== undefined) {
      if (typeof newLikes !== "number") {
        res.status(400);
        throw new Error("'Likes' deve ser string");
      }
      if (newLikes < 0) {
        res.status(400);
        throw new Error("'Likes' não pode ser negativo");
      }
    }

    if (newDislikesNumbers !== undefined) {
      if (typeof newDislikesNumbers !== "number") {
        res.status(400);
        throw new Error("'Dislikes' deve ser string");
      }
      if (newDislikesNumbers < 0) {
        res.status(400);
        throw new Error("'Dislikes' não pode ser negativo");
      }
    }

    const [posts] = await db("posts").where({ id: id });

    if (posts) {
      const updatedPost = {
        id: newId || posts.id,
        creator_id: newCreatorId || posts.creator_id,
        content: newContent || posts.content,
        likes: newLikes || posts.likes,
        dislikes_numbers: newDislikesNumbers || posts.dislikes_numbers,
      };
      await db("posts").update(updatedPost).where({ id: id });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.delete("/posts/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id as string;

    const [posts] = await db("posts").where({ id: idToDelete });

    if (!posts) {
      res.status(404);
      throw new Error("'id' não encotrada");
    }

    await db("posts").del().where({ id: idToDelete });
    res.status(200).send({ message: "Post  deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});
