import { UserDatabase } from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/Users";
import { TUserDB } from "../types";

export class UserBussiness {
  public getUsers = async (input: any) => {
    // const q = req.params.q;
    const { q } = input;
    const userDataBase = new UserDatabase();
    const usersDB = await userDataBase.findUsers(q);

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
    return users;
  };

  public createUsers = async (input: any) => {
    const { id, name, email, password, role } = input;

    if (typeof id !== "string" || id.length < 3) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new BadRequestError(
        "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (!email || !email.includes("@")) {
      throw new BadRequestError(
        `O campo 'email' deve ser um endereço de e-mail válido`
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new BadRequestError(
        `O campo 'password' deve ter pelo menos 6 caracteres.`
      );
    }
    if (typeof role !== "string" || role.length < 4) {
      throw new BadRequestError(
        `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
      );
    }

    // instanciando novo objeto
    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

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

    return newUserDB;
  };

  public updateUsers = async (input: any) => {
    const { newId, newName, newEmail, newPassword, newRole } = input;

    if (typeof newId !== "string" || newId.length < 4) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof newPassword !== "string" || newName.length < 3) {
      throw new BadRequestError(
        "O campo 'nome' deve ser uma string com pelo menos 3 caracteres"
      );
    }

    if (!newEmail || !newEmail.includes("@")) {
      throw new BadRequestError(
        `O campo 'email' deve ser um endereço de e-mail válido`
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      throw new BadRequestError(
        `O campo 'password' deve ter pelo menos 6 caracteres.`
      );
    }
    if (typeof newRole !== "string" || newRole.length < 4) {
      throw new BadRequestError(
        `O campo 'role' deve ser uma string com pelo menos 4 caracteres`
      );
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(newId);

    if (!userDBExists) {
      //   res.status(404);
      throw new Error("'id' não encontrado");
    }

    userDBExists.id = newId;
    userDBExists.name = newName;
    userDBExists.email = newEmail;
    userDBExists.password = newPassword;
    userDBExists.role = newRole;

    await userDatabase.updateUser(userDBExists);

    return userDBExists;
  };

  public deleteUsers = async (input: any) => {
    const { id } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("O campo 'id' deve ser umas string");
    }

    const userDatabase = new UserDatabase();
    const userDBExists = await userDatabase.findUserById(id);

    if (!userDBExists) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    await userDatabase.deleteUser(id);

    return userDBExists;
  };
}
