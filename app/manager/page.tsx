"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { deployStrategy } from "@/utils/deployStrategy";
import { AlloABI } from "@/abi/Allo";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { ProfileParams, createProfile } from "@/utils/registry";
import { showSuccessToast } from "@/hooks/useNotification";
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
const strategy = "0xF4Fb31B1D7e3e4Ecf188052E89Fc29300AE1277A";

const ManagerPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  // async function deploy() {
  //   const strategy = await deployStrategy();
  //   return strategy;
  // }

  const createOwnerProfile = async () => {
    if (!address) return;
    const ownerProfileId = await createProfile({
      pointer: "PledgePostDonationTransferStrategy",
      owner: address,
      members: [address],
    });
    return ownerProfileId;
  };

  const profileId =
    "0xeaee9fcf238cf3bf7068ab46ad40b880a62b4afec9c02bcd5818ffed677c3d72";

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: allo.address,
    abi: allo.abi,
    functionName: "createPoolWithCustomStrategy",
  });

  async function createPool() {
    // const profileId = await createOwnerProfile();
    /* 
		 * block.timestamp < _registrationStartTime ||
      _registrationStartTime < _registrationEndTime ||
      _registrationStartTime < _allocationStartTime ||
      _allocationStartTime < _allocationEndTime ||
      _registrationEndTime < _allocationEndTime;
		*/

    try {
      const initData: CreatePoolArgs = {
        version: "1.0.0",
        ownerProfileId: profileId,
        registrationStartTime: Math.floor(new Date().getTime() / 1000) + 10,
        registrationEndTime: Math.floor(new Date().getTime() / 1000) + 3000,
        allocationStartTime: Math.floor(new Date().getTime() / 1000) + 5000,
        allocationEndTime: Math.floor(new Date().getTime() / 1000) + 10000,
        amount: BigInt(10000000000000000),
        manager: [address],
      };

      const requiredParams = {
        useRegistryAnchor: false,
        metadataRequired: false,
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
        value: initData.amount,
      });
    } catch (e) {
      console.log(e);
    }
    // poolId: 84
  }
  useEffect(() => {
    if (isSuccess && data && chain) {
      showSuccessToast(
        `${chain.blockExplorers?.etherscan?.url}/tx/${data.hash}`
      );
    }
  }, [chain, data, isSuccess]);
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
