"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlloABI } from "@/abi/Allo";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { ProfileParams, createProfile } from "@/utils/registry";
import { showSuccessToast } from "@/hooks/useNotification";
import { DonationVotingABI } from "@/abi/DonationVoting";
import { getMerkleProof } from "@/utils/merkleProof";
import {
  buildStatusRow,
  decimalToBinary,
  updateStatusColumn,
} from "@/utils/buildStatusRow";

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

export interface Distribution {
  index: number;
  recipientId: `0x${string}`;
  amount: bigint;
  proof: string[];
}

const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();
const strategy = {
  address: process.env.NEXT_PUBLIC_STRATEGY_CONTRACT_ADDRESS as `0x${string}`,
  poolId: process.env.NEXT_PUBLIC_POOL_ID,
};

const ManagerPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

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

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...allo,
    functionName: "createPoolWithCustomStrategy",
  });
  const { write: reviewRecipient } = useContractWrite({
    address: strategy.address,
    abi: DonationVotingABI,
    functionName: "reviewRecipients",
  });
  const { write: updateDistribution } = useContractWrite({
    address: strategy.address,
    abi: DonationVotingABI,
    functionName: "updateDistribution",
  });
  const { write: distribute } = useContractWrite({
    ...allo,
    functionName: "distribute",
  });
  const { write: updatePool } = useContractWrite({
    address: strategy.address,
    abi: DonationVotingABI,
    functionName: "updatePoolTimestamps",
  });

  async function acceptRecipient() {
    // TODO: fix reveiwRecipient issue
    // only this recipient will be accepted
    // reviewRecipient({
    //   args: [[buildStatusRow(0, 2)], 4],
    // });
    console.log(buildStatusRow(0, 2));
    console.log(buildStatusRow(1, 2));
    console.log(buildStatusRow(2, 2));
    // const currentRow = 0b10101010; // Replace with the actual current row value
    // const recipientIndex = 2; // Replace with the actual recipient index
    // // const status = decimalToBinary(2); // Replace with the actual status
    // // console.log("status", status);
    // // const updatedRow = updateStatusColumn(currentRow, recipientIndex, status);
    // // console.log("Updated Row:", updatedRow); // Log the binary representation of the updated row
    // reviewRecipient({
    //   args: [
    //     [
    //       { index: 0, statusRow: 2 },
    //       { index: 1, statusRow: 32 },
    //       {
    //         index: 2,
    //         statusRow: 512,
    //       },
    //     ],
    //     4,
    //   ],
    // });
  }
  async function updatePoolTimestamps() {
    updatePool({
      args: [
        Math.floor(new Date().getTime() / 1000) + 10,
        Math.floor(new Date().getTime() / 1000) + 20,
        Math.floor(new Date().getTime() / 1000) + 30,
        1704944545,
      ],
    });
  }
  /**
   * 1704699214
   * 1704726000
   * 1704812400
   * 1704944545
   */
  async function handleCreatePool() {
    /* 
		 * block.timestamp < _registrationStartTime ||
      _registrationStartTime < _registrationEndTime ||
      _registrationStartTime < _allocationStartTime ||
      _allocationStartTime < _allocationEndTime ||
      _registrationEndTime < _allocationEndTime;
		*/
    const profileId = await createOwnerProfile();
    try {
      const initData: CreatePoolArgs = {
        version: "1.0.0",
        ownerProfileId: profileId,
        registrationStartTime: Math.floor(new Date().getTime() / 1000) + 10,
        registrationEndTime: Math.floor(new Date().getTime() / 1000) + 600,
        allocationStartTime: Math.floor(new Date().getTime() / 1000) + 601,
        allocationEndTime: Math.floor(new Date().getTime() / 1000) + 3000,
        amount: BigInt(100000000000000000),
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
        pointer: "PledgePostDonationTransferStrategy" + initData.version,
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
      setTimeout(() => {}, 5000);
      write({
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
      console.log(e);
    }
  }
  async function handleDistribute() {
    const distributions: any = [
      ["0x0c9001ea8a934Be6Dfa5eeC49DcFC52Cdb4C2f4c", BigInt(1000000000000000)], // index1
      ["0x517E2D669e58C37eBEFFDEbb049c7b1203A4b4E8", BigInt(100000000000000)], // index2
      ["0x11769dA1be8352B2A876aB85Fe449021800E37D6", BigInt(100000000000000)], // index3
    ];
    const { root, distributionsWithProof } = await getMerkleProof({
      distributions: distributions,
    });
    console.log("distributionsWithProof", distributionsWithProof);

    updateDistribution({
      args: [root, [BigInt(1), "Distribution"]],
    });
    setTimeout(() => {}, 5000);
    /**
     *struct Distribution {
        uint256 index;
        address recipientId;
        uint256 amount;
        bytes32[] merkleProof;
			}
     */
    const encodedDistributionsData: string =
      ethers.utils.defaultAbiCoder.encode(
        ["tuple(uint256, address, uint256, bytes32[])[]"],
        [
          distributionsWithProof.map((distribution) => [
            distribution.index,
            distribution.recipientId,
            distribution.amount,
            distribution.proof,
          ]),
        ]
      );
    const decodedDistributionsData: any = ethers.utils.defaultAbiCoder.decode(
      ["tuple(uint256, address, uint256, bytes32[])[]"],
      encodedDistributionsData
    );
    console.log("decodedDistributionsData", decodedDistributionsData);
    const recipientIds: `0x${string}`[] = distributionsWithProof.map(
      (distribution) => distribution.recipientId
    );
    console.log("recipientIds", recipientIds);

    distribute({
      args: [strategy.poolId, recipientIds, encodedDistributionsData],
    });
  }

  useEffect(() => {
    if (isSuccess && data && chain) {
      showSuccessToast(`${chain.blockExplorers?.default?.url}/tx/${data.hash}`);
    }
  }, [chain, data, isSuccess]);
  return (
    <div className="flex flex-row justify-center">
      <Button
        onClick={() => {
          handleCreatePool();
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
      <Button
        onClick={() => {
          handleDistribute();
        }}
      >
        Distribute
      </Button>
      <Button
        onClick={() => {
          updatePoolTimestamps();
        }}
      >
        Update Pool Timestamps
      </Button>
    </div>
  );
};

export default ManagerPage;
