import { ZodError } from "zod";
import { CreateUserSchema } from "../dtos/createUser.dto";
import { BaseError } from "../errors/BaseError";
import { UserBussiness } from "./../bussiness/UserBussiness";
import { Request, Response } from "express";
import { EditUserSchema } from "../dtos/editUser.dto";
import { DeleteUserSchema } from "../dtos/deleteUser.dto";
import { SignupSchema } from "../dtos/signup.dto";

export class UserController {

  constructor (
    private userBussiness:UserBussiness
  ){}

public signup =async (req:Request, res: Response) => {
  try {
    const input = SignupSchema.parse({
      name:req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const output = await this.userBussiness.signup(input)

    res.status(201).send(output)

  } catch (error) {
    console.log(error)

    if (error instanceof ZodError) {
      res.status(400).send(error.issues)
    } else if (error instanceof BaseError) {
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(500).send("Erro inesperado")
    }
  }
}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q as string | undefined,
      };

      // const userBussiness = new UserBussiness();
      const response = await this.userBussiness.getUsers(input);

      res.status(200).send(response);

    } catch (error) {

      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createUsers = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
    
      const response = await this.userBussiness.createUsers(input);

      res.status(201).send({ message: "Novo usuário criado", response });

    } catch (error) {

      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updateUsers = async (req: Request, res: Response) => {
    try {const input = EditUserSchema.parse({
        idToEdit: req.params.id,
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      // const userBussiness = new UserBussiness();
      const response = await this.userBussiness.updateUsers(input);

      res.status(200).send({ message: "Atualização realizada com sucesso", response });

    } catch (error) {

      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteUsers = async (req: Request, res: Response) => {
    try {
      // const input = {
      //   id: req.params.id,
      // };

      const input = DeleteUserSchema.parse({
        idToDelete: req.params.id,
      });

      // const userBussiness = new UserBussiness();
      const response = await this.userBussiness.deleteUsers(input);

      res.status(200).send(response);

    } catch (error) {

      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
