"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toChecksumAddress } from "ethereumjs-util";
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
import { ethers } from "ethers";
export type ArticleColumn = {
  articleId: string;
  author: {
    id?: string;
  };
  authorAddress: string;
  content: string;
  title: string;
  status: string;
  associatedRound: {
    id?: string;
    name: string;
  };
};
export type AnalyticsColumn = {
  articleId: string;
  title: string;
  donation: number;
  matchingAmount: number;
  comments: number;
  allocation: any;
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
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Round Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const article = row.original;
      return (
        <>
          {article.associatedRound?.id ? (
            <div className=" font-normal text-center">
              {`Round${article.associatedRound?.id}: ${article.associatedRound.name}`}
            </div>
          ) : (
            <div className=" font-normal text-center">No Round</div>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;
      const author = toChecksumAddress(article.authorAddress);
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
              href={`/post/${author}/${article.articleId}/${article.content}`}
            >
              <DropdownMenuItem>View on Explore</DropdownMenuItem>
            </Link>
            <Link
              href={`https://${article.content}.ipfs.dweb.link/pledgepost:${author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DropdownMenuItem>View on IPFS</DropdownMenuItem>
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
      return (
        <ApplicationModal
          id={article.articleId}
          round={article.associatedRound?.id}
        />
      );
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
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Donation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const article = row.original;
      const formattedDonation: any = parseFloat(
        article.donation.toString()
      ).toFixed(2);
      return (
        <div className="text-center font-medium">${formattedDonation}</div>
      );
    },
  },
  {
    accessorKey: "matchingAmount",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Matching Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const article = row.original;
      if (!article.allocation[0]?.amount)
        return <div className="text-center font-medium">$0</div>;
      const allocated = ethers.utils.formatUnits(
        article.allocation[0]?.amount,
        18
      );
      const formattedMatchingAmount: any = parseFloat(
        allocated.toString()
      ).toFixed(2);
      return (
        <div className="text-center font-medium">
          ${formattedMatchingAmount}
        </div>
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
