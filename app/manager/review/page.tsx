"use client";
import { fetchData } from "@/lib/fetchData";
import { ALLO_GET_ARTICLES } from "@/lib/query";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

async function getAlloArticles() {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/63008/allo_pledgepost_arbsepolia/version/latest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLO_GET_ARTICLES,
      }),
    }
  ).then((res) => res.json());
  return response.data?.articles;
}

// TODO: get RecipientStatusUpdated event
// TODO: getRecipientStatus function
export default function Review() {
  const [articles, setArticles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getArticleStatus() {
      setIsLoading(true);
      const decoder = ethers.utils.defaultAbiCoder;
      const data = await getAlloArticles();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let decodedRegisterData = decoder.decode(
          ["bytes", "uint256"],
          data[i].registerd.data
        );
        let decodedRegisterParams = decoder.decode(
          ["address", "address", "tuple(uint256, string)"],
          decodedRegisterData[0]
        );
        let IPFS = await fetchData(
          decodedRegisterParams[1],
          decodedRegisterParams[2][1]
        );
        data[i] = {
          ...data[i],
          ...IPFS,
          recipientIndex: BigNumber.from(decodedRegisterData[1]).toNumber(),
        };
      }
      setArticles(data);
      setIsLoading(false);
    }
    getArticleStatus();
  }, []);
  return <div>review recipient</div>;
}
