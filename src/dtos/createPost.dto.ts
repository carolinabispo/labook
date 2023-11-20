import z from 'zod'

export interface CreatePostInputDTO{
    id: string,
    creatorId:string,
    content:string,
    likes:number,
    dislikesNumbers:number,
    // createdAt:string,
    // updatedAt:string,
}

export interface CreatePostOutputDTO{
    post:{
        id: string,
        creatorId:string,
        content:string,
        likes:number,
        dislikesNumbers:number,
        // createdAt:string,
        // updatedAt:string,
    }
}

export const CreatePostSchema = z.object({
    id: z.string().min(3),
    creatorId: z.string().min(3),
    content: z.string(),
    likes: z.number().gt(0),
    dislikesNumbers: z.number().gte(0),
    // createdAt: z.string().optional(),
    // updatedAt: z.string().optional()
})