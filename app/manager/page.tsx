"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { deployStrategy } from "@/utils/deployStrategy";
import { AlloABI } from "@/abi/Allo";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { ProfileParams, createProfile } from "@/utils/registry";
import { showSuccessToast } from "@/hooks/useNotification";
import { DonationVotingABI } from "@/abi/DonationVoting";
import { Distribution, getMerkleProof } from "@/utils/merkleProof";
import { buildStatusRow } from "@/utils/buildStatusRow";
import { wagmiConfig } from "@/providers/rainbowprovider";
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
const strategy = process.env
  .NEXT_PUBLIC_STRATEGY_CONTRACT_ADDRESS as `0x${string}`;

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
    ...allo,
    functionName: "createPoolWithCustomStrategy",
  });
  const { write: reviewRecipient } = useContractWrite({
    address: "0x23c4b10FF712CAaf7DA6A9c9eeDFa7C7739b7802",
    abi: DonationVotingABI,
    functionName: "reviewRecipients",
    args: [[buildStatusRow(0, 2)], 0],
  });
  const { write: updateDistribution } = useContractWrite({
    address: strategy,
    abi: DonationVotingABI,
    functionName: "updateDistribution",
  });
  const { write: distribute } = useContractWrite({
    ...allo,
    functionName: "distribute",
  });

  async function acceptRecipient() {
    reviewRecipient();
  }

  async function handleCreatePool() {
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
        registrationEndTime: Math.floor(new Date().getTime() / 1000) + 300,
        allocationStartTime: Math.floor(new Date().getTime() / 1000) + 310,
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
  }
  async function handleDistribute() {
    const recipientId = "0xb1f2d1a241ae813895102a8b7243803d10f70968";
    const distributions: Distribution[] = [
      {
        recipientId: recipientId,
        amount: BigInt(10000000000000000),
      },
      // { recipientId: "0x456", amount: BigInt(200) },
    ];
    const { root, distributionsWithProof } = await getMerkleProof({
      distributions: distributions,
    });

    console.log("distributionsWithProof", distributionsWithProof);
    const encodedMerkleRoot = ethers.utils.defaultAbiCoder.encode(
      ["bytes32"],
      [`0x${root}`]
    );

    // updateDistribution({
    //   args: [encodedMerkleRoot, [BigInt(1), "Distribution"]],
    // });
    setTimeout(() => {}, 5000);
    const encodedDistributionsData = ethers.utils.defaultAbiCoder.encode(
      ["tuple(uint256, address, uint256, bytes32[])[]"],
      [
        distributionsWithProof.map((distribution) => [
          distribution.index,
          distribution.recipientId,
          distribution.amount,
          distribution.merkleProof,
        ]),
      ]
    );
    distribute({
      args: [
        103,
        distributionsWithProof.map((distribution) => distribution.recipientId),
        encodedDistributionsData,
      ],
    });
  }
  console.log(chain?.blockExplorers);

  useEffect(() => {
    if (isSuccess && data && chain) {
      showSuccessToast(`${chain.blockExplorers?.default?.url}/tx/${data.hash}`);
    }
  }, [chain, data, isSuccess]);
  return (
    <div className="flex flex-row justify-center ">
      <Button
        onClick={() => {
          handleDistribute();
        }}
      >
        Create Pool
      </Button>
      <Button
        onClick={() => {
          acceptRecipient();
        }}
      >
        Accept Recipient
      </Button>
    </div>
  );
};

export default ManagerPage;

/**
flow 
- updateDistribution() on strategy
- distribute() on Allo 
    /// @notice Stores the details of the distribution.
    struct Distribution {
        uint256 index;
        address recipientId;
        uint256 amount;
        bytes32[] merkleProof;
    }
 */
