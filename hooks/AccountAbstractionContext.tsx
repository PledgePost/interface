"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";

import getChain from "../lib/Chains/getchains";
import { ChainId } from "@biconomy/core-types";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { IBundler, Bundler } from "@biconomy/bundler";

const clientId: string = (process.env.NEXT_PUBLIC_CLIENT_ID as string) || "";

const AccountAbstractionContext = createContext<any>(null);
export const AccountAbstractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [sliceAddress, setSliceAddress] = useState<string | null>(null);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>(null);
  const [currentAddress, setCurrentAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount | null>(
    null
  );

  // chainId should be selected by the user
  const [chainId, setChainId] = useState<any>("0x5");
  // initial chain: goerli
  const chain = getChain(chainId);
  // safes owned by the user
  const [safes, setSafes] = useState<string[]>([]);
  const [signer, setSigner] = useState<any>(undefined);
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    const init = async () => {
      if (!chain || !chain.id || !chain.hex) return;
      console.log("chain:", chain);
      try {
        const web3AuthOptions: Web3AuthOptions = {
          clientId: clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain.hex,
            rpcTarget: chain.rpcUrl,
          },
          uiConfig: {
            theme: "dark" as any,
            loginMethodsOrder: ["google", "facebook"],
          },
        };

        const modalConfig = {
          [WALLET_ADAPTERS.TORUS_EVM]: {
            label: "torus",
            showOnModal: false,
          },
          [WALLET_ADAPTERS.METAMASK]: {
            label: "metamask",
            showOnDesktop: true,
            showOnMobile: false,
          },
        };

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          adapterSettings: {
            uxMode: "popup",
          },
        });
        const web3AuthConfig: Web3AuthConfig = {
          txServiceUrl: chain.transactionServiceUrl,
        };

        const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);

        await web3AuthModalPack.init({
          options: web3AuthOptions,
          adapters: undefined,
          modalConfig: modalConfig,
        });
        setWeb3AuthModalPack(web3AuthModalPack);
        console.log("web3AuthModalPack: ", web3AuthModalPack);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, [chain]);

  // auth-kit implementation
  const loginWeb3Auth = useCallback(async () => {
    if (!web3AuthModalPack) return;

    try {
      if (!chain || !chain.id || !chain.hex) return;
      setLoading(true);
      const { safe, eoa } = await web3AuthModalPack.signIn();
      const provider = new ethers.providers.Web3Provider(
        web3AuthModalPack.getProvider()
      );
      const signer = provider.getSigner();

      const bundler: IBundler = new Bundler({
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chain.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
        chainId: chain.id,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });

      const paymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: chain?.paymaster as string,
      });
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: chain.id,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
      );
      biconomySmartAccount = await biconomySmartAccount.init();
      setCurrentAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setChainId(chain?.hex);
      setAddress(eoa);
      setSafes(safe || []);
      setWeb3Provider(provider);
      setSigner(signer);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [web3AuthModalPack, chain]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await loginWeb3Auth();
      })();
    }
  }, [web3AuthModalPack, loginWeb3Auth]);
  const logoutWeb3Auth = () => {
    if (!web3AuthModalPack) return;
    try {
      web3AuthModalPack?.signOut();
      setAddress("");
      setCurrentAddress("");
      setSmartAccount(null);
      setSafes([]);
      setChainId(chain?.hex);
      setWeb3Provider(undefined);
      setSigner(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentAddress) return;
    const addr = currentAddress.slice(0, 6) + "..." + currentAddress.slice(-4);
    setSliceAddress(addr);
  }, [currentAddress]);

  return (
    <AccountAbstractionContext.Provider
      value={{
        address,
        currentAddress,
        smartAccount,
        sliceAddress,
        web3Provider,
        signer,
        chainId,
        loading,
        setChainId,
        loginWeb3Auth,
        logoutWeb3Auth,
      }}
    >
      {children}
    </AccountAbstractionContext.Provider>
  );
};

export const useSafeAA = () => useContext(AccountAbstractionContext);
