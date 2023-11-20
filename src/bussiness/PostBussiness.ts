import { DeletePostInputDTO } from './../dtos/deletePost.dto';
import { CreatePostSchema } from '../dtos/createPost.dto';
import { PostDataBase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/Posts";
import { TPosts } from "../types";
import { EditPostInputDTO, EditPostOutputDTO } from '../dtos/editPost.dto';
import { EditUserOutputDTO } from '../dtos/editUser.dto';
import { NotFoundError } from '../errors/NotFoundError';
import { DeletePostOutputDTO } from '../dtos/deletePost.dto';

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

  public createPosts = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
    const { id, creatorId, content, likes, dislikesNumbers } = input;

    // if (typeof id !== "string" || id.length < 4) {
    //   throw new BadRequestError(
    //     "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
    //   );
    // }

    // if (typeof creatorId !== "string") {
    //   throw new BadRequestError("O campo 'creatorId' deve ser uma string");
    // }

    // if (typeof content !== "string" || content.length < 1) {
    //   throw new BadRequestError(
    //     `O campo 'content' deve ter pelo menos 1 caracter.`
    //   );
    // }

    // if (typeof likes !== "number") {
    //   throw new BadRequestError(`O campo 'likes' deve ser um número`);
    // }

    // if (typeof dislikesNumbers !== "number") {
    //   throw new BadRequestError(`O campo 'likes' deve ser um número`);
    // }

    // instanciando novo objeto
    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(id);

    if (postDBExists) {
      throw new BadRequestError("'id' já existe");
    }

    const post = new Post(
      id,
      creatorId,
      content,
      likes,
      dislikesNumbers,  
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

    const output: CreatePostOutputDTO = {
      post:{
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikesNumbers: post.getDislikes(),
        // createdAt: post.getCreatedAt(),
        // updatedAt: post.getUpdatedAt()
      }
    }

    return output;
  };

  public updatePosts = async (input: EditPostInputDTO):Promise<EditPostOutputDTO> => {
    
    const { idToEdit, id, creatorId, content, likes, dislikesNumbers } = input;

    // if (typeof id !== "string" || id.length < 4) {
    //   throw new BadRequestError(
    //     "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
    //   );
    // }

    // if (typeof creatorId !== "string" || creatorId.length < 3) {
    //   throw new BadRequestError(
    //     "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
    //   );
    // }

    // if (typeof content !== "string" || content.length < 1) {
    //   throw new BadRequestError(
    //     `O campo 'content' deve ter pelo menos 1 caracter.`
    //   );
    // }

    // if (typeof likes !== "number") {
    //   throw new BadRequestError(`O campo 'likes' deve ser um número`);
    // }

    // if (typeof dislikesNumbers !== "number") {
    //   throw new BadRequestError(`O campo 'likes' deve ser um número`);
    // }

    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(idToEdit);

    if (!postDBExists) {
       throw new NotFoundError("'id' não encontrado");
    }

    // postDBExists.id = id;
    // postDBExists.creator_id = creatorId;
    // postDBExists.content = content;
    // postDBExists.likes = likes;
    // postDBExists.dislikes_numbers = dislikesNumbers;

    const post = new Post(
      postDBExists.id,
      postDBExists.creator_id,
      postDBExists.content,
      postDBExists.likes,
      postDBExists.dislikes_numbers,
      postDBExists.created_at,
      postDBExists.updated_at
    )

    id && post.setId(id)
    creatorId && post.setCreatorId(creatorId)
    content && post.setContent(content)
    likes && post.setLikes(likes)
    dislikesNumbers && post.setDislikes(dislikesNumbers)

    await postDatabase.updatePost(postDBExists);

    const output: EditPostOutputDTO={
      message:"Post editado com sucesso",
      post:{
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikesNumbers: post.getDislikes()
      }
    }

    return output;
  };

  public deletePosts = async (input: DeletePostInputDTO):Promise<DeletePostOutputDTO> => {
    const { idToDelete } = input;

    // if (typeof id !== "string") {
    //   throw new BadRequestError("O campo 'id' deve ser umas string");
    // }

    const postDatabase = new PostDataBase();
    const postDBExists = await postDatabase.findPostById(idToDelete);

    if (!postDBExists) {
      throw new NotFoundError("Não foi possível encontrar o post");
    }

    await postDatabase.deletePost(idToDelete);

    const output: DeletePostOutputDTO = {
      message:"Post deletado com sucesso",
      post:{
        id: idToDelete
      }
    }
      return output;
  };
}
