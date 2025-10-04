import { Collection, ObjectId } from "mongodb";
import { User } from "../model/User";
import { connectDB } from "../../config/database.config";
import { Status, UserResponse } from "../../dtos/responses/UserResponse.dto";

export class UserRepository {
  private static collection: Collection<User>; // create a collection to store my Users

  static async init() {
    const database = await connectDB();
    this.collection = database.collection<User>("Users"); // create a document for Users
  }

  static async save(user: User): Promise<UserResponse> {
    const existedUser = await this.findUserByEmail(user.email);

    if (existedUser) {
      return {
        id: existedUser._id!,
        status: Status.FAILURE,
        message: "User email already exist",
      };
    }

    const newUser = await this.collection.insertOne(user);
    return {
      id: newUser.insertedId,
      status: Status.SUCCESS,
      message: "User registered successfully",
    };
  }

  static async getUserById(id: string) {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user;
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.collection.findOne({ email });
    return user ?? null;
  }
}
