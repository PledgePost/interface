import React from "react";
import CardLists from "@/components/CardLists";
import { toChecksumAddress } from "ethereumjs-util";
const ABI = require("../../abis/PledgePost.json").abi;
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import Link from "next/link";
import { ethers } from "ethers";
import { Input } from "@/components/ui/input";

const GET_ARTICLE_POSTED = gql`
  query GetArticlePosted {
    articlePosteds {
      id
      author
      content
      articleId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
export default async function Explore() {
  const posts: any = await getData();
  // const provider = new ethers.providers.JsonRpcProvider();
  // const contract = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any,
  //   ABI,
  //   provider
  // );

  const AllPost = await Promise.all(
    posts.map(async (post: any) => {
      const ipfsData = await fetchData(post.author, post.content);

      // TODO: get matching amount, should apply before getMatchingAmount function
      // const matchingAmount = await contract.getMatchingAmount(
      //   0,
      //   post.author,
      //   post.articleId
      // );
      return { ...post, ipfsData };
    })
  );

  console.log("AllPost :>> ", AllPost);

  return (
    <>
      <Input
        placeholder="Search"
        className="w-[500px] h-[44px] flex justify-center items-center mx-auto mt-12 rounded-full"
      />
      <div className="flex flex-wrap gap-[26px] p-12 justify-center">
        {AllPost.map((post?: any) => (
          <Link
            key={post?.articleId}
            href={`/post/${post.author}/${post.articleId}`}
          >
            <CardLists
              Title={post.ipfsData?.title}
              author={post?.author}
              Description={post?.ipfsData?.value}
              ImageUrl="https://picsum.photos/200/300"
              matchingAmount="1000"
            />
          </Link>
        ))}
      </div>
    </>
  );
}

async function getData() {
  if (!client) throw new Error("Client not available");
  try {
    const { data } = await client.query({
      query: GET_ARTICLE_POSTED,
      fetchPolicy: "no-cache",
    });
    return data.articlePosteds;
  } catch (error) {
    console.error("getData error :>> ", error);
    throw error;
  }
}

async function fetchData(address: string, cid: string) {
  const checksumAddress = toChecksumAddress(address);

  const url = `https://${cid}.ipfs.dweb.link/pledgepost:${checksumAddress}`;

  console.log("url :>> ", url);
  const res = await fetch(url);
  const content = await res.json();
  console.log("content :>> ", content);
  return content;
}
