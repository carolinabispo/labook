import { User } from "../models/Users";
import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined) {
    let usersDB;

    if (q) {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${q}%`);
      usersDB = result;
    } else {
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      );
      usersDB = result;
    }
    return usersDB;
  }

  public async findUserById(id: string): Promise<TUserDB | undefined> {
    const [userDB]: TUserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ id });

    return userDB;
  }
  public async findUserByEmail(email: string):Promise<TUserDB | undefined> {
    const [userDB]: TUserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ email });

    return userDB;
  }

  public async insertUser(newUserDB: TUserDB) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB);
  }

  public async updateUser(newUser: TUserDB) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .where({ id: newUser.id })
      .update({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });
  }

  public async deleteUser(id: string) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .where({ id })
      .delete();
  }
}
