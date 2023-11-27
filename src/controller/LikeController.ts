import { Request, Response, response } from 'express';
import { LikeBussiness } from '../bussiness/LikeDislikeBussiness';
import { BaseError } from '../errors/BaseError';
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
}