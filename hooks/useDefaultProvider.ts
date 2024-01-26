"use client";
import { ethers } from "ethers";
const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY!;
export default function useDefaultProvider() {
  const url: string = `https://optimism-goerli.infura.io/v3/${INFURA_KEY}`;
  const provider: ethers.providers.JsonRpcProvider =
    new ethers.providers.JsonRpcProvider(url);
  return provider;
}
