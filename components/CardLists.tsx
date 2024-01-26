import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sliceAddress from "@/utils/sliceAddress";
import { Badge } from "@/components/ui/badge";

const CardLists = ({
  Title,
  Description,
  ImageUrl,
  author,
  ens,
  avatar,
  donation,
  round,
}: any) => {
  let addr = ens ? ens : sliceAddress(author);
  let amount = donation.toFixed(2);
  return (
    <div className="w-[400px] rounded-[15px] bg-white cursor-pointer shadow-lg">
      <AspectRatio ratio={18 / 9} className="bg-muted">
        <Image
          src={ImageUrl || "https://picsum.photos/500/300"}
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
      {!round ||
        (round !== "0" && (
          <div className="px-4 mt-2">
            <Badge className="rounded-sm" variant="secondary">
              Round: {round}
            </Badge>
          </div>
        ))}

      <div className="flex flex-col px-4 py-2">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">
            {Title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {Description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px]">
              Received Donation ${amount}
            </h4>
          </div>
        </div>
        <div className="flex items-center mt-[10px] gap-[12px]">
          <Avatar>
            <AvatarImage src={avatar || "https://picsum.photos/500/300"} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <p className="flex-1 font-epilogue font-semibold text-[14px] truncate">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-green-600">
              {addr}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardLists;
