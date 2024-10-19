import uniqid from "uniqid"; 
import IUser from "../interfaces/IUser";
import User from "../schema/User";

export class RUser {
  // Save user
  async save(user: IUser): Promise<void> {
    try {
      await User.create({
        id: uniqid(),
        name: user.name,
        email: user.email,
        password: user.password,
        booksList: user.booksList || [],
      });
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Failed to save user");
    }
  }

  // Update user details
  async update(user: IUser, pass?: string, email?: string): Promise<void> {
    try {
      const existingUser = await User.findOne({ id: user.id });
      if (!existingUser) {
        throw new Error("User does not exist");
      }

      existingUser.name = user.name;
      
      if (pass) {
        existingUser.password = pass;
      }
      if (email) {
        existingUser.email = email;
      }

      await existingUser.save(); // Save updated details
      console.log("User updated successfully");
    } catch (err) {
      console.log(`Failed to update user information: ${err}`);
    }
  }

  // Delete user by String ID
  async delete(userId: String): Promise<void> {
    try {
      const userToDelete = await User.findOne({ id: userId });
      if (!userToDelete) {
        throw new Error("User does not exist");
      }

      await userToDelete.deleteOne();
      console.log("User deleted successfully");
    } catch (err) {
      console.log(`Failed to delete user: ${err}`);
    }
  }

  // Get user by String ID
  async getUserId(userId: String): Promise<IUser | null> {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        throw new Error("User does not exist");
      }
      return user;
    } catch (err) {
      console.log(`Failed to get user: ${err}`);
      return null;
    }
  }

  // Get all users
  async getUsers(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (err) {
      console.log(`Failed to get users: ${err}`);
      return [];
    }
  }
}