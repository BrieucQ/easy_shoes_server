import { getRepository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {    
    public static async createUser(user: Partial<User>): Promise<User> {
        const  repo = getRepository(User);
        return await repo.create(user).save();
    }

    public static async updateUser(user: Partial<User>): Promise<User> {
        const  repo = getRepository(User);
        const existingItem = await repo.findOne(user.id);
        Object.assign(existingItem, user);
        return await existingItem.save();
    }

    public static async getAllUsers(): Promise<User[]> {
        const  repo = getRepository(User);
        return await repo.find();
    }

    public static async getUser(userId: number): Promise<User | null> {
        const repo = getRepository(User);
        return await repo.findOne(userId);
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        const repo = getRepository(User);
        return await repo.findOne({ email });
    }
}