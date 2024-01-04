"use client";
import { deployStrategy } from "@/utils/deployStrategy";
import { AlloABI } from "@/abi/Allo";
import { useAccount, useContractWrite } from "wagmi";
import { ethers } from "ethers";
const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();

interface CreatePoolArgs {
  version: string;
  ownerProfileId: string;
  registrationStartTime: number;
  registrationEndTime: number;
  allocationStartTime: number;
  allocationEndTime: number;
  amount: bigint | undefined;
  manager: string[];
}

export default function CreatePool(CreatePoolArgs: CreatePoolArgs) {
  const strategy = deployStrategy();
  const { data, isLoading, write } = useContractWrite({
    address: allo.address,
    abi: allo.abi,
    functionName: "createPoolWithCustomStrategy",
    value: CreatePoolArgs.amount,
  });

  const requiredParams = {
    useRegistryAnchor: true,
    metadataRequired: true,
    registrationStartTime: BigInt(CreatePoolArgs.registrationStartTime),
    registrationEndTime: BigInt(CreatePoolArgs.registrationEndTime),
    allocationStartTime: BigInt(CreatePoolArgs.allocationStartTime),
    allocationEndTime: BigInt(CreatePoolArgs.allocationEndTime),
    allowedTokens: [NATIVE],
  };

  const encodedParams = ethers.utils.defaultAbiCoder.encode(
    [
      "tuple(bool useRegistryAnchor, bool metadataRequired, uint64 registrationStartTime, uint64 registrationEndTime, uint64 allocationStartTime, uint64 allocationEndTime, address[] allowedTokens)",
    ],
    [requiredParams]
  );
  const metadata = {
    protocol: BigInt(1),
    pointer: "PledgePostDonationTransferStrategy" + CreatePoolArgs.version,
  };
  const initializeParams = {
    ownerProfileId: CreatePoolArgs.ownerProfileId,
    strategy: strategy,
    requiredParams: encodedParams,
    token: NATIVE,
    amount: CreatePoolArgs.amount,
    metadata: metadata,
    managers: CreatePoolArgs.manager,
  };
  write({ args: [initializeParams] });
}
