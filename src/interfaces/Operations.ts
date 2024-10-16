import IUser from "./IUser";

export interface Operations {
  save(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(userId: Number): Promise<void>;
  getUsers(): Promise<IUser[]>;
  getUserId(userId: Number): Promise<IUser | null>;
}
