"use client";
import React, { use, cache, useState, useEffect, useCallback } from "react";
import CardLists from "@/components/CardLists";
import Link from "next/link";
import { ethers } from "ethers";
import { Input } from "@/components/ui/input";

const ABI = require("../../abis/PledgePost.json").abi;
import { getAllData } from "@/lib/fetchData";
import { useNetwork } from "wagmi";
import { useEthersProvider } from "@/hooks/useEthers";

export default function Explore() {
  const posts: any = use(getAllData());
  const [allPosts, setAllPosts] = useState<any>([]);
  const { chain } = useNetwork();
  const provider = useEthersProvider({ chainId: chain?.id });

  useEffect(() => {
    if (!provider) return;

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ABI,
      provider
    );

    const getDonation = async (
      address: string,
      articleId: any
    ): Promise<any> => {
      try {
        const data = await contract.getDonatedAmount(address, articleId);
        const donationAmount = ethers.utils.formatUnits(data, 18);
        return { author: address, articleId, donation: donationAmount };
      } catch (error) {
        console.error("Error fetching donation for", articleId, ":", error);
        return { author: address, articleId, donation: "0" };
      }
    };

    const fetchAllDonations = async () => {
      const donationPromises = posts.map((post: any) =>
        getDonation(post.author, post.articleId)
      );
      const donations = await Promise.all(donationPromises);
      const updatedPosts = posts.map((post: any) => {
        const donationData = donations.find(
          (d) => d.articleId === post.articleId
        );
        return { ...post, donation: donationData.donation };
      });
      setAllPosts(updatedPosts);
    };

    fetchAllDonations();
  }, [posts, provider]);

  return (
    <>
      <Input
        placeholder="Search"
        className="md:w-[500px] h-[44px] flex justify-center items-center mx-auto md:mt-10 rounded-full"
      />
      <div className="flex flex-wrap gap-[26px] md:p-12 p-4 justify-center ">
        {allPosts.map((post: any, index: number) => (
          <Link
            key={index}
            href={`/post/${post.author}/${post.articleId}/${post.content}`}
          >
            <CardLists
              Title={post.title}
              author={post?.author}
              Description={post.value}
              ImageUrl="https://picsum.photos/200/300"
              donation={post.donation}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
