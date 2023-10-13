import React from "react";
import Image from "next/image";
import vercel from "../public/vercel.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const CardLists = ({
  Title,
  Description,
  ImageUrl,
  author,
  matchingAmount,
}: any) => {
  return (
    <div className="sm:w-[400px] w-full rounded-[15px] bg-white cursor-pointer shadow-lg">
      <Image
        src={vercel}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
            {Title || "Title"}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {Description || "Description"}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px]">
              Raised of ${matchingAmount}
            </h4>
          </div>
        </div>
        <div className="flex items-center mt-[10px] gap-[12px]">
          {/* <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center overflow-hidden">
            <Image
              src={vercel}
              alt="user"
              className="object-cover w-full h-full"
            />
          </div> */}
          <Avatar>
            <AvatarImage src={ImageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <p className="flex-1 font-epilogue font-semibold text-[14px] truncate">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-green-600">
              {author}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardLists;
