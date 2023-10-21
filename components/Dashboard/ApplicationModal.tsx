"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ethers } from "ethers";
const ABI = require("../../abis/PledgePost.json").abi;
import React, { use, useState } from "react";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";
import { getAllRoundData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";

export default function ApplicationModal({ id }: any) {
  const rounds = use(getAllRoundData());
  const [roundId, setRoundId] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const { smartAccount, web3Provider, signer, handleUserOp } = useSafeAA();
  const handleArticle = () => {
    setSelectedArticle(id);
  };
  const handleRound = (value: any) => {
    setRoundId(value);
  };
  // TODO: figureout why roundId starts at 0
  const handleApply = async () => {
    console.log("params", selectedArticle, roundId);
    if (!selectedArticle || !roundId) return;
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      ABI,
      signer
    );
    try {
      const applyTx = await contract.populateTransaction.applyForRound(
        roundId,
        selectedArticle
      );
      await handleUserOp(applyTx, smartAccount);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => handleArticle()}>Apply</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center">
              Apply for Grant!
            </DialogTitle>
            <DialogDescription className="flex justify-center items-center">
              You can apply for grant to this article!
            </DialogDescription>
          </DialogHeader>
          <div>
            <Select onValueChange={(value) => handleRound(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose Grant" />
              </SelectTrigger>
              <SelectContent>
                {rounds.map((round, index) => (
                  <SelectItem key={index} value={round.id}>
                    {round.name}: {round.startDate} - {round.endDate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => handleApply()}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
