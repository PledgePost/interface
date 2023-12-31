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
import { ABIs as ABI } from "@/constants";
import { Content } from "@/types";

const RichEditor = dynamic(() => import("@/components/RichEditor"), {
  ssr: false,
});

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
    address: ABI.contractAddress as any,
    abi: ABI.abi,
    functionName: "postArticle",
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
    try {
      showDefaultToast("Uploading...");
      if (!title || !value) return;
      const files = makeFileObjects(obj, currentAddress);
      const cid: CIDString | undefined = await storeFiles(files);
      showDefaultToast("Sending Transaction...");
      write({ args: [cid] });
    } catch (e) {
      console.log(e);
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
