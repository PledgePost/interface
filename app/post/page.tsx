"use client";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { makeFileObjects, storeFiles } from "@/hooks/useweb3Storage";
import { showDefaultToast } from "@/hooks/useNotification";
import dynamic from "next/dynamic";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { CIDString } from "web3.storage";

const ABI = require("../../abis/PledgePost.json").abi;
const RichEditor = dynamic(() => import("@/components/RichEditor"), {
  ssr: false,
});
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const Post = () => {
  const [value, setValue] = useState(``);
  const [title, setTitle] = useState("");
  const [obj, setObj] = useState({});
  let timestamp = new Date();
  let unix = timestamp.getTime();
  let UNIXtimestamp = Math.floor(unix / 1000);
  const { currentAddress, smartAccount, signer, handleUserOp } = useSafeAA();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      showDefaultToast("Uploading...");
      if (!currentAddress || !title || !value) return;
      const files = makeFileObjects(obj, currentAddress);
      const cid = await storeFiles(files);
      handleSend(cid);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSend = async (cid: CIDString | undefined) => {
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    console.log("contract: ", contract);
    try {
      const tx = await contract.populateTransaction.postArticle(cid);
      await handleUserOp(tx, smartAccount);
    } catch (e) {
      console.log(e);
    }
  };
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
