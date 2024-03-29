"use client";
import { HypercertClient } from "@hypercerts-org/sdk";
import { useMemo } from "react";
import { useNetwork } from "wagmi";

export const useHypercertClient = () => {
  const { chain } = useNetwork();

  // The SDK will throw an error if the chain is not supported
  const isSupportedChain = (chainId: number) => {
    return chainId === 10 || chainId === 11155111 || chainId === 42220;
  };

  const client: HypercertClient | undefined = useMemo(
    () =>
      chain && isSupportedChain(chain.id)
        ? new HypercertClient({ chain: { id: chain.id } })
        : undefined,
    [chain]
  );

  return { client };
};
