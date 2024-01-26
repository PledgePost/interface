"use client";
import React, { useEffect, useState } from "react";
import CardLists from "@/components/CardLists";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import { StateContext } from "@/providers";
import { ALLO_GET_ARTICLES } from "@/lib/query";
import { BigNumber, ethers } from "ethers";

async function getAlloArticles() {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/63008/allo_pledgepost_arbsepolia/version/latest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLO_GET_ARTICLES,
      }),
    }
  ).then((res) => res.json());
  return response.data?.articles;
}

export default function Explore() {
  const { ethPrice } = StateContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<any>([]);
  useEffect(() => {
    const decoder = ethers.utils.defaultAbiCoder;
    async function getPosts() {
      setIsLoading(true);
      const data = await getAlloArticles();

      for (let i = 0; i < data.length; i++) {
        let decodedRegisterData = decoder.decode(
          ["bytes", "uint256"],
          data[i].registerd.data
        );
        let decodedRegisterParams = decoder.decode(
          ["address", "address", "tuple(uint256, string)"],
          decodedRegisterData[0]
        );
        let IPFS = await fetchData(
          decodedRegisterParams[1],
          decodedRegisterParams[2][1]
        );
        let donation = 0;
        if (data[i].allocation.length > 0) {
          for (let d = 0; d < data[i].allocation.length; d++) {
            let amount = ethers.utils.formatEther(data[i].allocation[d].amount);
            donation += parseFloat(amount);
          }
        }
        data[i] = {
          ...data[i],
          ...IPFS,
          recipientId: decodedRegisterParams[0],
          authorAddress: decodedRegisterParams[1],
          content: decodedRegisterParams[2][1],
          recipientIndex: BigNumber.from(decodedRegisterData[1]).toNumber(),
          donation,
        };
      }
      setArticles(data);
      console.log("data", data);
      setIsLoading(false);
    }
    getPosts();
  }, []);

  return (
    <div>
      {/* <Input
        placeholder="Search"
        className="md:w-[500px] h-[44px] flex justify-center items-center mx-auto md:mt-10 rounded-full"
      /> */}
      {!isLoading && articles.length === 0 && (
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
      <div className="flex flex-wrap gap-[26px] md:p-12 p-4 justify-center">
        {articles.map((article: any, recipientIndex: number) => (
          <Link key={recipientIndex} href={`/explore/${article.recipientId}`}>
            <CardLists
              Title={article.title}
              author={article.authorAddress}
              ens={article.ensName}
              avatar={article.avatar}
              Description={article.value}
              ImageUrl={article.coverImage}
              donation={article.donation * ethPrice}
              roundId={124}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
