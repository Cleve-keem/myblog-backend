import { ObjectId } from "mongodb";

type Id = ObjectId;

export interface User {
  _id?: Id;
  firstname: string;
  lastname: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
}
