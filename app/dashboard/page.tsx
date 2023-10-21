"use client";
import React, { useState, useEffect } from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns, analyticsColumn } from "@/components/Dashboard/columns";
import { fetchData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { ethers } from "ethers";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ARTICLE_BY_ID } from "../../lib/query";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/pledgepost_v3/version/latest",
  cache: new InMemoryCache(),
});
const tokenABI = require("../../abis/Token.json").abi;

export default function Dashboard() {
  const [totalDonation, setTotalDonation] = useState<number>(0);
  const [totalDonor, setTotalDonor] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<any>(0);
  const [minted, setMinted] = useState(false);
  const [userArticle, setUserArticle] = useState<any>([]);
  const { currentAddress, smartAccount, web3Provider, signer, handleUserOp } =
    useSafeAA();
  async function getArticleByAddress(address: string) {
    const response = await client.query({
      query: GET_ARTICLE_BY_ID,
      variables: {
        authorAddress: address,
      },
      fetchPolicy: "no-cache",
    });
    if (!response || !response.data) {
      throw new Error("No data returned from the query");
    }
    return response.data.articles;
  }
  useEffect(() => {
    console.log("fetching userArticle");
    if (!currentAddress) return;
    const fetch = async () => {
      const lowercaseAddress = currentAddress.toLowerCase();
      const posts: any = await getArticleByAddress(lowercaseAddress);
      console.log("UserPosts", posts);
      const AllPost = await Promise.all(
        posts.map(async (post: any) => {
          let donation = ethers.BigNumber.from("0");
          if (post.donations) {
            for (let i = 0; i < post.donations.length; i++) {
              let amount = ethers.BigNumber.from(post.donations[i].amount);
              donation = donation.add(amount);
            }
          }
          const ipfsData = await fetchData(post.authorAddress, post.content);
          return {
            ...post,
            ...ipfsData,
            donation: ethers.utils.formatUnits(donation, 18),
          };
        })
      );

      setUserArticle(AllPost);
    };
    fetch();
  }, [currentAddress]);

  const handleMint = async () => {
    if (!currentAddress || !smartAccount) return alert("Please connect wallet");
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string,
      tokenABI,
      signer
    );
    const amount = ethers.utils.parseEther("1000000");
    try {
      const mintTx = await contract.populateTransaction.mint(
        currentAddress,
        amount
      );
      await handleUserOp(mintTx, smartAccount);
      setMinted(true);
      await updateTokenbalance();
    } catch (e) {
      console.log(e);
    }
  };
  async function updateTokenbalance() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string,
      tokenABI,
      web3Provider
    );
    contract.balanceOf(currentAddress).then((balance: any) => {
      let tokenbalance = ethers.utils.formatEther(balance);
      const formatted = parseFloat(tokenbalance).toFixed(2);
      setTokenBalance(formatted);
    });
  }
  useEffect(() => {
    if (!currentAddress) return;
    updateTokenbalance();
  }, [currentAddress]);
  return (
    <div className="p-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">{tokenBalance}USDC</p>
          <Button onClick={handleMint} disabled={minted}>
            Faucet
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-4 my-4 ">
        <SalesCard title="Recieved Donation" amount={totalDonation} />
        <SubscriptionCard title="Total Donors" amount={totalDonor} />
        <SubscriptionCard title="Total Comments" />
      </div>
      <div>
        <Tabs defaultValue="article">
          <TabsList>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <ArticleBoard columns={columns} data={userArticle} />
          </TabsContent>
          <TabsContent value="analytics">
            <ArticleBoard columns={analyticsColumn} data={userArticle} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
