import { ApolloClient, InMemoryCache } from "@apollo/client";
const endpoint = process.env.GRAPHQL_API_URL;

const client = new ApolloClient({
  uri:
    "https://api.studio.thegraph.com/query/52298/pledgepost_v1/version/latest",
  cache: new InMemoryCache(),
});

export default client;
