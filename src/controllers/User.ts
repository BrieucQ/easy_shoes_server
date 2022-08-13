import { UserRepository } from "../repositories/User";
import { User, UserInput } from "../entities/User";

export class UserController {
    public static async createUser(data : UserInput): Promise<User> {
        if (await UserRepository.getUserByEmail(data.email)) {
            throw new Error('email_already_exists');
        } else {
            return await UserRepository.createUser(data);
        }
    }
    // get one user by id
    public static async getUser(userId: number): Promise<User | null> {
        if (await UserRepository.getUser(userId)) {
            return await UserRepository.getUser(userId);
        } else {
            throw new Error('user_not_found');
        }
    }
    public static async login(email: string): Promise<User> {
        if (await UserRepository.getUserByEmail(email)) {
            return await UserRepository.getUserByEmail(email);
        } else {
            throw new Error('user_not_found');
        }
    }
}