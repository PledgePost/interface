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
import {
  IPaymaster,
  BiconomyPaymaster,
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from "@biconomy/paymaster";
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "../hooks/useNotification";
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
  const [loadingTx, setLoadingTx] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);

  // chainId should be selected by the user

  const [chainId, setChainId] = useState<any>("0x13881");
  // initial chain: op-goerli
  const chain = getChain(chainId);

  // safes owned by the user
  const [safes, setSafes] = useState<string[]>([]);
  const [signer, setSigner] = useState<any>(undefined);
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();
  useEffect(() => {
    const init = async () => {
      if (!chain || !chain.id || !chain.hex) return;
      try {
        const web3AuthOptions: Web3AuthOptions = {
          clientId: clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain.hex,
            rpcTarget: chain.rpcUrl,
          },
          // uiConfig: {
          //   theme: "dark" as any,
          //   loginMethodsOrder: ["google", "facebook"],
          // },
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
      if (currentAddress) logoutWeb3Auth();
      setLoading(true);
      const { eoa } = await web3AuthModalPack.signIn();
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
      const biconomyModule = await ECDSAOwnershipValidationModule.create({
        signer: provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });

      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: chain.id,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: biconomyModule,
        activeValidationModule: biconomyModule,
      });

      setCurrentAddress(await biconomySmartAccount.getAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setChainId(chain?.hex);
      setAddress(eoa);
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

  const handleUserOp = async (
    tx: ethers.PopulatedTransaction,
    account: BiconomySmartAccountV2
  ) => {
    if (!account || !tx) return;
    try {
      showDefaultToast("Creating transaction...");
      setLoadingTx(true);
      console.log("Populated tx: ", tx);
      const tx1 = {
        to: tx?.to as string,
        // to: "pledgeContractAddr",
        data: tx.data,
      };
      console.log("here before userop");
      let userOp = await account.buildUserOp([tx1]);
      console.log("useOp", userOp);
      const biconomyPaymaster =
        account.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: "BICONOMY",
          version: "2.0.0",
        },
      };
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData
        );
      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      const userOpResponse = await account.sendUserOp(userOp);
      const { receipt } = await userOpResponse.wait(1);
      console.log(`${chain?.blockExplorerUrl}/tx/${receipt?.transactionHash}`);
      showSuccessToast(
        `${chain?.blockExplorerUrl}/tx/${receipt?.transactionHash}`
      );
      setLoadingTx(false);
      return receipt;
    } catch (error) {
      console.error(error);
      showErrorToast('Error: "Transaction failed"');
    }
  };
  return (
    <AccountAbstractionContext.Provider
      value={{
        chain,
        address,
        currentAddress,
        smartAccount,
        sliceAddress,
        web3Provider,
        signer,
        chainId,
        loading,
        loadingTx,
        setChainId,
        loginWeb3Auth,
        logoutWeb3Auth,
        handleUserOp,
      }}
    >
      {children}
    </AccountAbstractionContext.Provider>
  );
};

export const useSafeAA = () => useContext(AccountAbstractionContext);
