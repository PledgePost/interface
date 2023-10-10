"use client";
import React from "react";
import CardLists from "@/components/CardLists";

function Explore() {
  function handleClick() {
    console.log("clicked");
  }
  return (
    <div className="flex flex-wrap gap-[26px] p-12 justify-center">
      {data.map((item, index) => (
        <CardLists key={index} {...item} handleClick={() => handleClick()} />
      ))}
    </div>
  );
}

export default Explore;

// create dammy data json for CardLists
const data = [
  {
    Title: "Article Title",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae natus dolore voluptates quo minima magnam, consectetur est tenetur dolores et error adipisci corporis quas aut aspernatur dolor in asperiores perspiciatis.	",
    ImageUrl: "https://picsum.photos/200/300",
    matchingAmount: "1000",
  },
  {
    Title: "Article Title",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae natus dolore voluptates quo minima magnam, consectetur est tenetur dolores et error adipisci corporis quas aut aspernatur dolor in asperiores perspiciatis.	",
    ImageUrl: "https://picsum.photos/200/300",
    matchingAmount: "1000",
  },
  {
    Title: "Article Title",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae natus dolore voluptates quo minima magnam, consectetur est tenetur dolores et error adipisci corporis quas aut aspernatur dolor in asperiores perspiciatis.	",
    ImageUrl: "https://picsum.photos/200/300",
    matchingAmount: "1000",
  },
  {
    Title: "Article Title",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae natus dolore voluptates quo minima magnam, consectetur est tenetur dolores et error adipisci corporis quas aut aspernatur dolor in asperiores perspiciatis.	",
    ImageUrl: "https://picsum.photos/200/300",
    matchingAmount: "1000",
  },
  {
    Title: "Article Title",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae natus dolore voluptates quo minima magnam, consectetur est tenetur dolores et error adipisci corporis quas aut aspernatur dolor in asperiores perspiciatis.	",
    ImageUrl: "https://picsum.photos/200/300",
    matchingAmount: "1000",
  },
];
