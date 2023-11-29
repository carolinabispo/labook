import { Likes } from "../models/Like";
import { LikeDatabase } from "../database/LikeDatabase";
import {
  CreateLikeInputDTO,
  CreateLikeOutputDTO,
} from "../dtos/createLike.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { LikeDB } from "../types";

export class LikeBussiness {
  constructor(private likeDatabase: LikeDatabase) {}

  public getLike = async (input: any) => {
    const { q } = input;
    const likeDislikeDB = await this.likeDatabase.findLikesDislikes(q);
    const likes: Likes[] = likeDislikeDB.map(
      (likeDislikeDB) =>
        new Likes(
          likeDislikeDB.like_id,
          likeDislikeDB.user_id,
          likeDislikeDB.post_id,
          likeDislikeDB.like,
          // likeDislikeDB.dislike
        )
    );
    return likes;
  };

  public createLike = async (
    input: CreateLikeInputDTO
  ): Promise<CreateLikeOutputDTO> => {

    const { likeId, userId, postId, like } = input;
    
    const likeDBExistes = await this.likeDatabase.findLikeById(postId,userId)

    if(likeDBExistes){
        throw new BadRequestError("'id' já existe")
    }

    const likes = new Likes (
        likeId, 
        userId,
        postId,
        like
    )

    const newLikeDB: LikeDB = {
        like_id: likes.getId(),
        user_id: likes.getUserId(),
        post_id:likes.getPostId(),
        like: likes.getLike(),
        // dislike: likes.getDislike()
    }

    await this.likeDatabase.insertLike(newLikeDB)

    const output: CreateLikeOutputDTO ={
        like:{
          likeId: likes.getId(),
            userId: likes.getUserId(),
            postId: likes.getPostId(),
            like: likes.getLike()
            // dislike: likes.getDislike()
        }
    }

    return output
  };
}
