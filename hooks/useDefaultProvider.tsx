"use client";
import { ethers } from "ethers";
const INFULA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY!;
export default function useDefaultProvider() {
  const url = `https://optimism-goerli.infura.io/v3/${INFULA_KEY}`;
  const provider: any = new ethers.providers.JsonRpcProvider(url);
  return provider;
}
