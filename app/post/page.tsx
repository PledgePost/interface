"use client";
import RichEditor from "@/components/RichEditor";
import React, { useState } from "react";

export default function Post() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  console.log(value);
  return (
    <div className="flex justify-center">
      <RichEditor
        value={value}
        setValue={setValue}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
}
