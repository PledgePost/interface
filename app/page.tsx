"use client";
const contractAddress = "0x40a3fc5965066c367c9f6e309fefc4414a63c6fb";
const ABI = require("../abis/Token.json").abi;
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { Button } from "@/components/ui/button";
import {
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from "@biconomy/paymaster";
import { BiconomySmartAccount } from "@biconomy/account";
import { showDefaultToast, showSuccessToast } from "@/hooks/useNotification";

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
  } = useSafeAA();
  const [minted, setMinted] = useState(false);
  console.log("provider: ", web3Provider);
  console.log("signer: ", signer);

  const handleMint = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    console.log("contract: ", contract);

    try {
      showDefaultToast("Minting 10000 tokens");
      const mintTx = await contract.populateTransaction.mint(
        currentAddress,
        10000
      );
      console.log("mintTx: ", mintTx.data);
      const tx1 = {
        to: contractAddress,
        data: mintTx.data,
      };
      console.log("here before userop");
      let userOp = await smartAccount.buildUserOp([tx1]);
      console.log("useOp", userOp);
      const biconomyPaymaster =
        smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: "BICONOMY",
          version: "2.0.0",
        },
      };
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData
        );
      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log("userOpHash", userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
      setMinted(true);
      showSuccessToast(
        `https://goerli.etherscan.io/tx/${receipt.transactionHash}`,
        "Minted 10000 tokens"
      );
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
