import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { error } from "console";

const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

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
        const { id, name, email, password,role } = req.body;

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

          if ( role !== "normal" && "admin") {
            res.statusCode = 404;
            throw new Error("Role precisa ser admin ou normal");
          }

          const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            role:role
          };

          await db("users").insert(newUser)

const [isID] = await db.select("id").from("users").where({id:id})

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
    }
)




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

// ---------------------------edit by id ----------------------------------------

app.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newCreatorId = req.body.creator_id;
    const newContent = req.body.content;
    const newLikes = req.body.newLikes;
    const newDislikesNumbers = req.body.dislikes_numbers

    if (newId !== undefined) {
        if(typeof newId !== "string"){
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
          throw new Error(
            "'creator' deve possuir no mínimo 2 caracteres"
          );
        }
      }

      if (newContent !== undefined) {
        if (typeof newContent !== "string") {
          res.status(400);
          throw new Error("'Conteudo' deve ser string");
        }
  
        if (newContent.length < 2) {
          res.status(400);
          throw new Error(
            "'COnteuto' deve possuir no mínimo 2 caracteres"
          );
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

      const [posts] = await db("posts").where({id:id})

      if(posts){
        const updatedPost = {
            id: newId || posts.id,
            creator_id: newCreatorId || posts.creator_id,
            content : newContent || posts.content,
            likes : newLikes || posts.likes,
            dislikes_numbers : newDislikesNumbers || posts.dislikes_numbers
        }
        await db("posts").update(updatedPost).where({ id: id });
      }else{
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
        const idToDelete = req.params.id as string

        const [posts] = await db("posts").where({id:idToDelete})
        
        if(!posts){
            res.status(404)
            throw new Error("'id' não encotrada")
        }

        await db("posts").del().where({id:idToDelete})
        res.status(200).send({ message: "Post  deletado com sucesso" });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          } else {
            res.status(500).send("Erro inesperado");
          }
    }
})
