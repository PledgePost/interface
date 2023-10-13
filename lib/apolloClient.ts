// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL as string,
  cache: new InMemoryCache(),
});

export default client;
