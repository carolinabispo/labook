import { LikeDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDatabase extends BaseDatabase{
    public static TABLE_LIKES = "likes_dislikes"

    public async findLikesDislikes(q:string | undefined){
        let likesDislikesDB

        if(q){
            const result: LikeDB[] = await BaseDatabase.connection(LikeDatabase.TABLE_LIKES).where("like", "LIKE",`%${q}%`)
            likesDislikesDB = result
        }else{
            const result: LikeDB[] = await LikeDatabase.connection(LikeDatabase.TABLE_LIKES)
            likesDislikesDB = result
        }
return likesDislikesDB
    }

    public async findLikeById(postId:string, userId:string){
        const [likeDB]: LikeDB[] | undefined = await 
        BaseDatabase.connection(LikeDatabase.TABLE_LIKES)
        .where({
            post_id: postId,
            user_id: userId
        })

        return likeDB
    }

    public async insertLike(newLike:LikeDB){
        await BaseDatabase.connection(LikeDatabase.TABLE_LIKES).insert(newLike)
    }


}