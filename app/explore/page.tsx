"use client";
import React, { use, cache, useState, useEffect, useCallback } from "react";
import CardLists from "@/components/CardLists";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getAllData } from "@/lib/fetchData";

export default function Explore() {
  const posts: any = use(getAllData());

  return (
    <div>
      <Input
        placeholder="Search"
        className="md:w-[500px] h-[44px] flex justify-center items-center mx-auto md:mt-10 rounded-full"
      />
      <div className="flex flex-wrap gap-[26px] md:p-12 p-4 ">
        {posts.map((post: any, index: number) => (
          <Link
            key={index}
            href={`/post/${post.author.id}/${post.articleId}/${post.content}`}
          >
            <CardLists
              Title={post.title}
              author={post?.author.id}
              Description={post.value}
              ImageUrl="https://picsum.photos/200/300"
              donation={post.donation}
              roundId={post.associatedRound?.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
