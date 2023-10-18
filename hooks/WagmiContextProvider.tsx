"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useContractWrite,
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
} from "wagmi";


const WagmiContext = createContext<any>(null);

export const WagmiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contract = {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any,
    abi: require("../abis/PledgePost.json").abi,
  };

  const [roundId, setRoundId] = useState<number>(0);
  const [articleId, setArticleId] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [token, setToken] = useState<any>(null);
  const [author, setAuthor] = useState<any>("");
  const [userAddress, setUserAddress] = useState<any>("");
  const [donation, setDonation] = useState<any>(0);
  const { write: createRound } = useContractWrite({
    ...contract,
    functionName: "createRound",
    args: [
      "0x5CA1ED81795F5fE7174D8baA64c5d1B7bBB2b439",
      "Test Round",
      1699509663,
      1702101663,
    ],
  });
  const { write: applyForRound } = useContractWrite({
    ...contract,
    functionName: "applyForRound",
    args: [roundId, articleId],
  });
  const { write: donate } = useContractWrite({
    ...contract,
    functionName: "donateToArticle",
    args: [
      author,
      articleId,
      token?.address,
      donation * 10 ** (token?.decimals || 0),
    ],
  });
  const { write: activateRound } = useContractWrite({
    ...contract,
    functionName: "activateRound",
    args: [roundId],
  });
  const { write: deposit } = useContractWrite({
    ...contract,
    functionName: "deposit",
    args: [roundId, depositAmount * 10 ** 18],
  });
  const { data: history } = useContractRead({
    ...contract,
    functionName: "checkOwner",
    args: [userAddress, author, articleId],
  });
  const { data: Allowance } = useContractRead({
    address: "0x5CA1ED81795F5fE7174D8baA64c5d1B7bBB2b439",
    abi: require("../abis/Token.json").abi,
    functionName: "allowance",
    args: [userAddress, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any],
  });

  const { write: approve } = useContractWrite({
    address: "0x5CA1ED81795F5fE7174D8baA64c5d1B7bBB2b439",
    abi: require("../abis/Token.json").abi,
    functionName: "approve",
    args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as any, 100000 * 10 ** 18],
  });

  return (
    <WagmiContext.Provider
      value={{
        roundId,
        setRoundId,
        articleId,
        setArticleId,
        depositAmount,
        setDepositAmount,
        token,
        setToken,
        author,
        setAuthor,
        userAddress,
        setUserAddress,
        donation,
        setDonation,
        createRound,
        applyForRound,
        donate,
        activateRound,
        deposit,
        history,
        Allowance,
        approve,
      }}
    >
      {children}
    </WagmiContext.Provider>
  );
};
export const useWagmiContextProvider = () => useContext(WagmiContext);
