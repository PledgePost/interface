"use client";
import React, { useState, useEffect } from "react";
import Messages from "@/components/Comment/messages";
import MessageInput from "@/components/Comment/messageInput";
import { useAccount } from "wagmi";
import { readComments, writeComment, Comment } from "@/hooks/useTableland";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "@/hooks/useNotification";

async function getContent() {
  // TODO: add draft article
  //"https://${cid}.ipfs.dweb.link/pledgepost:${address}"
  const data = await fetch(
    // "https://bafybeic2p6ymcseqnpnvcibfrakp2qgze5echsj2lcavbyhlr27hdjzrsy.ipfs.dweb.link/pledgepost:0x06aa005386F53Ba7b980c61e0D067CaBc7602a62/efefa7f6-043d-400b-8b71-dbc2b9e86456.json"
    "https://bafybeibbzyufq5emesamm76hcdtw4oabsg5w52xwkyu2ihnbqyoyjmjrh4.ipfs.dweb.link/pledgepost:0x06aa005386F53Ba7b980c61e0D067CaBc7602a62"
  ).then((res) => res.json());
  return data;
}

export default function ArticlePage({ params }: any) {
  const { openConnectModal } = useConnectModal();
  const [content, setContent] = useState<any>(null);
  const [messages, setMessages] = useState<string>("");
  const { address } = useAccount();
  const [comments, setComments] = useState<Comment[] | undefined>(undefined);

  async function handleSend() {
    if (!address || messages === "") return;
    try {
      showDefaultToast("Sending Transaction...");
      const result = await writeComment({
        author: params.articleId[0],
        article_id: params.articleId[1],
        message: messages,
        user: address,
      });
      console.log("result :>> ", result);
      showSuccessToast("Comment successfully posted");
      setMessages("");
    } catch (e) {
      console.log("error: ", e);
      showErrorToast("Error posting comment");
    }
  }
  useEffect(() => {
    async function fetchContent() {
      const result = await getContent();
      setContent(result);
      return result;
    }
    fetchContent();
  }, []);
  useEffect(() => {
    async function getComments() {
      const result = await readComments(
        params.articleId[0],
        params.articleId[1]
      );
      setComments(result);
      return result;
    }
    getComments();
  }, [comments, params.articleId]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="flex justify-center text-3xl font-bold mb-5">
        {content?.title}
      </h1>
      <div className="flex flex-row gap-4">
        <div
          className="w-3/4 bg-white p-5 rounded shadow"
          dangerouslySetInnerHTML={{ __html: content?.value }}
        />
        <div className="w-1/4 bg-white p-5 rounded shadow gap-4">
          <div className="flex justify-center font-semibold p-2">Comments</div>
          <div>
            {comments?.length === 0 ? (
              <div className="flex justify-center font-semibold p-2">
                No comments yet
              </div>
            ) : (
              <>
                {comments?.map((comment, index) => (
                  <Messages key={index} params={comment} />
                ))}
              </>
            )}
            {!address ? (
              <Button onClick={openConnectModal} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <MessageInput
                messages={messages}
                setMessages={setMessages}
                handleSend={handleSend}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
