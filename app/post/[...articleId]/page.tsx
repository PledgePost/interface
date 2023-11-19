"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/Comment/messages";
import MessageInput from "@/components/Comment/messageInput";
import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/hooks/useNotification";
import { toChecksumAddress } from "ethereumjs-util";
import { TokenType } from "@/lib/Token/token";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pre } from "@/components/RichEditor";
import { useSafeAA } from "@/providers/AccountAbstractionContext";
import { BigNumber, ethers } from "ethers";
import { SalesCard, SubscriptionCard } from "@/components/Card";
import { GET_ARTICLES_BY_ID_AND_ADDRESS } from "@/lib/query";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Comment, getComments, insertComment } from "@/hooks/useSupabase";

const ABI = require("../../../abis/PledgePost.json").abi;
const TOKEN_ABI = require("../../../abis/Token.json").abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/52298/pledgepost_mumbai/version/latest",
  cache: new InMemoryCache(),
});

async function fetchData(address: any, cid: string) {
  const checksumAddress = toChecksumAddress(address);
  const url = `https://ipfs.io/ipfs/${cid}/pledgepost:${checksumAddress}`;
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
  const [donation, setDonation] = useState<any>(null);
  const [donors, setDonors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [estimatedAllocation, setEstimatedAllocation] = useState<any>(null);

  const {
    currentAddress,
    smartAccount,
    loginWeb3Auth,
    provider,
    signer,
    handleUserOp,
    loadingTx,
  } = useSafeAA();

  console.log("provider :>> ", provider);

  async function fetchComments() {
    const comments = await getComments(
      params.articleId[0],
      params.articleId[1]
    );
    setComments(comments);
  }

  async function handleSend() {
    if (!currentAddress || messages === "" || !signer) return;
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

  async function handleClick() {
    if (!currentAddress || !amount || !token || !smartAccount || !signer)
      return alert("Please connect wallet");
    const inputAmount = ethers.utils.parseUnits(amount, token.decimals);
    const noLimitAllowance = ethers.utils.parseUnits(
      "100000000000000000000",
      18
    );
    try {
      if (!allowance) return;
      if (allowance < inputAmount) {
        console.log("allowance is less than inputAmount");
        const approvalTx = await approve(noLimitAllowance);
        await donate(inputAmount);
      } else {
        donate(inputAmount);
      }
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error donating to article");
    }
  }
  async function getArticleByIdandAddress(address: string, id: string) {
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
    const fetchArticle = async () => {
      const lowercaseAddress = params.articleId[0].toLowerCase();
      const article = await getArticleByIdandAddress(
        lowercaseAddress,
        params.articleId[1]
      );
      if (!article) return;
    };
    fetchArticle();
  }, [params.articleId]);
  useEffect(() => {
    if (!amount || !token?.decimals) return;
    const inputAmount = ethers.utils.parseUnits(amount, token?.decimals);
    const bool = allowance < inputAmount ? false : true;

    setIsApproved(bool);
  }, [amount, allowance, token?.decimals]);
  useEffect(() => {
    const donationHistory = async () => {
      try {
        const contract = new ethers.Contract(contractAddress, ABI, provider);
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
      setIsLoading(true);
      try {
        const tokenContract = new ethers.Contract(
          token?.address,
          TOKEN_ABI,
          provider
        );
        const allowance: BigNumber = await tokenContract.allowance(
          currentAddress,
          contractAddress
        );
        setAllowance(allowance);
        setIsLoading(false);
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
    provider,
  ]);
  useEffect(() => {
    async function fetchContent() {
      const result = await fetchData(params.articleId[0], params.articleId[2]);
      setContent(result);
      return result;
    }
    async function fetchDonationHistory() {
      if (!provider) return;

      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const donation = await contract.getDonatedAmount(
        params.articleId[0],
        params.articleId[1]
      );

      const amount = await contract.getMatchingAmount(
        1, // TODO: fetch roundId
        params.articleId[0],
        params.articleId[1]
      );
      setDonation(ethers.utils.formatUnits(donation, 18));
      setEstimatedAllocation(ethers.utils.formatUnits(amount, 18));
    }
    fetchDonationHistory();
    fetchContent();
    fetchComments();
  }, [params.articleId, provider]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="flex justify-center text-3xl font-bold mb-5">
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
