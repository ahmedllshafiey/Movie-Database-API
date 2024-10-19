// interfaces/IUser.ts
import { Document } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  booksList: string[];
  role: string;
}

export default IUser;