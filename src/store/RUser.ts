import IUser from "../interfaces/IUser";
import { Operations } from "../interfaces/Operations";
import User from "../schema/User";
import uniqid from "uniqid";

export class RUser implements Operations {
  async save(user: IUser): Promise<void> {
    try {
      await User.create({
        id: uniqid("user-", ""),
        name: user.name,
        email: user.email,
        password: user.password,
        booksList: user.booksList || [],
      });
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user");
    }
  }
  async update(user: IUser, pass?: String, email?: String): Promise<void> {
    try {
      const existingUser = await User.findOne({
        where: {
          id: user.id,
        },
      });

      if (!existingUser) {
        throw new Error("User does not exist");
      }

      existingUser.name = user.name;

      if (pass) {
        existingUser.password = user.password;
      }

      if (email) {
        existingUser.email = user.email;
      }
    } catch (err) {
      console.log(`Failed to update user information: ${err}`);
    }
  }
}
