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
import { ALLO_GET_ARTICLE } from "@/lib/query";
import { fetchData, getAlloArticle } from "@/lib/fetchData";
import { calculateAmount } from "@/lib/calculate";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [estimatedAllocation, setEstimatedAllocation] = useState<any>(null);
  const { openConnectModal } = useConnectModal();
  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();
  const [article, setArticle] = useState<any>([]);
  useEffect(() => {
    const decoder = ethers.utils.defaultAbiCoder;
    async function getPost() {
      setIsLoading(true);
      let data = await getAlloArticle(params.articleId);
      console.log("data", data);
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
      let donation = calculateAmount(data.alllocation);
      let donors = 0;
      if (data.alllocation) {
        donors = data.alllocation.length;
      }
      let distributed = calculateAmount(data.distributed);
      data = {
        ...data,
        ...IPFS,
        recipientId: decodedRegisterParams[0],
        authorAddress: decodedRegisterParams[1],
        content: decodedRegisterParams[2][1],
        recipientIndex: BigNumber.from(decodedRegisterData[1]).toNumber(),
        donation,
        donors,
        distributed,
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
    let lowercaseAddress = currentAddress.toLowerCase();
    if (currentAddress === article.authorAddress)
      return alert("You cannot donate to your own article");
    try {
      // const permit2Data = {
      //   permit: {
      //     permitted: {
      //       token: NATIVE,
      //       amount: BigInt(1e18),
      //     },
      //     nonce: 0,
      //     deadline: Math.floor(new Date().getTime() / 1000) + 10000,
      //   },
      //   signature: "",
      // };
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
          width={800}
          height={400}
        />
      )}
      <h1 className="flex justify-center text-3xl font-bold my-5">
        {article.title}
      </h1>
      <div className="flex flex-row gap-4 my-4 justify-center">
        <SalesCard
          title="Recieved Donation"
          amount={article.donation || 0}
          isLoading={isLoading}
        />
        <SalesCard
          title="Estimated Matching"
          isLoading={isLoading}
          amount={estimatedAllocation || 0}
        />
        <SubscriptionCard
          title="Contributors"
          amount={article.donors || 0}
          isLoading={isLoading}
        />
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-3/4 bg-white p-5 rounded shadow">
          <ReactMarkdown
            className="markdown overflow-auto"
            remarkPlugins={[remarkGfm]}
            components={{ pre: Pre }}
          >
            {article.value}
          </ReactMarkdown>
        </div>
        <div className="w-1/4 bg-white p-5 rounded shadow gap-4">
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
