import { UserBussiness } from './../bussiness/UserBussiness';
import { Request, Response } from "express";
// import { UserDatabase } from "../database/UserDatabese";
// import { User } from "../models/Users";


export class UserController{
    public getUsers =async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q as string | undefined
            };
        
            const userBussiness = new UserBussiness()
            const response = await userBussiness.getUsers(input)
        
            res.status(200).send(response);

          } catch (error) {
            if (req.statusCode === 200) {
              res.status(500);
            }
        
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }
    }

    public createUsers =async (req:Request, res: Response) => {
        
        try {
           const input = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
           }
        
          
            // instanciando novo objeto
            const userBussiness = new UserBussiness()
            const response = await userBussiness.createUsers(input)
        
        
           
            res.status(201).send({ message: "Novo usuário criado", response });


          } catch (error) {
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }






    }


    // public updateUsers =async (req:Request, res:Response) => {
    //     try {
    //         const id = req.params.id;
        
    //         const newId = req.body.id;
    //         const newName = req.body.name;
    //         const newEmail = req.body.email;
    //         const newPassword = req.body.password;
    //         const newRole = req.body.role;
        
    //         if (newId !== undefined) {
    //           if (typeof newId !== "string") {
    //             res.status(400);
    //             throw new Error("'id' deve ser string");
    //           }
        
    //           if (newId.length < 1) {
    //             res.status(400);
    //             throw new Error("'id' deve possuir no mínimo 1 caractere");
    //           }
    //         }
        
    //         if (newName !== undefined) {
    //           if (typeof newName !== "string") {
    //             res.status(400);
    //             throw new Error("'name' deve ser string");
    //           }
        
    //           if (newName.length < 2) {
    //             res.status(400);
    //             throw new Error("'name' deve possuir no mínimo 2 caracteres");
    //           }
    //         }
        
    //         if (newEmail !== undefined) {
    //           if (typeof newEmail !== "string") {
    //             res.status(400);
    //             throw new Error("'name' deve ser string");
    //           }
    //         }
        
    //         if (newRole !== undefined) {
    //           if (typeof newRole !== "string") {
    //             res.status(400);
    //             throw new Error("'Role' deve ser number");
    //           }
    //         }

    //         if (typeof newPassword !== "string" || newPassword.length < 6) {
    //             throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    //           }
        
    //         // const [user]: TUserDB[] | undefined[] = await db("users").where({ id });
        
    //         const userDatabase = new UserDatabase()
    //         const userDBExists = await userDatabase.findUserById(id)
        
    //         if (!userDBExists) {
    //           res.status(404);
    //           throw new Error("'id' não encontrado");
    //         }

    //         userDBExists.name = newName
    //         userDBExists.email = newEmail
    //         userDBExists.password = newPassword
    //         userDBExists.role = newRole

    //         await userDatabase.updateUser(userDBExists)

    //         return userDBExists
        
    //       } catch (error) {
    //         if (error instanceof Error) {
    //           res.status(500).send(error.message);
    //         } else {
    //           res.status(500).send("Erro inesperado");
    //         }
    //       }
    // }




}