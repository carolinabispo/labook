import { TPosts } from "../types";
import { BaseDatabase } from "./BaseDatabase";

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

  public async findPostById(id: string) {
    const [postDB]: TPosts[] | undefined = await BaseDatabase.connection(
      PostDataBase.TABLE_POST
    ).where({ id });

    return postDB;
  }

  public async insertPost(newPost: TPosts) {
    await BaseDatabase.connection(PostDataBase.TABLE_POST).insert(newPost);
  }

  public async updatePost(newPost: TPosts) {
    await BaseDatabase.connection(PostDataBase.TABLE_POST)
      .where({ id: newPost.id })
      .update({
        creator_id: newPost.creator_id,
        content: newPost.content,
        likes: newPost.likes,
        dislikes_numbers: newPost.dislikes_numbers,
      });
  }

  public async deletePost(id: string) {
    await BaseDatabase.connection(PostDataBase.TABLE_POST)
    .where({ id })
    .delete();
  }
}
