import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import sliceAddress from "@/utils/sliceAddress";
import { dateFromISO } from "@/utils/dateConvert";

export default function Messages({ params }: any) {
  const ImageUrl = "https://picsum.photos/200/";
  const address = sliceAddress(params.user);
  const date = dateFromISO(params.created_at);

  return (
    <div className="mb-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src={ImageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2">
            <span className="text-sm font-semibold text-gray-700">
              {address}
            </span>
            {/* <span className="text-xs text-gray-500">@johndoe</span> */}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-sm text-gray-700">{params.message}</span>
      </div>
    </div>
  );
}
