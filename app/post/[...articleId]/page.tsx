"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/Comment/messages";
import MessageInput from "@/components/Comment/messageInput";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { readComments, writeComment, Comment } from "@/hooks/useTableland";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";
import { toChecksumAddress } from "ethereumjs-util";
import { TokenType } from "@/lib/Token/token";
import useExplore from "@/hooks/useExplore";
const ABI = require("../../../abis/PledgePost.json").abi;
const TOKEN_ABI = require("../../../abis/Token.json").abi;

async function fetchData(address: any, cid: string) {
  const checksumAddress = toChecksumAddress(address);
  const url = `https://${cid}.ipfs.dweb.link/pledgepost:${checksumAddress}`;
  const res = await fetch(url, {
    cache: "force-cache",
  });
  const content = await res.json();
  return content;
}

export default function ArticlePage({ params }: any) {
  const { openConnectModal } = useConnectModal();
  const [content, setContent] = useState<any>(null);
  const [messages, setMessages] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [token, setToken] = useState<TokenType | undefined>(undefined); //erc20 token
  const { address } = useAccount();
  const url = useExplore();

  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  let timestamp = new Date();
  let unix = timestamp.getTime();
  let UNIXtimestamp = Math.floor(unix / 1000);

  async function handleSend() {
    if (!address || messages === "") return;
    try {
      showDefaultToast("Sending Transaction...");
      const result = await writeComment({
        author: params.articleId[0],
        article_id: params.articleId[1],
        message: messages,
        user: address,
        timestamp: UNIXtimestamp,
      });
      console.log("result :>> ", result);
      showSuccessToast("Comment successfully posted");
      setMessages("");
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error posting comment");
    }
  }

  // TODO: create Tx context API
  const {
    data,
    isLoading,
    write: donate,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any,
    abi: ABI,
    functionName: "donateToArticle",
    args: [
      params.articleId[0],
      params.articleId[1],
      token?.address,
      amount * 10 ** (token?.decimals || 0),
    ],
  });
  const { write: approve } = useContractWrite({
    address: token?.address,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [token?.address, amount * 10 ** (token?.decimals || 0)],
  });
  const { data: history } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any,
    abi: ABI,
    functionName: "checkOwner",
    args: [address, params.articleId[0], params.articleId[1]],
  });
  const { data: Allowance } = useContractRead({
    address: token?.address,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any],
  });
  const { data: txreceipt } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (txreceipt) => {
      if (txreceipt) {
        showSuccessToast(`${url}/tx/${txreceipt.transactionHash}`);
      }
    },
  });
  useEffect(() => {
    if (txreceipt) {
      console.log("Receipt: ", txreceipt);
    }
  }, [txreceipt]);

  async function handleClick() {
    if (!address || amount === 0 || token === undefined) return;
    const inputAmount = amount * 10 ** (token?.decimals || 0);

    try {
      console.log("Allowance :>> ", Allowance);
      if (Allowance === undefined) return "Allowance is undefined";
      if (Allowance[0] < inputAmount) {
        console.log("Allowance is less than input amount");
        approve();
        showDefaultToast("Approving for Contract...");
      }

      donate();
      showDefaultToast("Sending Transaction...");
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error posting donation");
    }
  }

  useEffect(() => {
    async function fetchContent() {
      const result = await fetchData(params.articleId[0], params.articleId[2]);
      setContent(result);
      return result;
    }
    fetchContent();
  }, [params.articleId]);
  useEffect(() => {
    async function getComments() {
      const result = await readComments(
        params.articleId[0],
        params.articleId[1]
      );
      setComments(result);
      return result;
    }
    getComments();
  }, [comments, params.articleId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="flex justify-center text-3xl font-bold mb-5">
        {content?.title}
      </h1>
      <div className="flex flex-row gap-4">
        <div
          className="w-3/4 bg-white p-5 rounded shadow"
          dangerouslySetInnerHTML={{ __html: content?.value }}
        />
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
            {!address ? (
              <Button onClick={openConnectModal} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <MessageInput
                messages={messages}
                setMessages={setMessages}
                setToken={setToken}
                setAmount={setAmount}
                handleSend={handleSend}
                handleClick={handleClick}
                isDonated={history}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
