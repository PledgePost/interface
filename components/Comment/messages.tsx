"use client";
import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Messages({ params }: any) {
  const ImageUrl = "https://picsum.photos/200/";

  return (
    <div>
      <div className="flex justify-center font-semibold p-2">Comments</div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src={ImageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2">
            <span className="text-sm font-semibold text-gray-700">
              John Doe
            </span>
            <span className="text-xs text-gray-500">@johndoe</span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-xs text-gray-500">2h</span>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptates.
        </span>
      </div>
    </div>
  );
}
