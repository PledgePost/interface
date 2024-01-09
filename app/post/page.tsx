"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { makeFileObjects, storeFiles } from "@/hooks/useweb3Storage";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";
import dynamic from "next/dynamic";
import { CIDString } from "web3.storage";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { Content } from "@/types";
import { ProfileParams, createProfile } from "@/utils/registry";
import { TApplicationMetadata, TNewApplication } from "@/types/alloTypes";
import { AlloABI } from "@/abi/Allo";
import { getProfileById } from "@/utils/request";
import { chainConfig } from "@/utils/allo";
const RichEditor = dynamic(() => import("@/components/RichEditor"), {
  ssr: false,
});
const strategy = {
  address: process.env.NEXT_PUBLIC_STRATEGY_CONTRACT_ADDRESS!,
  poolId: process.env.NEXT_PUBLIC_POOL_ID,
};

const allo = {
  address: process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as `0x${string}`,
  abi: AlloABI,
};

const Post = () => {
  const [value, setValue] = useState(``);
  const [title, setTitle] = useState("");
  const [obj, setObj] = useState({});
  const [coverImage, setCoverImage] = useState<any>();
  const [blob, setBlob] = useState<any>();
  const [base64, setBase64] = useState<any>();

  let timestamp = new Date();
  let unix = timestamp.getTime();
  let UNIXtimestamp = Math.floor(unix / 1000);
  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: allo.address,
    abi: allo.abi,
    functionName: "registerRecipient",
  });
  const handleCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File | null = e.target.files[0];
      const blob = await readAsBlob(file);
      const base64 = await readAsBase64(file);
      console.log("base64", base64);
      console.log("blob", blob);
      setCoverImage(base64);
    }
  };

  const readAsBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64(reader.result as string);
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  };
  const readAsBlob = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        setBlob(reader.result);
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    if (!currentAddress) {
      showErrorToast("Please connect your wallet");
      return;
    }
    try {
      if (!title || !value) return;
      showDefaultToast("Creating Profile for Article...");
      const files = makeFileObjects(obj, currentAddress);
      const cid: CIDString | undefined = await storeFiles(files);
      let profileData: ProfileParams = {
        pointer: cid,
        name: "PledgePost Profile",
        owner: currentAddress,
        members: [currentAddress], //TODO: let user add contributors
      };
      const profileId: string = await createProfile(profileData);
      let applicationMetadata: TApplicationMetadata = {
        name: title,
        description: value,
        base64Image: base64,
      };
      let applicationData: TNewApplication = {
        ...applicationMetadata,
        requestedAmount: BigInt(0),
        recipientAddress: currentAddress,
        profileId: `0x${profileId}`,
      };
      const authorProfile = await getProfileById({
        chainId: chainConfig.chain.toString(),
        profileId: profileId,
      });
      console.log("authorProfile", authorProfile);
      0x06aa005386f53ba7b980c61e0d067cabc7602a62;
      const encodeRegisterData = ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "tuple(uint256, string)"],
        [
          authorProfile?.anchor,
          currentAddress,
          [1, authorProfile.metadataPointer],
        ]
      );
      write({
        args: [strategy.poolId, encodeRegisterData],
        value: BigInt(100000000000000),
      });
      showDefaultToast("Sending Transaction...");
    } catch (e) {
      console.log("Error: ", e);
      showErrorToast("Error Failed to Post");
    }
  };
  useEffect(() => {
    if (isSuccess && data && chain) {
      showSuccessToast(
        `${chain.blockExplorers?.etherscan?.url}/tx/${data.hash}`
      );
    }
  }, [chain, data, isSuccess]);

  useEffect(() => {
    const object: Content = {
      coverImage,
      title,
      value,
      currentAddress,
      UNIXtimestamp,
    };
    setObj(object);
  }, [title, value, currentAddress, UNIXtimestamp, coverImage]);

  return (
    <div className="flex justify-center">
      <RichEditor
        value={value}
        setValue={handleChange}
        title={title}
        image={coverImage}
        setTitle={setTitle}
        handleImage={handleCoverImage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default Post;
