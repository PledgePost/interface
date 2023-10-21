"use client";
const ABI = require("../abis/Token.json").abi;
import { ethers } from "ethers";
import Image from "next/image";
import vercel from "../public/vercel.svg";
import polygonLogo from "../public/polygon-logo-colored.svg";
import polygonToken from "../public/polygon-token.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, use } from "react";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { BiconomySmartAccount } from "@biconomy/account";
import { getAllRoundData } from "@/lib/fetchData";
import Link from "next/link";

interface Props {
  smartAccount: BiconomySmartAccount;
  address: string;
  provider: ethers.providers.Provider;
}
export default function Home() {
  const rounds = use(getAllRoundData());

  return (
    <div className="flex flex-wrap gap-[26px] md:p-12 p-4">
      {rounds.length === 0 ? (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          No round available
        </p>
      ) : (
        <>
          {rounds.map((round: any, index: number) => (
            <div
              key={index}
              className="rounded-[15px] bg-white cursor-pointer shadow-lg"
            >
              <div className="w-[400px] ">
                <Image
                  src={polygonLogo}
                  alt="roundImage"
                  className="w-full h-[158px] object-contain rounded-[15px] p-2"
                  priority
                />
              </div>
              <div className="flex flex-col p-4">
                <div className="flex items-center mt-[10px] gap-[12px]">
                  <Avatar>
                    <AvatarImage src="/polygon-token.svg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
                    {round.name}
                  </h3>
                </div>
                <div className="flex justify-between flex-wrap mt-[10px] gap-2">
                  <div className="flex flex-col">
                    <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px]">
                      Start: {round.startDate} - End: {round.endDate}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
