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
import { Button } from "../ui/button";

import React, { useEffect } from "react";
import { TokenConfig, TokenType } from "@/lib/Token/token";
import { useWagmiContextProvider } from "@/hooks/WagmiContextProvider";

export default function ApplicationModal({
  handleClick,
  setAmount,
  setToken,
  id,
}: any) {
  const {
    applyForRound,
    roundId,
    setRoundId,
    articleId,
    setArticleId,
    author,
  } = useWagmiContextProvider();
  useEffect(() => {
    console.log("id :>> ", id);
    setArticleId(id);
  }, [id, setArticleId]);

  const handleChange = () => {
    setArticleId(id);
    console.log("id :>> ", id);
    // setAmount(e.target.value);
  };

  const handleApply = () => {
    if (id !== articleId) return alert("Please select article");
    if (!roundId) return alert("Please select round");

    applyForRound();
  };
  const handleRound = (selectedRoundId: string) => {
    const selectedRound = roundConfig.find(
      (round) => round.roundId === parseInt(selectedRoundId)
    );
    if (!selectedRound) return;
    console.log("selectedRound :>> ", selectedRound);
    setRoundId(selectedRound.roundId); // assuming setRoundId is a function that sets the state
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => handleChange()}>Apply</Button>
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
                {roundConfig.map((round, index) => (
                  <SelectItem key={index} value={String(round.roundId)}>
                    {round.roundName}
                    {round.startTime} - {round.endTime}
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

const roundConfig = [
  {
    roundId: 1,
    roundName: "Round 1",
    startTime: 1699509663,
    endTime: 1702101663,
  },
  {
    roundId: 2,
    roundName: "Round 2",
    startTime: 1699509663,
    endTime: 1702101663,
  },
];
