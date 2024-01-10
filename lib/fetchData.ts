import { cache } from "react";
import { ethers } from "ethers";
import { toChecksumAddress } from "ethereumjs-util";
import {
  ALLO_GET_ARTICLE,
  ALLO_USER_INFO,
  GET_ALL_ROUNDS,
  GET_ARTICLE,
  GET_ARTICLE_BY_ID,
} from "./query";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/pledgepost_opgoerli/version/latest",
  cache: new InMemoryCache(),
});

export const getArticle = cache(async (query: any) => {
  if (!client) throw new Error("Client not available");
  try {
    const response = await client.query({
      query: query,
      fetchPolicy: "no-cache",
    });

    if (!response || !response.data) {
      throw new Error("No data returned from the query");
    }

    return response.data.articles;
  } catch (error) {
    console.error("getData error :>> ", error);
    throw error;
  }
});

export const fetchData = cache(async (address: string, cid: string) => {
  const checksumAddress = toChecksumAddress(address);

  const url = `https://ipfs.io/ipfs/${cid}/pledgepost:${checksumAddress}`;
  const res = await fetch(url);
  const content = await res.json();
  return content;
});

export const getAllData = cache(async () => {
  const posts: any = await getArticle(GET_ARTICLE);
  const AllPost = await Promise.all(
    posts.map(async (post: any) => {
      let donation = ethers.BigNumber.from("0");
      if (post.donations) {
        for (let i = 0; i < post.donations.length; i++) {
          let amount = ethers.BigNumber.from(post.donations[i].amount);
          donation = donation.add(amount);
        }
      }
      const ipfsData = await fetchData(post.author.id, post.content);
      return {
        ...post,
        ...ipfsData,
        donation: ethers.utils.formatUnits(donation, 18), //TODO: change depending on token
      };
    })
  );
  console.log("AllPost :>> ", AllPost);
  return AllPost;
});
export const getAllRound = cache(async (query: any) => {
  if (!client) throw new Error("Client not available");
  try {
    const response = await client.query({
      query: query,
      fetchPolicy: "no-cache",
    });

    if (!response || !response.data) {
      throw new Error("No data returned from the query");
    }

    return response.data.rounds;
  } catch (error) {
    console.error("getData error :>> ", error);
    throw error;
  }
});
export const getAllRoundData = cache(async () => {
  const posts: any = await getAllRound(GET_ALL_ROUNDS);
  function formatTimestampToYMD(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${month}/${day}/${year}`;
  }
  const AllRound = await Promise.all(
    posts.map(async (post: any) => {
      return {
        ...post,
        startDate: formatTimestampToYMD(post.startDate),
        endDate: formatTimestampToYMD(post.endDate),
      };
    })
  );
  console.log("AllRound :>> ", AllRound);
  return AllRound;
});

export async function getAlloArticle(id: `0x${string}` | undefined) {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/63008/allo_pledgepost_arbsepolia/version/latest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLO_GET_ARTICLE,
        variables: { id: id },
      }),
    }
  ).then((res) => res.json());
  return response.data?.articles[0];
}
export async function getAlloUserInfo(id: `0x${string}` | undefined) {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/63008/allo_pledgepost_arbsepolia/version/latest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLO_USER_INFO,
        variables: { id: id },
      }),
    }
  ).then((res) => res.json());
  return response.data?.users[0];
}
