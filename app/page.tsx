"use client";
const ABI = require("../abis/Token.json").abi;
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { Button } from "@/components/ui/button";
import { BiconomySmartAccount } from "@biconomy/account";

const contractAddress = process.env
  .NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string;
interface Props {
  smartAccount: BiconomySmartAccount;
  address: string;
  provider: ethers.providers.Provider;
}
export default function Home() {
  const {
    loginWeb3Auth,
    logoutWeb3Auth,
    address,
    sliceAddress,
    currentAddress,
    smartAccount,
    web3Provider,
    signer,
    chain,
    chainId,
    setChainId,
    loading,
    handleUserOp,
  } = useSafeAA();
  const [minted, setMinted] = useState(false);
  console.log("provider: ", web3Provider);
  console.log("signer: ", signer);

  const handleMint = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    console.log("contract: ", contract);

    try {
      const mintTx = await contract.populateTransaction.mint(
        currentAddress,
        10000
      );
      await handleUserOp(mintTx, smartAccount);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
      {currentAddress && (
        <Button onClick={handleMint} disabled={minted}>
          Mint
        </Button>
      )}
    </main>
  );
}
