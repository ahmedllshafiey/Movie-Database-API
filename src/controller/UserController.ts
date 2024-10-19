import { NextFunction, Request, Response } from "express";
import { RUser } from "../store/RUser";
import IUser from "../interfaces/IUser";
import User from "../schema/User";
import bcrypt from "bcrypt";

const userRepo = new RUser();

export class UserController {
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    try {
      const { username, password, email, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role: role || "user",
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userRepo.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userRepo.getUserId(String(req.params.id));
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = req.body;
      await userRepo.update(user, req.body.password, req.body.email);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await userRepo.delete(String(req.params.id));
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
}
