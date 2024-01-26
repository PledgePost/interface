"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, useNetwork } from "wagmi";

import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";
import { RoundCard } from "@/components/Round/RoundCard";
import { AlloABI } from "@/abi/Allo";
import { CreatePoolArgs } from "../page";
import { createProfile } from "@/utils/registry";
import { parseEther } from "viem";

const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();
const strategy = {
  address: process.env.NEXT_PUBLIC_STRATEGY_CONTRACT_ADDRESS as `0x${string}`,
  poolId: process.env.NEXT_PUBLIC_POOL_ID,
};
const CreateRound = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [allocationStartDate, setAllocationStartDate] = React.useState<Date>();
  const [amount, setAmount] = useState<number | undefined>();
  const [allocationEndDate, setAllocationEndDate] = React.useState<Date>();
  const [name, setName] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const {
    data,
    isLoading,
    isSuccess,
    write: createPool,
  } = useContractWrite({
    ...allo,
    functionName: "createPoolWithCustomStrategy",
  });
  const createOwnerProfile = async () => {
    if (!address) return;
    const ownerProfileId = await createProfile({
      pointer: "PledgePostDonationTransferStrategy",
      name: "PledgePost Owner Profile",
      owner: address,
      members: [address],
    });
    return ownerProfileId;
  };
  const handleCreateRound = async () => {
    if (
      !startDate ||
      !endDate ||
      !allocationStartDate ||
      !allocationEndDate ||
      !name ||
      !amount ||
      !description
    )
      return alert("Please fill all fields");

    const profileId = await createOwnerProfile();
    /* 
		 * block.timestamp < _registrationStartTime ||
      _registrationStartTime < _registrationEndTime ||
      _registrationStartTime < _allocationStartTime ||
      _allocationStartTime < _allocationEndTime ||
      _registrationEndTime < _allocationEndTime;
		*/
    const initData: CreatePoolArgs = {
      version: "1.0.0",
      ownerProfileId: profileId,
      registrationStartTime: Math.floor(new Date().getTime() / 1000) + 10,
      registrationEndTime: Math.floor(endDate.getTime() / 1000),
      allocationStartTime: Math.floor(allocationStartDate.getTime() / 1000),
      allocationEndTime: Math.floor(allocationEndDate.getTime() / 1000),
      amount: parseEther(amount.toString()),
      manager: [address],
    };

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
      pointer: "PledgePostStrategy" + name,
    };
    const initializeParams = {
      ownerProfileId: initData.ownerProfileId,
      strategy: `0x${strategy.address}`,
      requiredParams: encodedParams,
      token: NATIVE,
      amount: initData.amount,
      metadata: metadata,
      managers: initData.manager,
    };
    console.log("initializeParams", initializeParams);
    try {
      showDefaultToast();
      setTimeout(() => {}, 5000);
      createPool({
        args: [
          initData.ownerProfileId,
          strategy.address,
          encodedParams,
          NATIVE,
          initData.amount,
          metadata,
          initData.manager,
        ],
        value: initData.amount,
      });
    } catch (e) {
      console.error(e);
      showErrorToast("Failed to create round");
    }
  };
  useEffect(() => {
    if (isSuccess && data && chain) {
      showSuccessToast(
        `${chain.blockExplorers?.etherscan?.url}/tx/${data.hash}`
      );
    }
  }, [chain, data, isSuccess]);

  return (
    <div className="flex justify-center">
      <RoundCard
        props={{
          startDate,
          endDate,
          setStartDate,
          setEndDate,
          allocationStartDate,
          allocationEndDate,
          setAllocationStartDate,
          setAllocationEndDate,
          amount,
          setAmount,
          setName,
          setDescription,
          handleCreateRound,
        }}
      />
    </div>
  );
};

export default CreateRound;
