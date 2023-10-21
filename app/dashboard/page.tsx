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
import { getAllData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { ethers } from "ethers";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";

const ABI = require("../../abis/PledgePost.json").abi;
const tokenABI = require("../../abis/Token.json").abi;

export default function Dashboard() {
  const posts: any = use(getAllData());
  const [totalDonation, setTotalDonation] = useState<number>(0);
  const [totalDonor, setTotalDonor] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<any>(0);
  const { currentAddress, smartAccount, web3Provider, signer, handleUserOp } =
    useSafeAA();
  const [minted, setMinted] = useState(false);
  const handleMint = async () => {
    if (!currentAddress || !smartAccount) return alert("Please connect wallet");
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string,
      tokenABI,
      signer
    );
    console.log("contract: ", contract);
    const amount = ethers.utils.parseEther("1000000");
    try {
      const mintTx = await contract.populateTransaction.mint(
        currentAddress,
        amount
      );
      await handleUserOp(mintTx, smartAccount);
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
