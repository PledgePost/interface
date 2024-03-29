"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/Comment/messages";
import MessageInput from "@/components/Comment/messageInput";
import { Button } from "@/components/ui/button";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pre } from "@/components/RichEditor";
import { BigNumber, ethers } from "ethers";
import { SalesCard, SubscriptionCard } from "@/components/Card";

import { getComments, insertComment } from "@/hooks/useSupabase";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { parseEther } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import useDefaultProvider from "@/hooks/useDefaultProvider";
import Image from "next/image";
import { Comment } from "@/types";
import { AlloABI } from "@/abi/Allo";
import { fetchData, getAlloArticle } from "@/lib/fetchData";

import { Skeleton } from "@/components/ui/skeleton";
import { StateContext } from "@/providers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sliceAddress from "@/utils/sliceAddress";
import { dateConvert } from "@/utils/dateConvert";
import Link from "next/link";
import { marked } from "marked";
// TODO: fix Image witdth and height

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();
// const permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";

const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};

export default function ArticlePage({ params }: any) {
  const [messages, setMessages] = useState<string>("");
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [amount, setAmount] = useState<any>(null);
  const [isDonated, setIsDonated] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const provider: ethers.providers.JsonRpcProvider = useDefaultProvider();
  const { openConnectModal } = useConnectModal();
  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();
  const { ethPrice } = StateContext();
  const [article, setArticle] = useState<any>([]);
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  useEffect(() => {
    const decoder = ethers.utils.defaultAbiCoder;
    async function getPost() {
      setIsLoading(true);
      let data = await getAlloArticle(params.articleId);
      let decodedRegisterData = decoder.decode(
        ["bytes", "uint256"],
        data.registerd.data
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
      if (data.allocation.length > 0) {
        donors = data.allocation.length;
        for (let d = 0; d < data.allocation.length; d++) {
          let amount = ethers.utils.formatEther(data.allocation[d].amount);
          donation += parseFloat(amount);
        }
      }
      const htmlText = marked.parse(IPFS.value);
      data = {
        ...data,
        ...IPFS,
        htmlText,
        dateConverted: dateConvert(data.registerd.blockTimestamp),
        recipientId: decodedRegisterParams[0],
        authorAddress: decodedRegisterParams[1],
        addr: sliceAddress(decodedRegisterParams[1]),
        content: decodedRegisterParams[2][1],
        recipientIndex: BigNumber.from(decodedRegisterData[1]).toNumber(),
        donation,
        donors,
      };
      setArticle(data);
      console.log("data", data);
      setIsLoading(false);
    }
    getPost();
  }, [params.articleId]);

  const {
    data: allocateData,
    isLoading: isLoadingAllocation,
    isSuccess: isSuccessAllocation,
    write: allocate,
  } = useContractWrite({
    ...allo,
    functionName: "allocate",
  });

  // TODO: fix supabase structure
  // async function fetchComments() {
  //   const comments = await getComments(
  //     params.articleId[0],
  //     params.articleId[1]
  //   );
  //   setComments(comments);
  // }

  // async function handleComment() {
  //   if (!currentAddress || messages === "") return;
  //   try {
  //     await insertComment(
  //       params.articleId[0],
  //       params.articleId[1],
  //       currentAddress,
  //       messages
  //     );
  //     setMessages("");
  //     await fetchComments();
  //   } catch (e) {
  //     console.log("error: ", e);
  //     showErrorToast("Error posting comment");
  //   }
  // }

  const handleDonate = async () => {
    if (!currentAddress) return alert("Please connect wallet");
    if (!amount) return alert("Please enter amount");
    if (currentAddress === article.authorAddress)
      return alert("You cannot donate to your own article");
    try {
      const data = ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "tuple(tuple(tuple(address, uint256), uint256, uint256), string)",
        ],
        [
          // recipientId as address
          article.recipientId,
          [
            [
              // SignatureTransfer.PermitTransferFrom
              [NATIVE, parseEther(amount)], // token, amount
              0, // nonce
              Math.floor(new Date().getTime() / 1000) + 1000, // deadline
            ],
            "", // signature, Native doesn't need signature
          ],
        ]
      );
      showDefaultToast("Sending Transaction...");

      allocate({
        args: [process.env.NEXT_PUBLIC_POOL_ID, data],
        value: parseEther(amount),
      });
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error donating to article");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {isLoading ? (
        <Skeleton className="w-[800px] h-[400px] flex justify-center mx-auto" />
      ) : (
        <Image
          className="flex justify-center mx-auto"
          src={article.coverImage}
          alt="cover image"
          width={600}
          height={300}
        />
      )}

      <div className="flex flex-row gap-4 my-4 justify-center">
        <SalesCard
          title="Recieved Donation"
          amount={article.donation * ethPrice || 0}
          isLoading={isLoading}
        />
        <SalesCard
          title="Matched Funds"
          isLoading={isLoading}
          amount={article.distributed * ethPrice || 0}
        />
        <SubscriptionCard
          title="Contributors"
          amount={article.donors || 0}
          isLoading={isLoading}
        />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-3/4 bg-white p-10 rounded shadow flex flex-col gap-4">
          <h1 className="flex flex-row flex-wrap text-3xl font-bold">
            {article.title}
          </h1>
          <div className="flex flex-row gap-4 items-center">
            <Link
              href={`/user/${article.authorAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <Avatar>
                <AvatarImage
                  src={article.avatar || "https://picsum.photos/500/300"}
                />
              </Avatar>
              <p className="text-[20px] font-medium">
                {article.ensName ? article.ensName : article.addr}
              </p>
            </Link>
            <p className="text-[#808191] text-[14px]">
              {article.dateConverted}
            </p>
          </div>
          <div>
            {/* <ReactMarkdown
              className="markdown overflow-auto"
              remarkPlugins={[remarkGfm]}
              components={{ pre: Pre }}
            >
              {article.value}
            </ReactMarkdown> */}
            <article className="prose lg:prose-lg">
              <div dangerouslySetInnerHTML={{ __html: article.htmlText }} />
            </article>
          </div>
        </div>
        <div className="md:w-1/4 bg-white p-5 rounded shadow gap-4">
          <div className="flex justify-center font-semibold p-2">Comments</div>
          <div>
            {comments?.length === 0 ? (
              <div className="flex justify-center font-semibold p-2">
                No comments yet
              </div>
            ) : (
              <>
                {comments?.map((comment, index) => (
                  <Messages key={index} params={comment} />
                ))}
              </>
            )}
            {!currentAddress ? (
              <Button onClick={openConnectModal} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <MessageInput
                messages={messages}
                setMessages={setMessages}
                setAmount={setAmount}
                // handleSend={handleComment}
                handleClick={handleDonate}
                isDonated={isDonated}
                loadingTx={isLoadingAllocation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
