"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSafeAA } from "@/providers/AccountAbstractionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import chains from "@/lib/Chains/chains";

const Header = () => {
  const {
    loginWeb3Auth,
    logoutWeb3Auth,
    address,
    sliceAddress,
    currentAddress,
    smartAccount,
    chain,
    chainId,
    setChainId,
    loading,
  } = useSafeAA();
  // 0xa6Fd859Eff69aE7EB5EfcC7e2576f39fed87B1b4
  const handleChain = (chain_prefix: string) => {
    setChainId(chain_prefix);
  };
  const chainConfig = chain;
  console.log("smartAccount: ", smartAccount);
  console.log("currentAddress: ", currentAddress);

  return (
    <div>
      <nav className=" border-gray-200 px-4 lg:px-6 py-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image src="/ColoredLogo.png" alt="Logo" width={100} height={24} />
          </Link>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto "
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="block py-2 pr-4 pl-3 text-gray-700 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  aria-current="page"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:order-2 gap-4">
            <Button asChild variant="secondary">
              <Link href="/post">New Post</Link>
            </Button>
            {/* <Select onValueChange={(value) => handleChain(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={chainConfig.label} />
              </SelectTrigger>
              <SelectContent>
                {chains
                  .filter(
                    (chain) => chain.paymaster //&& chain.transactionServiceUrl
                  )
                  .map((chain, index) => (
                    <SelectItem key={index} value={chain.hex}>
                      {chain.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select> 
            {address ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">{sliceAddress}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={() =>
                        navigator.clipboard.writeText(currentAddress)
                      }
                    >
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={logoutWeb3Auth}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {loading ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={loginWeb3Auth}>
                    Connect
                  </Button>
                )}
              </>
            )}
						*/}
            <ConnectButton
              showBalance={false}
              accountStatus={{ smallScreen: "address", largeScreen: "full" }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
