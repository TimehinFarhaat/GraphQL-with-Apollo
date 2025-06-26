import { ApolloServer } from '@apollo/server';  //it is used to create and configure  GraphQL API.
import { startStandaloneServer } from '@apollo/server/standalone';   //utility function that quickly starts an Apollo Server without needing Express or another HTTP server.
import { userResolvers } from './schema/resolvers/user.resolver';  //Imports the resolver functions (Query, Mutation, etc.) for the User type from user.resolver.ts file.
import { productResolvers } from './schema/resolvers/product.resolver'; 
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';    // Utility functions from @graphql-tools:mergeTypeDefs: Combines multiple .graphql schema files into one.mergeResolvers: Combines multiple resolver files into one.
import * as fs from 'fs';   //Node built-in modules:fs: For reading files (.graphql schema files here).
import * as path from 'path';// path: Helps build file paths that work across OSes (Windows/Linux/Mac)
import { userLoader } from './loaders/userLoader';
import { productLoader } from './loaders/productLoader';
//plugin enables a user-friendly in-browser interface for testing queries.
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';

// Load typeDefs
// this function allows Apollo Server to load the GraphQL schema from an external 
// .graphql file, keeping the schema modular, readable, and easier to maintain, especially as the application grows in complexity

const userTypeDefs = fs.readFileSync(
  path.join(__dirname, './schema/typeDefs/user.graphql'),
  'utf-8'
);
const productTypeDefs= fs.readFileSync(
      path.join(__dirname, './schema/typeDefs/product.graphql'),
  'utf-8'
)

const typeDefs = mergeTypeDefs([userTypeDefs,productTypeDefs]);    // Merges all type definitions into one
const resolvers = mergeResolvers([userResolvers,productResolvers]);           // merges all resolver functions



//It creates and sets up the GraphQL server with your schema, logic, and a tool for testing it.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});



//It starts the server, makes it listen on port 4000, and shares tools like userLoader with the resolvers.
startStandaloneServer(server, {
  context: async () => ({
    loaders: {
      userLoader
    }
  }),
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
