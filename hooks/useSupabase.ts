"use client";
import { supabase } from "@/utils/supabase";

export interface Comment {
  id: number;
  author: string;
  article_id: number;
  user: string;
  message: string;
  created_at: any;
}

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
