import { PostDB, PostDBWithCreatorName } from "../models/Posts";
import { TPosts } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_POST = "posts";

  public async findPosts(q: string | undefined) {
    let postsDB;

    if (q) {
      const result: TPosts[] = await BaseDatabase.connection(
        PostDataBase.TABLE_POST
      ).where("creator_id", "LIKE", `%${q}%`);
      postsDB = result;
    } else {
      const result: TPosts[] = await BaseDatabase.connection(
        PostDataBase.TABLE_POST
      );
      postsDB = result;
    }
    return postsDB;
  }

  public async findPostById(id: string): Promise<PostDB | undefined> {
    const [postDB] = await BaseDatabase
    .connection(
    PostDataBase.TABLE_POST
    ).select()
    .where({ id });

    return postDB;
  }

  public async insertPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.
    connection(PostDataBase.TABLE_POST)
    .insert(newPost);
  }

  public async updatePost(newPost: PostDB): Promise<void> {
    await BaseDatabase
    .connection(PostDataBase.TABLE_POST)
    .where({ id: newPost.id })
    .update({
      content: newPost.content,
      likes: newPost.likes,
      dislikes_numbers: newPost.dislikes_numbers,
      created_at:newPost.created_at,
      updated_at: new Date(),
           
    });
  }

  public async deletePost(id: string) {
    await BaseDatabase.connection(PostDataBase.TABLE_POST)
    .where({ id })
    .delete();
  }

  public getPlaylistsWithCreatorName =
  async (): Promise<PostDBWithCreatorName[]> => {

  const result = await BaseDatabase
    .connection(PostDataBase.TABLE_POST)
    .select(
      `${PostDataBase.TABLE_POST}.id`,
      `${PostDataBase.TABLE_POST}.creator_id`,
      `${PostDataBase.TABLE_POST}.name`,
      `${PostDataBase.TABLE_POST}.content`,
      `${PostDataBase.TABLE_POST}.likes`,
      `${PostDataBase.TABLE_POST}.dislikes_numbers`,
      `${PostDataBase.TABLE_POST}.created_at`,
      `${PostDataBase.TABLE_POST}.updated_at`,
      `${UserDatabase.TABLE_USERS}.name as creator_name`
    )
    .join(
      `${UserDatabase.TABLE_USERS}`,
      `${PostDataBase.TABLE_POST}.creator_id`, 
      "=",
      `${UserDatabase.TABLE_USERS}.id`
    )
  
  return result as PostDBWithCreatorName[]
}
}
