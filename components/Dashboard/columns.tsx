"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ApplicationModal from "./ApplicationModal";
export type ArticleColumn = {
  articleId: string;
  author: string;
  content: string;
  title: string;
  status: string;
  round: string;
};
export type AnalyticsColumn = {
  articleId: string;
  title: string;
  donation: number;
  matchingAmount: number;
  comments: number;
};

export const columns: ColumnDef<ArticleColumn>[] = [
  {
    accessorKey: "articleId",
    header: "ArticleId",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Round Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit draft</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`/post/${article.author}/${article.articleId}/${article.content}`}
            >
              <DropdownMenuItem>View on Explore</DropdownMenuItem>
            </Link>
            <Link
              href={`https://${article.content}.ipfs.dweb.link/pledgepost:${article.author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DropdownMenuItem>View on IPFS</DropdownMenuItem>
            </Link>
            <Link
              href={`https://${article.content}.ipfs.dweb.link/pledgepost:${article.author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DropdownMenuItem>View on BlockExplore</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "apply",
    cell: ({ row }) => {
      const article = row.original;
      return <ApplicationModal id={article.articleId} />;
    },
  },
];
export const analyticsColumn: ColumnDef<AnalyticsColumn>[] = [
  {
    accessorKey: "articleId",
    header: "ArticleId",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "donation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Donation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const article = row.original;
      const formattedDonation: any = parseFloat(
        article.donation.toString()
      ).toFixed(2);

      return <div className="text-right font-medium">${formattedDonation}</div>;
    },
  },
  {
    accessorKey: "matchingAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Matching Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
