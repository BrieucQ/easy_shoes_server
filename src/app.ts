import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from "express";
import { UserResolver } from './resolvers/User';
import { customAuthChecker } from './auth/authCkecked';
import { ProductResolver } from './resolvers/Product';
const PORT = process.env.PORT || 4000;

export async function startServer() {
    // database connection, the config is loaded from ormconfig.json
    try {
        await createConnection();
    } catch (error) {
        throw new Error(error);
    }

    const app = express();

    // ... Building schema here
    const schema = await buildSchema({
        resolvers: [UserResolver, ProductResolver],
        authChecker: customAuthChecker,
    });

    // Create the GraphQL server
    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                token: req.headers.authorization,
                user: null,
            };
        }
    });

    server.applyMiddleware({ app });

    return app;
}
