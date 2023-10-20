import { cache } from "react";

import { toChecksumAddress } from "ethereumjs-util";
import { GET_ARTICLE_POSTED } from "./query";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/plegepost_v2/v0.0.1",
  cache: new InMemoryCache(),
});

export const getData = cache(async () => {
  if (!client) throw new Error("Client not available");
  try {
    const response = await client.query({
      query: GET_ARTICLE_POSTED,
      fetchPolicy: "no-cache",
    });

    if (!response || !response.data) {
      throw new Error("No data returned from the query");
    }

    return response.data.articlePosteds;
  } catch (error) {
    console.error("getData error :>> ", error);
    throw error;
  }
});

export const fetchData = cache(async (address: string, cid: string) => {
  const checksumAddress = toChecksumAddress(address);

  const url = `https://${cid}.ipfs.dweb.link/pledgepost:${checksumAddress}`;

  console.log("url :>> ", url);
  const res = await fetch(url);
  const content = await res.json();
  console.log("content :>> ", content);
  return content;
});

export const getAllData = cache(async () => {
  const posts: any = await getData();

  const AllPost = await Promise.all(
    posts.map(async (post: any) => {
      const ipfsData = await fetchData(post.author, post.content);
      return { ...post, ...ipfsData };
    })
  );
  return AllPost;
});
