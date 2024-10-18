import { Request, Response } from "express";
import { RUser } from "../store/RUser";
import IUser from "../interfaces/IUser";

const userRepo = new RUser();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      await userRepo.save(user);
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error creating user", error });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepo.getUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: "Error fetching users", error });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userRepo.getUserId(String(req.params.id));
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Error fetching user", error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      await userRepo.update(user, req.body.password, req.body.email);
      res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error updating user", error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await userRepo.delete(String(req.params.id));
      res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting user", error });
    }
  }
}
