import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DonationModal from "@/components/Comment/donationModal";
export default function MessageInput({
  messages,
  setMessages,
  handleSend,
  isDonated,
  handleClick,
  isApproved,
  setAmount,
  loadingTx,
}: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessages(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Write a comment..."
        value={messages}
        onChange={(e) => handleChange(e)}
        disabled={!isDonated}
      />
      {!isDonated ? (
        <DonationModal
          handleClick={handleClick}
          setAmount={setAmount}
          loadingTx={loadingTx}
          isApproved={isApproved}
        />
      ) : (
        <Button onClick={() => handleSend()}>Submit Comment</Button>
      )}
    </div>
  );
}
