import { PostDataBase } from "../database/PostDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/Posts";
import { TPosts } from "../types";

export class PostBussiness {
  public getPosts = async (input: any) => {
    const { q } = input;

    const postDatabase = new PostDataBase();
    const postsDB = await postDatabase.findPosts(q);

    const post: Post[] = postsDB.map(
      (postDB) =>
        new Post(
          postDB.id,
          postDB.creator_id,
          postDB.content,
          postDB.likes,
          postDB.dislikes_numbers,
          postDB.created_at,
          postDB.updated_at
        )
    );
    return postsDB;
  };

  public createPosts = async (input: any) => {
    const { id, creator_id, content, likes, dislikes_numbers } = input;

    if (typeof id !== "string" || id.length < 4) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof creator_id !== "string") {
      throw new BadRequestError("O campo 'creatorId' deve ser uma string");
    }

    if (typeof content !== "string" || content.length < 1) {
      throw new BadRequestError(
        `O campo 'content' deve ter pelo menos 1 caracter.`
      );
    }

    if (typeof likes !== "number") {
      throw new BadRequestError(`O campo 'likes' deve ser um número`);
    }

    if (typeof dislikes_numbers !== "number") {
      throw new BadRequestError(`O campo 'likes' deve ser um número`);
    }

    // instanciando novo objeto
    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(id);

    if (postDBExists) {
      //   res.status(400);
      throw new Error("'id' já existe");
    }

    const post = new Post(
      id,
      creator_id,
      content,
      likes,
      dislikes_numbers,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB: TPosts = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes_numbers: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };
    await postDatabase.insertPost(newPostDB);

    return newPostDB;
  };

  public updatePosts = async (input: any) => {
    const { id, creatorId, content, likes, dislikesNumbers } = input;

    if (typeof id !== "string" || id.length < 4) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof creatorId !== "string" || creatorId.length < 3) {
      throw new BadRequestError(
        "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (typeof content !== "string" || content.length < 1) {
      throw new BadRequestError(
        `O campo 'content' deve ter pelo menos 1 caracter.`
      );
    }

    if (typeof likes !== "number") {
      throw new BadRequestError(`O campo 'likes' deve ser um número`);
    }

    if (typeof dislikesNumbers !== "number") {
      throw new BadRequestError(`O campo 'likes' deve ser um número`);
    }

    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(id);

    if (!postDBExists) {
      //   res.status(404);
      throw new Error("'id' não encontrado");
    }

    postDBExists.id = id;
    postDBExists.creator_id = creatorId;
    postDBExists.content = content;
    postDBExists.likes = likes;
    postDBExists.dislikes_numbers = dislikesNumbers;

    await postDatabase.updatePost(postDBExists);

    return postDBExists;
  };

  public deletePosts = async (input: any) => {
    const { id } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("O campo 'id' deve ser umas string");
    }

    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(id);

    if (!postDBExists) {
      throw new Error("Não foi possível encontrar o post");
    }

    await postDatabase.deletePost(id);

    return postDBExists;
  };
}
