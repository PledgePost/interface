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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function DonationModal({
  handleClick,
  amount,
  setAmount,
  loadingTx,
}: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Donate to unlock comment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center">
              Donate to this article!
            </DialogTitle>
            <DialogDescription className="flex justify-center items-center">
              You can donate to this article to unlock the comment section!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => handleChange(e)}
            />

            <Select /*onValueChange={(value) => handleToken(value)}*/>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                {/* {TokenConfig.map((token, index) => ( */}
                <SelectItem value={"ETH"} /*key={index} value={token.address}*/>
                  {/* {token.symbol} */}
                  ETH
                </SelectItem>
                {/* ))} */}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            {!loadingTx ? (
              <Button onClick={() => handleClick()}>Confirm</Button>
            ) : (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
