import { Request, Response } from "express";
import { PostBussiness } from "../bussiness/PostBussiness";
import { BaseError } from "../errors/BaseError";

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
      const input = {
        id: req.body.id,
        creator_id: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes_numbers: req.body.dislikes_numbers,
      };

      const postBussiness = new PostBussiness();
      const response = await postBussiness.createPosts(input);

      res.status(201).send(response);
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

  public updatePosts = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
        creator_id: req.body.creatorId,
        content: req.body.content,
        likes: req.body.likes,
        dislikes_numbers: req.body.dislikesNumbers,
      };

      const postBussiness = new PostBussiness();
      const response = await postBussiness.updatePosts(input);

      res.status(201).send({ message: "atualizado com sucesso", response });
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

  public deletePosts = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
      };
      const postBussiness = new PostBussiness();
      const response = await postBussiness.deletePosts(input);

      res.status(200).send(`Post deletado com sucesso!!`);
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
}
