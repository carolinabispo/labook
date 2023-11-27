import { LikeDatabase } from './../database/LikeDatabase';
import  express  from 'express';
import { LikeController } from '../controller/LikeController';
import { LikeBussiness } from '../bussiness/LikeDislikeBussiness';

export const likeRouter = express.Router()

const likeControlle = new LikeController(
    new LikeBussiness(new LikeDatabase)
)

likeRouter.get("/", likeControlle.getLikesDilikes)