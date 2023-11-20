import { CreatePostSchema } from '../dtos/createPost.dto';
import { Request, Response } from "express";
import { PostBussiness } from "../bussiness/PostBussiness";
import { BaseError } from "../errors/BaseError";
import { ZodError } from 'zod';
import { EditPostSchema } from '../dtos/editPost.dto';
import { DeletePostSchema } from '../dtos/deletePost.dto';
import { log } from 'console';

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q as string | undefined,
      };

      const postBussiness = new PostBussiness();
      const response = await postBussiness.getPosts(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPosts = async (req: Request, res: Response) => {
    try {
      // const input = {
      //   id: req.body.id,
      //   creator_id: req.body.creator_id,
      //   content: req.body.content,
      //   likes: req.body.likes,
      //   dislikes_numbers: req.body.dislikes_numbers,
      // };

      const input = CreatePostSchema.parse({
        id: req.body.id,
        creatorId: req.body.creatorId,
        content: req.body.content,
        likes: req.body.likes,
        dislikesNumbers: req.body.dislikesNumbers,
        // createdAt: req.body.createdAt,
        // updatedAt: req.body.updatedAt
       
      })


      const postBussiness = new PostBussiness();
      const output = await postBussiness.createPosts(input);

      res.status(201).send({message:'Post criado com sucesso',output});

    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
     } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
     } else {
        res.status(500).send("Erro inesperado")
     }
    }
  };

  public updatePosts = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        idToEdit: req.params.id,
        id: req.body.id,
        creator_id: req.body.creatorId,
        content: req.body.content,
        likes: req.body.likes,
        dislikes_numbers: req.body.dislikesNumbers,
      }) 

      const postBussiness = new PostBussiness();
      const response = await postBussiness.updatePosts(input);

      res.status(201).send({ message: "atualizado com sucesso", response });
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
         res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
         res.status(error.statusCode).send(error.message)
      } else {
         res.status(500).send("Erro inesperado")
      }
    }
  };

  public deletePosts = async (req: Request, res: Response) => {
    try {
      // const input = {
      //   id: req.params.id,
      // };

      const input = DeletePostSchema.parse({
        idToDelete: req.params.id
      })

      const postBussiness = new PostBussiness();
      const response = await postBussiness.deletePosts(input);

      res.status(200).send({message:'Excluído com sucesso', response});
      console.log(response);
      

    } catch (error) {

     console.log(error)

      if (error instanceof ZodError) {
         res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
         res.status(error.statusCode).send(error.message)
      } else {
         res.status(500).send("Erro inesperado")
      }
    }
  };
}
