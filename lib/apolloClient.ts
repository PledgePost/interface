import { ApolloClient, InMemoryCache } from "@apollo/client";
const endpoint = process.env.GRAPHQL_API_URL;

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default client;
