import { CreateProfileArgs } from "@allo-team/allo-v2-sdk/dist/Registry/types";
import { TransactionData } from "@allo-team/allo-v2-sdk/dist/Common/types";
import { registry } from "@/utils/allo";
import { RegistryABI } from "@/abi/Registry";
import { wagmiConfig } from "@/providers/rainbowprovider";
import { getEventValues } from "@/utils/common";
import { sendTransaction } from "@wagmi/core";

export interface ProfileParams {
  pointer: any;
  owner: `0x${string}` | undefined;
  members: [`0x${string}` | undefined];
}

export async function createProfile({
  pointer,
  owner,
  members,
}: ProfileParams) {
  // Prepare the transaction arguments
  // types CreateProfileArgs
  const createProfileArgs: CreateProfileArgs = {
    // random number to prevent nonce reuse, this is required.
    // NOTE: The profile ID id based on the provided nonce and the caller's address.
    nonce: Math.floor(Math.random() * 10000),
    name: "PledgePost Profile",
    metadata: {
      protocol: BigInt(1),
      pointer: pointer,
    },
    members: [String(members)], // members: [`0x${string}` | undefined];
    owner: String(owner), //  owner: `0x${string}` | undefined;
  };
  console.log("Creating profile with args: ", createProfileArgs);

  // Create the transaction with the arguments
  const txData: TransactionData = await registry.createProfile(
    createProfileArgs
  );

  const txHash = await sendTransaction({
    to: txData.to,
    data: txData.data,
    value: BigInt(txData.value),
  });

  const receipt = await wagmiConfig.publicClient.waitForTransactionReceipt({
    hash: txHash.hash,
    confirmations: 2,
  });

  const profileId =
    getEventValues(receipt, RegistryABI, "ProfileCreated").profileId || "0x";

  if (profileId === "0x") {
    throw new Error("Profile creation failed");
  } else {
    console.log("Profile created: ", profileId);
  }

  return profileId;
}
