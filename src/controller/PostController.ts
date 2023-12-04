import { PostBussiness } from "./../bussiness/PostBussiness";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { EditPostSchema } from "../dtos/post/editPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { log } from "console";
import { GetPlaylistsSchema } from "../dtos/post/getPost.dto";

export class PostController {
  constructor(
    private postBussiness: PostBussiness
    ) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPlaylistsSchema.parse({
        token: req.headers.authorization,
      });

      const response = await this.postBussiness.getPosts(input);

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
      const input = CreatePostSchema.parse({
        // // id: req.body.id,
        // // creatorId: req.body.creatorId,
        // content: req.body.content,
        // // likes: req.body.likes,
        // // dislikesNumbers: req.body.dislikesNumbers,
        // token: req.headers.authorization
        content: req.body.content,
        token: req.headers.authorization,
      });

      console.log(req.headers);

      // const output = await this.postBussiness.createPosts(input);
      const output = await this.postBussiness.createPosts(input);

      res.status(201).send({ message: "post criado com sucesso", output });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updatePosts = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        idToEdit: req.params.id,
        // id: req.body.id,
        // creator_id: req.body.creatorId,
        content: req.body.content,
        likes: req.body.likes,
        dislike: req.body.dislike,
        token: req.headers.authorization,
      });

      const output = await this.postBussiness.updatePosts(input)

      res.status(200).send({message:'editado com sucesso',output})


    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }

    //   try {
    //     const input = EditPostSchema.parse({
    //       idToEdit: req.params.id,
    //       id: req.body.id,
    //       creator_id: req.body.creatorId,
    //       content: req.body.content,
    //       likes: req.body.likes,
    //       dislikes_numbers: req.body.dislikesNumbers,
    //     })

    //     const response = await this.postBussiness.updatePosts(input);

    //     res.status(201).send({ message: "atualizado com sucesso", response });

    //   } catch (error) {
    //     console.log(error)

    //     if (error instanceof ZodError) {
    //        res.status(400).send(error.issues)
    //     } else if (error instanceof BaseError) {
    //        res.status(error.statusCode).send(error.message)
    //     } else {
    //        res.status(500).send("Erro inesperado")
    //     }
    //   }
  };

  public deletePosts = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      });

      const response = await this.postBussiness.deletePosts(input);

      res.status(200).send({ message: "Excluído com sucesso", response });
      console.log(response);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
