"use client";
import React, { useState, useEffect } from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns, analyticsColumn } from "@/components/Dashboard/columns";
import { fetchData, getAlloUserInfo } from "@/lib/fetchData";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import { StateContext } from "@/providers";

export default function Dashboard() {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ethPrice } = StateContext();
  const { address: currentAddress } = useAccount();

  useEffect(() => {
    const decoder = ethers.utils.defaultAbiCoder;
    async function getUser() {
      setIsLoading(true);
      let user = await getAlloUserInfo(currentAddress);
      if (!user) return;
      let data = user.articles;
      let totalDonations = 0;
      let totalDonors = 0;

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
        let donors = 0;
        if (data[i].allocation.length > 0) {
          donors = data[i].allocation.length;
          totalDonors += data[i].allocation.length;
          for (let d = 0; d < data[i].allocation.length; d++) {
            let amount = ethers.utils.formatEther(data[i].allocation[d].amount);
            donation += parseFloat(amount) * ethPrice;
            totalDonations += parseFloat(amount);
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
          donors,
          comments: 0,
        };
      }
      user = {
        ...user,
        articles: data,
        totalDonations,
        totalDonors,
      };
      setUser(user);
      setIsLoading(false);
    }
    getUser();
  }, [currentAddress, ethPrice]);
  return (
    <div className="p-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      {!isLoading && user.articles ? (
        <>
          <div className="flex flex-row gap-4 my-4 ">
            <SalesCard
              title="Recieved Donation"
              amount={user?.totalDonations * ethPrice || 0}
            />
            <SalesCard
              title="Recieved Total Allocation"
              amount={user?.totalRecievedAllocation || 0}
            />
            <SubscriptionCard
              title="Total Donors"
              amount={user?.totalDonors || 0}
            />
            <SubscriptionCard title="Total Comments" />
          </div>
          <div>
            <Tabs defaultValue="article">
              <TabsList>
                <TabsTrigger value="article">Articles</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="article">
                <ArticleBoard columns={columns} data={user?.articles} />
              </TabsContent>
              <TabsContent value="analytics">
                <ArticleBoard columns={analyticsColumn} data={user?.articles} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-4 my-4 ">
            You have not created any articles yet.
          </div>
        </>
      )}
    </div>
  );
}
