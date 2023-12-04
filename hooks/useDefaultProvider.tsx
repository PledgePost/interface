"use client";
import { ethers } from "ethers";
export default function useDefaultProvider() {
  const url = `https://optimism-goerli.infura.io/v3/${process.env
    .NEXT_PUBLIC_INFURA_KEY!}`;
  const provider: any = new ethers.providers.JsonRpcProvider(url);
  return provider;
}
