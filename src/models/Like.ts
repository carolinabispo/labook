export class Likes {
    constructor(
       private likeId: string,
       private userId: string,
       private postId:string,
       private like: number,
      //  private dislike: number
    ) {}
  
    public getId(): string {
      return this.likeId
    }
  
    public setId(newValue: string): void {
      this.likeId = newValue
    }
  
    public getUserId(): string {
      return this.userId
    }
  
    public setUserId(newValue: string): void {
      this.userId = newValue
    }
  
    public getPostId(): string {
      return this.postId
    }
  
    public setPostId(newValue: string): void {
      this.postId = newValue
    }
  
    public getLike(): number {
      return this.like
    }
  
    public setLike(newValue: number): void {
      this.like = newValue
    }

    // public getDislike(): number {
    //   return this.dislike
    // }

    // public setDislike(newValue: number): void {
    //   this.dislike = newValue
    // }
  }