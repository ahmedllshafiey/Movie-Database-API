import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/User";
import IUser from "../interfaces/IUser";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser: IUser = new User({
        id,
        name,
        email,
        password: hashedPassword,
        role: "user",
      });

      await newUser.save();
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error registering user", error });
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send({ message: "Invalid credentials" });
        return;
      }

      // Issue JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).send({ message: "Login successful", token });
    } catch (error) {
      res.status(500).send({ message: "Error logging in", error });
    }
  }
}
