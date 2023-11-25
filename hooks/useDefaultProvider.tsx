"use client";
import { ethers } from "ethers";
const url = `https://optimism-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export default function useDefaultProvider() {
  const provider: any = new ethers.providers.JsonRpcProvider(url);
  return provider;
}
