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
  setToken,
  setAmount,
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
      />
      {!isDonated ? (
        <DonationModal
          handleClick={handleClick}
          setToken={setToken}
          setAmount={setAmount}
        />
      ) : (
        <Button onClick={() => handleSend()}>Submit Comment</Button>
      )}
    </div>
  );
}
