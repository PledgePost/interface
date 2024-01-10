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
import { ethers } from "ethers";

export type ArticleColumn = {
  recipientId: `0x${string}`;
  authorAddress: `0x${string}`;
  content: string;
  donation: number;
  recipientIndex: number;
  title: string;
  value: string;
};
export type AnalyticsColumn = {
  recipientId: `0x${string}`;
  authorAddress: `0x${string}`;
  content: string;
  donation: number;
  totalDonation: number;
  recipientIndex: number;
  title: string;
  value: string;
  fundDistributed: number;
  comments?: number;
};

export const columns: ColumnDef<ArticleColumn>[] = [
  {
    accessorKey: "recipientIndex",
    header: "Article ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  // TODO: manage status
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Round Status
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const article = row.original;
  //     return (
  //       <>
  //         {article.associatedRound?.id ? (
  //           <div className=" font-normal text-center">
  //             {`Round${article.associatedRound?.id}: ${article.associatedRound.name}`}
  //           </div>
  //         ) : (
  //           <div className=" font-normal text-center">No Round</div>
  //         )}
  //       </>
  //     );
  //   },
  // },
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
              href={`/explore/${article.recipientId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DropdownMenuItem>View on Explore</DropdownMenuItem>
            </Link>
            <Link
              href={`https://${article.content}.ipfs.dweb.link/pledgepost:${article.authorAddress}`}
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
];
export const analyticsColumn: ColumnDef<AnalyticsColumn>[] = [
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
      const formattedDonation: any = article.donation?.toFixed(2);
      return (
        <div className="text-center font-medium">${formattedDonation}</div>
      );
    },
  },
  {
    accessorKey: "fundDistributed",
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
      const formattedMatchingAmount: any = article.fundDistributed?.toFixed(2);
      return (
        <div className="text-center font-medium">
          ${formattedMatchingAmount || 0}
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
    cell: ({ row }) => {
      const article = row.original;
      return <div className="text-center font-medium">{article.comments}</div>;
    },
  },
];
