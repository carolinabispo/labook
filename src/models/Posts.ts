export interface PostDB{
   id: string,
   creator_id: string,
   name:string,
   content: string,
   likes: number,
   dislikes_numbers: number,
   created_at: string,
   updated_at: string
}

export interface PostDBWithCreatorName {
  id: string,
  creator_id: string,
  name: string,
  content: string,
  likes: number,
  dislikes_numbers: number,
  created_at: string,
  updated_at: string,
  creator_name: string
}

export interface PostModel{
  id: string,
  content: string,
  likes: number,
  dislikesNumbers: number,
  createdAt: string,
  updatedAt: string,
  creator: {
    id: string,
    name: string
  }
}



export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private creatorName: string,
    private content: string,
    private likes: number,
    private dislike: number,
    private createdAt: string,
    private updatedAt: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(newValue: string): void {
    this.id = newValue;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public setCreatorId(newValue: string): void {
    this.creatorId = newValue;
  }

  public getCreatorName(): string {
    return this.creatorName;
  }

  public setCreatorName(newValue: string): void {
    this.creatorName = newValue;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(newValue: string): void {
    this.content = newValue;
  }

  public getLikes(): number {
    return this.likes;
  }

  public setLikes(newValue: number): void {
    this.likes = newValue;
  }

  public getDislikes(): number {
    return this.dislike;
  }

  public setDislikes(newValue: number): void {
    this.dislike = newValue;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setCreatedAt(newValue: string): void {
    this.createdAt = newValue;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
  
  public setUpdatedAt(newValue: string): void {
    this.updatedAt = newValue;
  }

  public toDBModel(): PostDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      name: this.creatorName,
      content: this.content,
      likes: this.likes,
      dislikes_numbers: this.dislike,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikesNumbers: this.dislike,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: {
        id: this.creatorId,
        name: this.creatorName
      }
    }
  }
}
