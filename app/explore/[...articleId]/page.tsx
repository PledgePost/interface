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
import { toChecksumAddress } from "ethereumjs-util";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pre } from "@/components/RichEditor";
import { ethers } from "ethers";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { GET_ARTICLES_BY_ID_AND_ADDRESS } from "@/lib/query";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Comment, getComments, insertComment } from "@/hooks/useSupabase";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { parseEther } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import useDefaultProvider from "@/hooks/useDefaultProvider";
import { ABIs as ABI } from "@/constants";
import { fetchETHprice } from "@/lib/coingecko";
import Image from "next/image";
import { Content } from "@/types";
// TODO: fix Image witdth and height

const PledgeContract = {
  address: ABI.contractAddress as any,
  abi: ABI.abi,
};
const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/pledgepost_opgoerli/version/latest",
  cache: new InMemoryCache(),
});

async function fetchData(address: any, cid: string) {
  const checksumAddress = toChecksumAddress(address);
  const url = `https://ipfs.io/ipfs/${cid}/pledgepost:${checksumAddress}`;
  const res = await fetch(url, {
    cache: "force-cache",
  });
  const content: Content = await res.json();
  return content;
}

export default function ArticlePage({ params }: any) {
  const [content, setContent] = useState<Content | undefined>(undefined);
  const [messages, setMessages] = useState<string>("");
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);
  const [amount, setAmount] = useState<any>(null);
  const [donation, setDonation] = useState<any>(null);
  const [donors, setDonors] = useState<any>(null);
  const [isDonated, setIsDonated] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const provider: ethers.providers.JsonRpcProvider = useDefaultProvider();
  const [estimatedAllocation, setEstimatedAllocation] = useState<any>(null);
  const { openConnectModal } = useConnectModal();
  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();
  useEffect(() => {
    if (!currentAddress || !provider) return;
    async function checkDonation() {
      const contract = new ethers.Contract(
        ABI.contractAddress,
        ABI.abi,
        provider
      );
      const data = await contract.checkOwner(
        currentAddress,
        params.articleId[0],
        params.articleId[1]
      );
      setIsDonated(data);
    }
    checkDonation();
  }, [currentAddress, params.articleId, provider]);
  const {
    data,
    isLoading: isLoadingTx,
    isSuccess,
    write,
  } = useContractWrite({
    ...PledgeContract,
    functionName: "donateToArticle",
  });
  async function fetchComments() {
    const comments = await getComments(
      params.articleId[0],
      params.articleId[1]
    );
    setComments(comments);
  }

  async function handleComment() {
    if (!currentAddress || messages === "") return;
    try {
      await insertComment(
        params.articleId[0],
        params.articleId[1],
        currentAddress,
        messages
      );
      setMessages("");
      await fetchComments();
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error posting comment");
    }
  }

  const handleDonate = async () => {
    if (!currentAddress) return alert("Please connect wallet");
    if (!amount) return alert("Please enter amount");
    let lowercaseAddress = currentAddress.toLowerCase();
    if (lowercaseAddress === params.articleId[0])
      return alert("You cannot donate to your own article");
    try {
      showDefaultToast("Sending Transaction...");
      write({
        args: [params.articleId[0], params.articleId[1]],
        value: parseEther(amount),
      });
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error donating to article");
    }
  };
  async function getArticleByIdandAddress(address: any, id: any) {
    const response = await client.query({
      query: GET_ARTICLES_BY_ID_AND_ADDRESS,
      variables: {
        authorAddress: address,
        articleId: id,
      },
      fetchPolicy: "no-cache",
    });
    if (!response || !response.data || !response.data.articles) return;
    return response.data.articles[0];
  }
  useEffect(() => {
    if (!data || !chain) return;
    if (isSuccess) {
      showSuccessToast(
        `${chain?.blockExplorers?.etherscan?.url}/tx/${data.hash}`
      );
    } else {
      showErrorToast("Error donating to article");
    }
  }, [chain, data, isSuccess]);

  useEffect(() => {
    async function fetchContent() {
      const result = await fetchData(params.articleId[0], params.articleId[2]);
      setContent(result);
      return result;
    }
    const fetchArticleInfo = async () => {
      const lowercaseAddress = params.articleId[0].toLowerCase();
      const article = await getArticleByIdandAddress(
        lowercaseAddress,
        params.articleId[1]
      );
      if (article.donations.length > 0) {
        let totalAmount = 0;
        for (let i = 0; i < article.donations.length; i++) {
          let donationAmount = ethers.utils.formatEther(
            article.donations[i].amount
          );
          totalAmount += parseFloat(donationAmount);
        }
        const ETHUSDC = await fetchETHprice();
        const USDValue = totalAmount * ETHUSDC;
        setDonation(USDValue);
        setDonors(article.donations.length);
      }
    };

    fetchContent();
    fetchComments();
    fetchArticleInfo();
  }, [params.articleId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Image
        className="flex justify-center mx-auto"
        src={content?.coverImage || "https://picsum.photos/800/400"}
        alt="cover image"
        width={800}
        height={400}
      />
      <h1 className="flex justify-center text-3xl font-bold my-5">
        {content?.title}
      </h1>
      <div className="flex flex-row gap-4 my-4 justify-center">
        <SalesCard
          title="Recieved Donation"
          amount={donation || 0}
          isLoading={isLoading}
        />
        <SalesCard
          title="Estimated Matching"
          isLoading={isLoading}
          amount={estimatedAllocation || 0}
        />
        <SubscriptionCard
          title="Contributors"
          amount={donors || 0}
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
              <Button onClick={openConnectModal} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <MessageInput
                messages={messages}
                setMessages={setMessages}
                setAmount={setAmount}
                handleSend={handleComment}
                handleClick={handleDonate}
                isDonated={isDonated}
                loadingTx={isLoadingTx}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
