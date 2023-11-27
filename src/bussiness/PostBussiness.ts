import { UserDatabase } from './../database/UserDatabase';
import { DeletePostInputDTO } from './../dtos/deletePost.dto';
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

constructor(
  private postDatabase: PostDataBase
){}

  public getPosts = async (input: any) => {
    const { q } = input;

    // const postDatabase = new PostDataBase();
    const postsDB = await this.postDatabase.findPosts(q);

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

    // instanciando novo objeto
    const postDBExists = await this.postDatabase.findPostById(id);

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

    await this.postDatabase.insertPost(newPostDB);

    const output: CreatePostOutputDTO = {
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

  public updatePosts = async (input: EditPostInputDTO):Promise<EditPostOutputDTO> => {
    
    const { idToEdit, id, creatorId, content, likes, dislikesNumbers } = input;
    
    // const postDatabase = new PostDatabase();
    const postDBExists = await this.postDatabase.findPostById(idToEdit);

    if (!postDBExists) {
       throw new NotFoundError("'id' não encontrado");
    }

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

    const newPostDB: TPosts = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes_numbers: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await this.postDatabase.updatePost(newPostDB);

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

    const postDBExists = await this.postDatabase.findPostById(idToDelete);

    if (!postDBExists) {
      throw new NotFoundError("Não foi possível encontrar o post");
    }

    await this.postDatabase.deletePost(idToDelete);

    const output: DeletePostOutputDTO = {
      message:"Post deletado com sucesso",
      post:{
        id: idToDelete
      }
    }
      return output;
  };
}
