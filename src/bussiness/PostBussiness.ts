import { PostDataBase } from "../database/PostDatabase";
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

    if (typeof id !== "string") {
      //   res.statusCode = 404;
      throw new Error("ID invalido");
    }

    if (creator_id < 3) {
      //   res.statusCode = 404;
      throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
    }

    if (typeof content !== "string") {
      //   res.statusCode = 404;
      throw new Error("Conteúdo inválido");
    }

    if (typeof likes !== "number") {
      //   res.statusCode = 404;
      throw new Error("likes deve ser número");
    }
    if (likes < 0) {
      //   res.statusCode = 404;
      throw new Error("likes não pode ser negativo");
    }

    if (typeof dislikes_numbers !== "number") {
      //   res.statusCode = 404;
      throw new Error("dislikesNumbers invalida");
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
    const { id, creatorId, content, likes, dislikesNumbers } =
      input;

    if (id !== undefined) {
      if (typeof id !== "string") {
        // res.status(400);
        throw new Error("'id' deve ser string");
      }
      if (id.length < 3) {
        // res.status(400);
        throw new Error("'id' deve possuir no mínimo 3 caractere");
      }
    }

    if (creatorId !== undefined) {
      if (typeof creatorId !== "string") {
        // res.status(400);
        throw new Error("'creator' deve ser string");
      }

      if (creatorId.length < 2) {
        // res.status(400);
        throw new Error("'creator' deve possuir no mínimo 2 caracteres");
      }
    }

    if (content !== undefined) {
      if (typeof content !== "string") {
        // res.status(400);
        throw new Error("'Conteudo' deve ser string");
      }

      if (content.length < 2) {
        // res.status(400);
        throw new Error("'COnteuto' deve possuir no mínimo 2 caracteres");
      }
    }

    if (likes !== undefined) {
      if (typeof likes !== "number") {
        // res.status(400);
        throw new Error("'Likes' deve ser string");
      }
      if (likes < 0) {
        // res.status(400);
        throw new Error("'Likes' não pode ser negativo");
      }
    }

    if (dislikesNumbers !== undefined) {
      if (typeof dislikesNumbers !== "number") {
        // res.status(400);
        throw new Error("'Dislikes' deve ser string");
      }
      if (dislikesNumbers < 0) {
        // res.status(400);
        throw new Error("'Dislikes' não pode ser negativo");
      }
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

  public deletePosts = async (input :any) => {
  
    const { id } = input;

    if (typeof id !== "string") {
      throw new Error("O campo 'id' deve ser umas string");
    }

    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(id);

    if (!postDBExists) {
      throw new Error("Não foi possível encontrar o post");
    }

    await postDatabase.deletePost(id);

    return postDBExists;
  


    
  }
}
