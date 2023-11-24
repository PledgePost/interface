"use client";
import { ethers } from "ethers";
const url = `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const provider: any = new ethers.providers.JsonRpcProvider(url);
