import React from "react";
import CardLists from "@/components/CardLists";
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import Link from "next/link";

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
  // const { data: posts } = await client.query({
  //   query: GET_ARTICLE_POSTED,
  // });
  const posts: any = await getData();
  console.log("posts :>> ", posts);
  console.log("posts.length :>> ", posts.length);

  const res = await fetch(
    "https://bafybeiak2wcun3uyzfk3oin6bo7qbkhrdbcrxirhryrha3z6g7x2qptwaq.ipfs.dweb.link/pledgepost:0x06aa005386F53Ba7b980c61e0D067CaBc7602a62/da2da2b1-82c9-4f1f-b6ce-05b32f82d5dc.json"
  );
  const content = await res.json();
  console.log("content :>> ", content);

  return (
    <div className="flex flex-wrap gap-[26px] p-12 justify-center">
      {posts.map((post?: any) => (
        <Link
          key={post?.articleId}
          href={`/post/${post.author}/${post.articleId}`}
        >
          <CardLists
            Title={post?.articleId}
            author={post?.author}
            Description={post?.content}
            ImageUrl="https://picsum.photos/200/300"
            matchingAmount="1000"
          />
        </Link>
      ))}
    </div>
  );
}

async function getData() {
  if (!client) throw new Error("Client not available");

  try {
    const { data } = await client.query({
      query: GET_ARTICLE_POSTED,
    });
    return data?.articlePosteds || [];
  } catch (error) {
    console.error("getData error :>> ", error);
    throw error;
  }
}
