import z from 'zod'

export interface EditPostInputDTO{
    idToEdit: string,
    id: string,
    creatorId:string,
    creatorName: string,
    content:string,
    likes:number,
    dislike:number,
    token: string
}

export interface EditPostOutputDTO{
    message: string,
    post:{
        id: string ,
        creatorId:string,
        creatorName: string,
        content:string,
        likes:number,
        dislike:number,
    }
}
// export type EditPostOutputDTO = undefined


export const EditPostSchema = z.object({
    idToEdit:  z.string().min(2),
    id: z.string().min(1).optional(),
    creatorId:z.string().min(1).optional(),
    creatorName: z.string().min(1).optional(),
    content:z.string().min(1).optional(),
    likes:z.number().gte(0).optional(),
    dislike:z.number().gte(0).optional(),
    token: z.string().min(1)
}).transform(data => data as EditPostInputDTO)