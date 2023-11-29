import { CreateLikeSchema } from './../dtos/createLike.dto';
import { Request, Response, response } from 'express';
import { LikeBussiness } from '../bussiness/LikeBussiness';
import { BaseError } from '../errors/BaseError';
import { ZodError } from 'zod';
export class LikeController {

  constructor(
    private likeBussiness: LikeBussiness
  ){}

  public getLikesDilikes = async (req: Request, res: Response) => {
    try {
        const input = {
            q: req.query.q as string | undefined
        }

        const response = await this.likeBussiness.getLike(input)

        res.status(200).send(response)
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
  }

  public createLikes =async (req: Request, res: Response) => {
    
try {
   const input = CreateLikeSchema.parse({
    likeId: req.body.likeId,
    userId: req.body.userId,
    postId: req.body.postId,
    like: req.body.like
   })

   const output = await this.likeBussiness.createLike(input)

   res.status(201).send(output)



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

  }

}