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
import { ABIs as ABI } from "@/constants";
import React, { use, useEffect, useState } from "react";
import { getAllRoundData } from "@/lib/fetchData";
import { Button } from "@/components/ui/button";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";

export default function ApplicationModal({ id, round }: any) {
  const rounds = use(getAllRoundData());
  const [roundId, setRoundId] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const { address: currentAddress } = useAccount();
  const { chain } = useNetwork();
  const handleArticle = () => {
    setSelectedArticle(id);
  };
  const handleRound = (value: any) => {
    setRoundId(value);
  };
  const {
    data,
    isSuccess,
    write: apply,
  } = useContractWrite({
    address: ABI.contractAddress as any,
    abi: ABI.abi,
    functionName: "applyForRound",
  });

  const handleApply = async () => {
    console.log("params", selectedArticle, roundId);
    if (!selectedArticle || !roundId || !currentAddress) return;
    try {
      showDefaultToast("Applying for grant...");
      apply({ args: [selectedArticle, roundId] });
    } catch (e) {
      console.log(e);
      showErrorToast("Error applying for grant");
    }
  };
  useEffect(() => {
    if (!isSuccess || !data) return;
    showSuccessToast(`${chain?.blockExplorers?.etherscan}/tx/${data.hash}`);
  }, [chain, data, isSuccess]);

  return (
    <>
      <Dialog>
        {!round ? (
          <DialogTrigger>
            <Button onClick={() => handleArticle()}>Apply Grant</Button>
          </DialogTrigger>
        ) : (
          <Button disabled>Appied</Button>
        )}
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
