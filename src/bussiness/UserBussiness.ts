import { UserDatabase } from "../database/UserDatabese";
import { User } from "../models/Users";
import { TUserDB } from "../types";

export class UserBussiness {
    public getUsers =async (input:any) => {
        // const q = req.params.q;
        const {q} = input
        const userDataBase = new UserDatabase()
        const usersDB = await userDataBase.findUsers(q)
    
        const users: User[] = usersDB.map(
          (usersDB) =>
            new User(
              usersDB.id,
              usersDB.name,
              usersDB.email,
              usersDB.password,
              usersDB.role,
              usersDB.created_at
            )
        );
        return users
    }

    public createUsers =async (input:any) => {
        const { id, name, email, password, role } = input

    if (typeof id !== "string") {
    //   res.statusCode = 404;
      throw new Error("ID invalido");
    }

    if (name.length < 3) {
    //   res.statusCode = 404;
      throw new Error("Nome de usuário deve possuir pelo menos 3 caracteres");
    }

    if (typeof name !== "string") {
    //   res.statusCode = 404;
      throw new Error("Nome de usuário invalido");
    }

    if (typeof email !== "string") {
    //   res.statusCode = 404;
      throw new Error("Email invalido");
    }

    if (typeof password !== "string") {
    //   res.statusCode = 404;
      throw new Error("Senha invalida");
    }

    if (typeof role !== "string") {
    //   res.statusCode = 404;
      throw new Error("Role invalida");
    }

    // instanciando novo objeto
    const userDatabase = new UserDatabase()
    const userDBExists = await userDatabase.findUserById(id)

    if (userDBExists) {
    //   res.status(400);
      throw new Error("'id' já existe");
    }

    const user = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    );

    const newUserDB: TUserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt(),
    };


    await userDatabase.insertUser(newUserDB);
   
   return newUserDB
    }





    // public updadeUsers = async (input:any)=>{
    //     const id = req.params.id;
        
    //     const newId = req.body.id;
    //     const newName = req.body.name;
    //     const newEmail = req.body.email;
    //     const newPassword = req.body.password;
    //     const newRole = req.body.role;
    
    //     if (newId !== undefined) {
    //       if (typeof newId !== "string") {
    //         // res.status(400);
    //         throw new Error("'id' deve ser string");
    //       }
    
    //       if (newId.length < 1) {
    //         // res.status(400);
    //         throw new Error("'id' deve possuir no mínimo 1 caractere");
    //       }
    //     }
    
    //     if (newName !== undefined) {
    //       if (typeof newName !== "string") {
    //         // res.status(400);
    //         throw new Error("'name' deve ser string");
    //       }
    
    //       if (newName.length < 2) {
    //         // res.status(400);
    //         throw new Error("'name' deve possuir no mínimo 2 caracteres");
    //       }
    //     }
    
    //     if (newEmail !== undefined) {
    //       if (typeof newEmail !== "string") {
    //         // res.status(400);
    //         throw new Error("'name' deve ser string");
    //       }
    //     }
    
    //     if (newRole !== undefined) {
    //       if (typeof newRole !== "string") {
    //         // res.status(400);
    //         throw new Error("'Role' deve ser number");
    //       }
    //     }

    //     if (typeof newPassword !== "string" || newPassword.length < 6) {
    //         throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    //       }
    
    //     // const [user]: TUserDB[] | undefined[] = await db("users").where({ id });
    
    //     const userDatabase = new UserDatabase()
    //     const userDBExists = await userDatabase.findUserById(id)
    
    //     if (!userDBExists) {
    //     //   res.status(404);
    //       throw new Error("'id' não encontrado");
    //     }

    //     userDBExists.name = newName
    //     userDBExists.email = newEmail
    //     userDBExists.password = newPassword
    //     userDBExists.role = newRole

    //     await userDatabase.updateUser(userDBExists)

    //     return userDBExists





    // }






}