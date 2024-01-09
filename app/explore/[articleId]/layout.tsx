import type { Metadata } from "next";
import { getAlloArticle } from "@/lib/fetchData";

// TODO: metadata for explore page, share
export async function generateMetadata({ params }: any) {
  const recipientId: string = params.articleId;
  const article = await getAlloArticle(recipientId);
  const metadata: Metadata = {
    title: article.title,
    description: article.value,
    alternates: {
      canonical: `/explore/${recipientId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.value,
      creator: "@PledgePost",
    },
  };
  return metadata;
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
