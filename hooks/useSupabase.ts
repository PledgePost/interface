"use client";
import { Draft } from "@/types";
import { supabase } from "@/utils/supabase";

export const getComments = async (author: string, article_id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .match({ article_id: article_id, author: author });
  if (error) {
    throw error;
  }
  return data;
};

export const insertComment = async (
  author: string,
  article_id: number,
  user: string,
  message: string
) => {
  if (!author || !article_id || !user || !message) return;
  await supabase.from("comments").insert({
    author: author,
    article_id: article_id,
    user: user,
    message: message,
  });
};

export const storeDraft = async (props: Draft) => {
  const { data, error } = await supabase.from("drafts").insert({
    author: props.author,
    title: props.title,
    content: props.content,
    image: props.image,
  });
  if (error) {
    throw error;
  }
  return data;
};
export const getDrafts = async (author: string) => {
  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .match({ author: author });
  if (error) {
    throw error;
  }
  return data;
};
