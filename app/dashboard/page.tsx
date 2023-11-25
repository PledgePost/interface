"use client";
import React, { useState, useEffect } from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns, analyticsColumn } from "@/components/Dashboard/columns";
import { fetchData } from "@/lib/fetchData";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { ethers } from "ethers";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ARTICLE_BY_ID, GET_USER_BY_ID } from "../../lib/query";
import { useAccount } from "wagmi";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/pledgepost_opgoerli/version/latest",
  cache: new InMemoryCache(),
});

export default function Dashboard() {
  const [userArticle, setUserArticle] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const { address: currentAddress } = useAccount();
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
  async function getUserInfo(address: string) {
    const response = await client.query({
      query: GET_USER_BY_ID,
      variables: {
        id: address,
      },
      fetchPolicy: "no-cache",
    });
    if (!response || !response.data) {
      throw new Error("No data returned from the query");
    }
    return response.data.users;
  }
  useEffect(() => {
    const fetch = async () => {
      if (!currentAddress) return;
      const lowercaseAddress = currentAddress.toLowerCase();
      const posts: any = await getArticleByAddress(lowercaseAddress);
      const users = await getUserInfo(lowercaseAddress);
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

      const UserInfo = await Promise.all(
        users.map(async (user: any) => {
          let recievedDonation = ethers.BigNumber.from("0");
          let recievedAllocation = ethers.BigNumber.from("0");
          let totalDonor = 0;
          if (user.recievedDonations) {
            for (let i = 0; i < user.recievedDonations.length; i++) {
              let amount = ethers.BigNumber.from(
                user.recievedDonations[i].amount
              );
              totalDonor = totalDonor + 1;
              recievedDonation = recievedDonation.add(amount);
            }
          }
          if (user.allocation) {
            for (let i = 0; i < user.allocation.length; i++) {
              let amount = ethers.BigNumber.from(user.allocation[i].amount);
              recievedAllocation = recievedAllocation.add(amount);
            }
          }
          return {
            ...user,
            totalRecievedDonation:
              ethers.utils.formatUnits(recievedDonation, 18) || 0,
            totalDonor: totalDonor || 0,
            totalRecievedAllocation:
              ethers.utils.formatUnits(recievedAllocation, 18) || 0,
          };
        })
      );
      console.log("UserInfo", UserInfo[0]);
      console.log("AllPost", AllPost);
      setUserArticle(AllPost);
      setUser(UserInfo[0]);
    };
    fetch();
  }, [currentAddress]);

  return (
    <div className="p-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-row gap-4 my-4 ">
        <SalesCard
          title="Recieved Donation"
          amount={user?.totalRecievedDonation || 0}
        />
        <SalesCard
          title="Recieved Total Allocation"
          amount={user?.totalRecievedAllocation || 0}
        />
        <SubscriptionCard title="Total Donors" amount={user?.totalDonor || 0} />
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
