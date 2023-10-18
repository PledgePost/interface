"use client";
import React, { use, useState, useEffect } from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArticleColumn,
  AnalyticsColumn,
  columns,
  analyticsColumn,
} from "@/components/Dashboard/columns";
import { ethers } from "ethers";
import { getAllData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import { useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import { useEthersProvider } from "@/hooks/useEthers";
import { Skeleton } from "@/components/ui/skeleton";
const ABI = require("../../abis/PledgePost.json").abi;

const contract = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any,
  abi: ABI,
};

export default function Dashboard() {
  const posts: any = use(getAllData());
  const { chain } = useNetwork();
  const provider = useEthersProvider({ chainId: chain?.id });

  const [allPosts, setAllPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!provider) return;

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ABI,
      provider
    );

    const fetchData = async (address: string, articleId: any): Promise<any> => {
      try {
        const donation = await contract.getDonatedAmount(address, articleId);
        const donationAmount = ethers.utils.formatUnits(donation, 18);
        const round = await contract.getAppliedRound(address, articleId);
        const roundId = ethers.utils.formatUnits(round.id, 0);
        return {
          author: address,
          articleId,
          donation: donationAmount,
          roundId: roundId,
        };
      } catch (error) {
        console.error("Error fetching donation for", articleId, ":", error);
        return { author: address, articleId, donation: "0" };
      }
    };

    const fetchAllDonations = async () => {
      const donationPromises = posts.map((post: any) =>
        fetchData(post.author, post.articleId)
      );
      const donations = await Promise.all(donationPromises);
      const updatedPosts = posts.map((post: any) => {
        const donationData = donations.find(
          (d) => d.articleId === post.articleId
        );

        return {
          ...post,
          donation: donationData.donation,
          roundId: donationData.roundId,
        };
      });

      setAllPosts(updatedPosts);
      setIsLoading(false);
      console.log("Posts", updatedPosts);
    };
    fetchAllDonations();
  }, [posts, provider]);

  const { write: createRound } = useContractWrite({
    ...contract,
    functionName: "createRound",
    args: [
      "0x5CA1ED81795F5fE7174D8baA64c5d1B7bBB2b439",
      "Test Round1",
      1699509663,
      1702101663,
    ],
  });
  const { write: applyForRound } = useContractWrite({
    ...contract,
    functionName: "applyForRound",
    args: [1, 1],
  });
  const { write: activateRound } = useContractWrite({
    ...contract,
    functionName: "activateRound",
    args: [1],
  });
  const { write: deposit } = useContractWrite({
    ...contract,
    functionName: "deposit",
    args: [1, 100 * 10 ** 18],
  });
  const { write: approve } = useContractWrite({
    address: "0x5CA1ED81795F5fE7174D8baA64c5d1B7bBB2b439",
    abi: require("../../abis/Token.json").abi,
    functionName: "approve",
    args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any, 100000 * 10 ** 18],
  });

  return (
    <div className="p-12">
      <Button onClick={() => createRound()} variant="default">
        create round
      </Button>
      <Button onClick={() => activateRound()} variant="default">
        activate round
      </Button>
      <Button onClick={() => deposit()} variant="default">
        deposit
      </Button>
      <Button variant="default" onClick={() => applyForRound()}>
        apply
      </Button>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <Tabs defaultValue="article">
          <TabsList>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <ArticleBoard columns={columns} data={posts} />
          </TabsContent>
          <TabsContent value="analytics">
            <ArticleBoard columns={analyticsColumn} data={posts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
