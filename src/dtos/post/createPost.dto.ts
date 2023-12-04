import z from 'zod'

export interface CreatePostInputDTO{
    content: string,
    token: string
}

export type CreatePostOutputDTO = undefined

export const CreatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)


// export interface CreatePostInputDTO{
//     id: string,
//     creatorId:string,
//     content:string,
//     likes:number,
//     dislikesNumbers:number,
//     token: string
//     // createdAt:string,
//     // updatedAt:string,
// }

// export interface CreatePostOutputDTO{
//     post:{
//         id: string,
//         creatorId:string,
//         creatorName: string,
//         content:string,
//         likes:number,
//         dislikesNumbers:number,
//         token: string
//         // createdAt:string,
//         // updatedAt:string,
//     }
// }

// export const CreatePostSchema = z.object({
//     // id: z.string().min(3),
//     // creatorId: z.string().min(3),
//     content: z.string(),
//     // likes: z.number().gt(0),
//     // dislikesNumbers: z.number().gte(0),
//     token: z.string().min(1)
//     // createdAt: z.string().optional(),
//     // updatedAt: z.string().optional()
// }).transform(data => data as CreatePostInputDTO)