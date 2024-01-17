import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID!}`
);

export async function lookupAddress(address: `0x${string}` | undefined) {
  if (!address) return;
  let name = await provider.lookupAddress(address);
  return name ? name : address;
}
