import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  booksList: { type: [String], default: [] }
});

export default mongoose.model<IUser>("User", userSchema);
