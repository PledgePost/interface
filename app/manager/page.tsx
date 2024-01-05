"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { deployStrategy } from "@/utils/deployStrategy";
import { AlloABI } from "@/abi/Allo";
import { useAccount, useContractWrite } from "wagmi";
import { ethers } from "ethers";
export interface CreatePoolArgs {
  version: string;
  ownerProfileId: string;
  registrationStartTime: number;
  registrationEndTime: number;
  allocationStartTime: number;
  allocationEndTime: number;
  amount: bigint | undefined;
  manager: [`0x${string}` | undefined];
}
const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();

const ManagerPage = () => {
  const { address } = useAccount();
  // async function deploy() {
  //   const strategy = await deployStrategy();
  //   return strategy;
  // }
  const strategy = "0xf5C3F19Ae7202Fb727146420b0498B2f74b75CdF";
  const initData: CreatePoolArgs = {
    version: "1.0.0",
    ownerProfileId:
      "0xeaee9fcf238cf3bf7068ab46ad40b880a62b4afec9c02bcd5818ffed677c3d72",
    registrationStartTime: Math.floor(new Date().getTime() / 1000) + 100,
    registrationEndTime: Math.floor(new Date().getTime() / 1000) + 300,
    allocationStartTime: Math.floor(new Date().getTime() / 1000) + 500,
    allocationEndTime: Math.floor(new Date().getTime() / 1000) + 1000,
    amount: BigInt(10000000000000000),
    manager: [address],
  };

  console.log("initData", initData);
  const { data, isLoading, write } = useContractWrite({
    address: allo.address,
    abi: allo.abi,
    functionName: "createPoolWithCustomStrategy",
    value: initData.amount,
  });

  async function createPool() {
    const requiredParams = {
      useRegistryAnchor: true,
      metadataRequired: true,
      registrationStartTime: BigInt(initData.registrationStartTime),
      registrationEndTime: BigInt(initData.registrationEndTime),
      allocationStartTime: BigInt(initData.allocationStartTime),
      allocationEndTime: BigInt(initData.allocationEndTime),
      allowedTokens: [NATIVE],
    };

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      [
        "tuple(bool useRegistryAnchor, bool metadataRequired, uint64 registrationStartTime, uint64 registrationEndTime, uint64 allocationStartTime, uint64 allocationEndTime, address[] allowedTokens)",
      ],
      [requiredParams]
    );
    console.log("encodedParams", encodedParams);
    const metadata = {
      protocol: BigInt(1),
      pointer: "PledgePostDonationTransferStrategy" + initData.version,
    };
    const initializeParams = {
      ownerProfileId: initData.ownerProfileId,
      strategy: `0x${strategy}`,
      requiredParams: encodedParams,
      token: NATIVE,
      amount: initData.amount,
      metadata: metadata,
      managers: initData.manager,
    };
    console.log("initializeParams", initializeParams);
    write({
      args: [
        initData.ownerProfileId,
        strategy,
        encodedParams,
        NATIVE,
        initData.amount,
        metadata,
        initData.manager,
      ],
    });
    // poolId: 74
  }
  return (
    <div className="flex flex-row justify-center ">
      <Button
        onClick={() => {
          createPool();
        }}
      >
        Create Pool
      </Button>
    </div>
  );
};

export default ManagerPage;
