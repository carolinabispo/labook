import { CreatePostOutputDTO } from "./../dtos/post/createPost.dto";
import { UserDatabase } from "./../database/UserDatabase";
import { DeletePostInputDTO } from "../dtos/post/deletePost.dto";
import { PostDataBase } from "../database/PostDatabase";
import { CreatePostInputDTO } from "../dtos/post/createPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/Posts";
import { TPosts } from "../types";
import { EditUserOutputDTO } from "../dtos/user/editUser.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { TokenManager } from "../services/TokenManager";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IdGenerator } from "../services/idGenerator";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { log } from "console";
import { USER_ROLES } from "../models/Users";

export class PostBussiness {
  constructor(
    private postDatabase: PostDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDBwithCreatorName =
      await this.postDatabase.getPlaylistsWithCreatorName();

    const post = postDBwithCreatorName.map((postWithCreatorName) => {
      const post = new Post(
        postWithCreatorName.id,
        postWithCreatorName.creator_id,
        postWithCreatorName.name,
        postWithCreatorName.content,
        postWithCreatorName.likes,
        postWithCreatorName.dislikes_numbers,
        postWithCreatorName.created_at,
        postWithCreatorName.updated_at
      );
      return post.toBusinessModel();
    });

    const output: GetPostOutputDTO = post;
    return output;
  };

  public createPosts = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;
    console.log("Content:", content);
    console.log("Token:", token);

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      payload.id, // Use payload.id as creatorId
      payload.name, // Use payload.name as creatorName
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const postDB = post.toDBModel();
    await this.postDatabase.insertPost(postDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public updatePosts = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { idToEdit, content,likes, dislike,  token } =
      input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("post com essa id não existe");
    }

    if (payload.id !== postDB.creator_id) {
      throw new ForbiddenError("somente quem criou o post pode editá-la");
    }

    const post = new Post(
      postDB.id,
postDB.creator_id,
postDB.name,
      postDB.content,
      postDB.likes,
      postDB.dislikes_numbers,
      postDB.created_at,
      postDB.updated_at
    );

    
    post.setContent(content)
    post.setLikes(likes)
    post.setDislikes(dislike)

    const updatePostDB = post.toDBModel()
    await this.postDatabase.updatePost(updatePostDB)

    // const output: EditPostOutputDTO = undefined
      const output: EditPostOutputDTO={
        message:"Post editado com sucesso",
        post:{
          id: post.getId(),
          creatorId:payload.id,
          creatorName:payload.name,
          content: post.getContent(),
          likes: post.getLikes(),
          dislike: post.getDislikes()
        }
      }
      console.log(output.post)

    return output

    //   // const postDatabase = new PostDatabase();
    //   const postDBExists = await this.postDatabase.findPostById(idToEdit);

    //   if (!postDBExists) {
    //      throw new NotFoundError("'id' não encontrado");
    //   }

    //   const post = new Post(
    //     postDBExists.id,
    //     postDBExists.creator_id,
    //     postDBExists.content,
    //     postDBExists.likes,
    //     postDBExists.dislikes_numbers,
    //     postDBExists.created_at,
    //     postDBExists.updated_at
    //   )

    //   id && post.setId(id)
    //   creatorId && post.setCreatorId(creatorId)
    //   content && post.setContent(content)
    //   likes && post.setLikes(likes)
    //   dislikesNumbers && post.setDislikes(dislikesNumbers)

    //   const newPostDB: TPosts = {
    //     id: post.getId(),
    //     creator_id: post.getCreatorId(),
    //     content: post.getContent(),
    //     likes: post.getLikes(),
    //     dislikes_numbers: post.getDislikes(),
    //     created_at: post.getCreatedAt(),
    //     updated_at: post.getUpdatedAt(),
    //   };

    //   await this.postDatabase.updatePost(newPostDB);

    //   const output: EditPostOutputDTO={
    //     message:"Post editado com sucesso",
    //     post:{
    //       id: post.getId(),
    //       creatorId: post.getCreatorId(),
    //       content: post.getContent(),
    //       likes: post.getLikes(),
    //       dislikesNumbers: post.getDislikes()
    //     }
    //   }

    //   return output;
  };

  public deletePosts = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { idToDelete, token } = input;

    const payload = this.tokenManager.getPayload(token)

    // const postDBExists = await this.postDatabase.findPostById(idToDelete);

    if (!payload) {
      throw new UnauthorizedError()
    }

    const postDB = await this.postDatabase
      .findPostById(idToDelete)

      if (!postDB) {
        throw new NotFoundError("post com essa id não existe")
      }

      if (payload.role !== USER_ROLES.ADMIN) {
        if (payload.id !== postDB.creator_id) {
          throw new ForbiddenError("somente quem criou o post pode apaga-lo")
        }
      }

      await this.postDatabase.deletePost(idToDelete)

      const output: DeletePostOutputDTO = {
        message:'Post deletado com sucesso'
      }

      return output

  };
}
