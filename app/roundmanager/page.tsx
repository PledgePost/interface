"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { ethers } from "ethers";
export default function RoundManager() {
  const { currentAddress, smartAccount, web3Provider, signer, handleUserOp } =
    useSafeAA();
  async function handleDeposit() {
    if (!currentAddress || !smartAccount) return;
    const amount = ethers.utils.parseEther("10000000");
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        require("../../abis/PledgePost.json").abi,
        signer
      );
      const tokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string,
        require("../../abis/Token.json").abi,
        signer
      );
      const mintTx = await tokenContract.populateTransaction.mint(
        currentAddress,
        amount
      );
      const approveTx = await tokenContract.populateTransaction.approve(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        amount
      );
      const depositTx = await contract.populateTransaction.deposit(1, amount);
      // await handleUserOp(mintTx, smartAccount);
      // await handleUserOp(approveTx, smartAccount);
      await handleUserOp(depositTx, smartAccount);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-row justify-center gap-4 p-4">
      <Button onClick={() => handleDeposit()}>Deposit</Button>
      <Button>Allocate</Button>
    </div>
  );
}
