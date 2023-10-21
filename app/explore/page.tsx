"use client";
import React, { use, cache, useState, useEffect, useCallback } from "react";
import CardLists from "@/components/CardLists";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getAllData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";

export default function Explore() {
  const posts: any = use(getAllData());

  return (
    <div>
      {/* <Input
        placeholder="Search"
        className="md:w-[500px] h-[44px] flex justify-center items-center mx-auto md:mt-10 rounded-full"
      /> */}
      {posts.length === 0 && (
        <div className="flex flex-col gap-4 md:mt-10">
          <h1 className="md:text-2xl font-semibold text-center">
            No article has been created yet!
          </h1>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/post">Create frist article!</Link>
            </Button>
          </div>
        </div>
      )}
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
