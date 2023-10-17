import React from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArticleColumn,
  AnalyticsColumn,
  columns,
  analyticsColumn,
} from "@/components/Dashboard/columns";
export default function Dashboard() {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <Tabs defaultValue="article">
          <TabsList>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <ArticleBoard columns={columns} data={articles} />
          </TabsContent>
          <TabsContent value="analytics">
            <ArticleBoard columns={analyticsColumn} data={articles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const articles = [
  {
    articleId: "0",
    author: "0x06aa005386F53Ba7b980c61e0D067CaBc7602a62",
    title: "Public Goods are Good",
    content: "bafybeicur4w3k6duoitg6khucgvx4d4tdhj3ikzdj2gtub5zrltjbi2v7u",
    donation: "100",
    matchingAmount: "1000",
    comments: "10",
    status: "pending",
  },
  {
    articleId: "1",
    author: "0x06aa005386F53Ba7b980c61e0D067CaBc7602a62",
    content: "bafybeicbi2d4q6huyjusfpowi2asq5ke42zikr24ghedporhe3os3iol7a",
    title: "Fund waht matters",
    donation: "1000",
    matchingAmount: "100000",
    comments: "1",
    status: "approved",
  },
  {
    articleId: "2",
    author: "0x06aa005386F53Ba7b980c61e0D067CaBc7602a62",
    content: "bafybeieuogo6277tilb6k7tiynjn2kgdldgccngyhprgx4fwpbng43a65i",
    title: "Fund waht matters",
    donation: "10",
    matchingAmount: "100",
    comments: "1000",
    status: "denied",
  },
];

const posts = [
  {
    id: "0",
    title: "Public Goods are Good",
    donation: "0",
    matchingAmount: "0",
    comments: "0",
    status: "pending",
  },
  {
    id: "1",
    title: "Fund waht matters",
    donation: "0",
    matchingAmount: "0",
    comments: "0",
    status: "approved",
  },
];
