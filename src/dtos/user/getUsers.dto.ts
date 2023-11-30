import z from 'zod'
import { UserModel } from '../../models/Users'

export interface GetUserInputDTO{
    q: string,
    token: string
}

export type GetUserOutputDTO = UserModel[]

export const GetUserSchema = z.object({
    q:z.string().min(1).optional(),
    token:z.string().min(1)
}).transform(data=>data as GetUserInputDTO)

