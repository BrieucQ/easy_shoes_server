import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from "express";
import { startServer } from './app';
const PORT =  4000;

async function main() {
    // database connection, the config is loaded from ormconfig.json
    const app = await startServer();
    // Start the server
    app.listen(4000);
    console.log('server on port')
}

main();
