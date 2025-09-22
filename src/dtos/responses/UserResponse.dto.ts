import { ObjectId } from "mongodb";

type Id = ObjectId;

export enum Status {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface UserResponse {
  id?: Id;
  status: Status;
  message: string;
  user?: string;
}

export interface UserLoginResponse {
  id?: Id;
  status: Status;
  message: string;
}
