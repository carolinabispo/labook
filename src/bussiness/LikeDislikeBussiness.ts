import { Likes } from '../models/LikeDislike';
import { LikeDatabase } from './../database/LikeDatabase';
export class LikeBussiness {
    constructor(private likeDatabase: LikeDatabase){}

public getLike =async (input:any) => {
    const {q} = input
    const likeDislikeDB = await this.likeDatabase.findLikesDislikes(q)
    const likes: Likes[] = likeDislikeDB.map((likeDislikeDB)=> new Likes(
        likeDislikeDB.likes_dislikes_id,
        likeDislikeDB.user_id,
        likeDislikeDB.post_id,
        likeDislikeDB.like,
        likeDislikeDB.dislike
        )
    )
    return likes
}

}