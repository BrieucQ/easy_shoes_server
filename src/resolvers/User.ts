import argon2  from "argon2";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserController } from "../controllers/User";
import { User, UserInput } from "../entities/User";
import { UserRepository } from "../repositories/User";
import * as jwt from "jsonwebtoken";

@Resolver(User)
export class UserResolver {
    constructor() { }

    @Query(returns => [User])
    async users() {
        return UserRepository.getAllUsers();
    }

    // get one user by id wit token
    @Authorized()
    @Query(returns => User)
    async getProfile(@Ctx() context: {user: User}): Promise<User | null> {
        return await UserRepository.getUser(context.user.id);
    }

    @Mutation(returns => User)
    public async createUser(
        data: UserInput
    ): Promise<User> {
        return UserController.createUser(data);
    }

    @Mutation(() => User)
    async signup(@Arg('data',() => UserInput) data: UserInput): Promise<User> {
        const newUser = await UserController.createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: await argon2.hash(data.password),
        });
        await newUser.save();
        return newUser;
    }
    @Mutation(() => String, { nullable: true })
    async signin(@Arg('email') email: string, @Arg('password') password: string): Promise<string> {
        const user = await UserController.login(email);
        if (user) {
            if (await argon2.verify(user.password,password)) {
                const token = jwt.sign({ userId: user.id }, 'test');
                return token;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}