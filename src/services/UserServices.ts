import { User } from "../data/model/User";
import { UserResponse } from "../dtos/responses/UserResponse.dto";
import { UserRepository } from "../data/repository/UserRepository";

export class UserService {
  static async createUser(user: User): Promise<UserResponse> {
    const response: UserResponse = await UserRepository.save(user);
    return response;
  }

  static async getUserByEmail(email: string): Promise<User> {
    const userCredentials: User = await UserRepository.findUserByEmail(email);
    if (!userCredentials) {
      throw new Error("User doesn't exist");
    }

    return userCredentials;
  }
}
