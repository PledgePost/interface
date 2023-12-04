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

const RichEditor = dynamic(() => import("@/components/RichEditor"), {
  ssr: false,
});

const Post = () => {
  const [value, setValue] = useState(``);
  const [title, setTitle] = useState("");
  const [obj, setObj] = useState({});
  let timestamp = new Date();
  let unix = timestamp.getTime();
  let UNIXtimestamp = Math.floor(unix / 1000);

  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();
  console.log("chain", chain);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: ABI.contractAddress as any,
    abi: ABI.abi,
    functionName: "postArticle",
  });
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
    const object = { title, value, currentAddress, UNIXtimestamp };
    setObj(object);
  }, [title, value, currentAddress, UNIXtimestamp]);

  return (
    <div className="flex justify-center">
      <RichEditor
        value={value}
        setValue={handleChange}
        title={title}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default Post;
