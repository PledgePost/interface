import React from "react";

const ArticlePage = async ({ params }: any) => {
  const res = await fetch(
    "https://bafybeic2p6ymcseqnpnvcibfrakp2qgze5echsj2lcavbyhlr27hdjzrsy.ipfs.dweb.link/pledgepost:0x06aa005386F53Ba7b980c61e0D067CaBc7602a62/efefa7f6-043d-400b-8b71-dbc2b9e86456.json"
  );
  const content = await res.json();
  console.log("content :>> ", content);
  console.log(params);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="flex justify-center text-3xl font-bold mb-5">
        {content.title}
      </h1>
      <div className="flex flex-row gap-4">
        <div
          className="w-3/4 bg-white p-5 rounded shadow"
          dangerouslySetInnerHTML={{ __html: content.value }}
        />

        <div className="w-1/4 bg-white p-5 rounded shadow ">
          Comment Components
        </div>
      </div>
    </div>
  );
};
export default ArticlePage;
