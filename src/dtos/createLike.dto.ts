import z from 'zod'

export interface CreateLikeInputDTO {
    likeId: string,
    userId: string,
    postId: string,
    like: number
    // dislike: number
}

export interface CreateLikeOutputDTO {
    like:{
        likeId: string,
        userId: string,
        postId: string,
        like: number,
        // dislike: number

    }
}

export const CreateLikeSchema = z.object({
    likeId: z.string().min(3),
    userId: z.string().min(3),
    postId: z.string().min(3),
    like: z.number().gt(0),
    // dislike: z.number().gte(0).optional()
}).transform(data => data as CreateLikeInputDTO)