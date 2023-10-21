"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/Comment/messages";
import MessageInput from "@/components/Comment/messageInput";
import { readComments, writeComment, Comment } from "@/hooks/useTableland";
import { Button } from "@/components/ui/button";

import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";
import { toChecksumAddress } from "ethereumjs-util";
import { TokenType } from "@/lib/Token/token";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pre } from "@/components/RichEditor";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { BigNumber, ethers } from "ethers";

const ABI = require("../../../abis/PledgePost.json").abi;
const TOKEN_ABI = require("../../../abis/Token.json").abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

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
  const [content, setContent] = useState<any>(null);
  const [messages, setMessages] = useState<string>("");
  const [token, setToken] = useState<TokenType | undefined>(undefined); //erc20 token
  const [isApproved, setIsApproved] = useState<boolean>();
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [amount, setAmount] = useState<any>(null);
  const [allowance, setAllowance] = useState<any>(null);
  const [donated, setDonated] = useState<boolean>();
  const {
    currentAddress,
    smartAccount,
    loginWeb3Auth,
    web3Provider,
    signer,
    handleUserOp,
    loadingTx,
  } = useSafeAA();

  let timestamp = new Date();
  let unix = timestamp.getTime();
  let UNIXtimestamp = Math.floor(unix / 1000);

  async function handleSend() {
    if (!currentAddress || messages === "") return;
    try {
      showDefaultToast("Sending Transaction...");
      const result = await writeComment({
        author: params.articleId[0],
        article_id: params.articleId[1],
        message: messages,
        user: smartAccount,
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
  const donate = async (inputAmount: any) => {
    if (!token?.address) return;
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const tx = await contract.populateTransaction.donateToArticle(
      params.articleId[0],
      params.articleId[1],
      token.address,
      inputAmount
    );
    await handleUserOp(tx, smartAccount);
  };
  const approve = async (inputAmount: any) => {
    if (!token?.address) return;
    const tokenAddress = process.env
      .NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string;
    const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);
    console.log("inputAmount :>> ", inputAmount);

    const tx = await contract.populateTransaction.approve(
      contractAddress,
      inputAmount
    );
    console.log("tx :>> ", tx);
    await handleUserOp(tx, smartAccount);
  };

  // TODO: fix this
  async function handleClick() {
    if (!currentAddress || !amount || !token || !smartAccount || !signer)
      return alert("Please connect wallet");
    const inputAmount = ethers.utils.parseUnits(amount, token.decimals);
    try {
      console.log("allowance :>> ", allowance);
      console.log("inputAmount :>> ", inputAmount);
      if (!allowance) return;
      if (allowance < inputAmount) {
        console.log("allowance is less than inputAmount");
        const approvalTx = await approve(inputAmount);
        console.log("approvalTx :>> ", approvalTx);
        await donate(inputAmount);
      }
      donate(inputAmount);
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error donating to article");
    }
  }
  useEffect(() => {
    if (!amount || !token?.decimals) return;
    const inputAmount = ethers.utils.parseUnits(amount, token?.decimals);
    const bool = allowance < inputAmount ? false : true;
    console.log("bool :>> ", bool);
    setIsApproved(bool);
  }, [amount, allowance]);
  useEffect(() => {
    const donationHistory = async () => {
      try {
        const contract = new ethers.Contract(
          contractAddress,
          ABI,
          web3Provider
        );

        const donated = await contract.checkOwner(
          currentAddress,
          params.articleId[0],
          params.articleId[1]
        );
        setDonated(donated);
      } catch (e) {
        console.log("error :>> ", e);
      }
    };
    const checkAllowance = async () => {
      if (!token?.address) return;
      try {
        const tokenContract = new ethers.Contract(
          token?.address,
          TOKEN_ABI,
          web3Provider
        );
        console.log("tokenContract :>> ", tokenContract);
        const allowance: BigNumber = await tokenContract.allowance(
          currentAddress,
          contractAddress
        );
        const tokenAllowance = ethers.utils.formatUnits(
          allowance,
          token?.decimals
        );
        setAllowance(allowance);
      } catch (e) {
        console.log("error :>> ", e);
      }
    };
    donationHistory();
    checkAllowance();
  }, [
    currentAddress,
    params.articleId,
    token?.address,
    token?.decimals,
    web3Provider,
  ]);
  useEffect(() => {
    async function fetchContent() {
      const result = await fetchData(params.articleId[0], params.articleId[2]);
      setContent(result);
      return result;
    }
    fetchContent();
  }, [params.articleId]);
  // useEffect(() => {
  //   async function getComments() {
  //     const result = await readComments(
  //       params.articleId[0],
  //       params.articleId[1]
  //     );
  //     setComments(result);
  //     return result;
  //   }
  //   getComments();
  // }, [comments, params.articleId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="flex justify-center text-3xl font-bold mb-5">
        {content?.title}
      </h1>
      <div className="flex flex-row gap-4">
        <div className="w-3/4 bg-white p-5 rounded shadow">
          <ReactMarkdown
            className="markdown overflow-auto"
            remarkPlugins={[remarkGfm]}
            components={{ pre: Pre }}
          >
            {content?.value}
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
              <Button onClick={loginWeb3Auth} className="w-full">
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
                isDonated={donated}
                isApproved={isApproved}
                loadingTx={loadingTx}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
