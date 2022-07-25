import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from "express";
import { User } from './entities/User';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    // database connection, the config is loaded from ormconfig.json
    await createConnection()

    const app = express();

    // ... Building schema here
    const schema = await buildSchema({
        resolvers: [User],
    });

    // Create the GraphQL server
    const server = new ApolloServer({
        schema,
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(
          `Server is running, GraphQL Playground available at ${server.graphqlPath}`,
        );
      });
}

bootstrap();
