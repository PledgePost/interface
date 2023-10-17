"use client";
import React, { use } from "react";
import ArticleBoard from "@/components/Dashboard/ArticleBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArticleColumn,
  AnalyticsColumn,
  columns,
  analyticsColumn,
} from "@/components/Dashboard/columns";
import { getAllData } from "@/lib/fetchData";
export default function Dashboard() {
  const posts: any = use(getAllData());
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
