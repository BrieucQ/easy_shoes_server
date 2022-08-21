import argon2 from "argon2";
import { Arg, Authorized, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserController } from "../controllers/User";
import { User, UserInput } from "../entities/User";
import { UserRepository } from "../repositories/User";
import * as jwt from "jsonwebtoken";
// import { authChecker } from "../middleware/isAuth";

@Resolver(User)
export class UserResolver {
    constructor() { }
    // @Authorized(['MEMBER', 'ADMIN'])
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
    // TODO: admin add new user with token  admin/addUser
    // @Authorized(['ADMIN'])
    @Mutation(returns => User)
    async updateUser(@Ctx() context: { user: User },
     @Arg('id', () => ID) id: number, @Arg('data', () => UserInput) data: UserInput): Promise<User | null> {
        console.log('contenxt', context.user);
        const user = await UserRepository.getUser(id);
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.phone = data.phone;
            await user.save();
            return user;
        } else {
            return null;
        }
    }
    // @Mutation(returns => User)
    // public async createUser(@Ctx() context: { user: User },@Arg('data', ()=> UserInput ) data: UserInput): Promise<User> {
    //     const admin = await UserRepository.getUser(context?.user.id);
       
    //     console.log('admin', admin);
    //     return await UserRepository.createUser(data);
    //     // const newUser = await UserController.createUser({
    //     //     firstName: data.firstName,
    //     //     lastName: data.lastName,
    //     //     email: data.email,
    //     //     phone: data.phone,
    //     //     password: await argon2.hash(data.password),
    //     //     role: data.role,
    //     // });
    //     // await newUser.save();
    //     // return newUser;

    // }

    @Mutation(() => User)
    async signup(@Arg('data', () => UserInput) data: UserInput): Promise<User> {
        const newUser = await UserController.createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: await argon2.hash(data.password),
            role: data.role,
        });
        await newUser.save();
        return newUser;
    }
    @Mutation(() => String, { nullable: true })
    async signin(@Arg('email') email: string, @Arg('password') password: string): Promise<string> {
        const user = await UserController.login(email);
        if (user) {
            if (await argon2.verify(user.password, password)) {
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