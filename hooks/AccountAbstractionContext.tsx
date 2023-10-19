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
import { Web3AuthModalPack } from "@safe-global/auth-kit";
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

  // initial chain: goerli
  const chain = getChain("0x5");
  // safes owned by the user
  const [safes, setSafes] = useState<string[]>([]);
  // chainId should be selected by the user
  const [chainId, setChainId] = useState<any>("");

  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<any>(undefined);

  useEffect(() => {
    const init = async () => {
      if (!chain) return;
      try {
        const options: Web3AuthOptions = {
          clientId: clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain.id,
            rpcTarget: chain.rpcUrl,
          },
          uiConfig: {
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

        const web3AuthModalPack = new Web3AuthModalPack({
          txServiceUrl: chain.transactionServiceUrl,
        });

        await web3AuthModalPack.init({
          options,
          adapters: [openloginAdapter],
          modalConfig,
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
      setLoading(true);
      const { safe, eoa } = await web3AuthModalPack.signIn();
      const provider = new ethers.providers.Web3Provider(
        web3AuthModalPack.getProvider()
      );
      const signer = provider.getSigner();

      const bundler: IBundler = new Bundler({
        bundlerUrl:
          "https://bundler.biconomy.io/api/v2/5/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
        chainId: ChainId.GOERLI,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });

      const paymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: process.env
          .NEXT_PUBLIC_BICONOMY_PAYMASTER_GOERLI as string,
      });
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: ChainId.GOERLI,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
      );
      biconomySmartAccount = await biconomySmartAccount.init();
      setCurrentAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setChainId(chain?.id);
      setAddress(eoa);
      setSafes(safe || []);
      setWeb3Provider(provider);
      setSigner(signer);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [chain?.id, web3AuthModalPack]);

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
      setChainId(chain?.id);
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
