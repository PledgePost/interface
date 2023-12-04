import type { Metadata } from "next";
import { toChecksumAddress } from "ethereumjs-util";

interface Params {
  articleId: string[];
}
interface Content {
  title: string;
  value: string;
  currentAddress: any;
  UNIXtimestamp: any;
}

export async function generateMetadata({ params }: { params: Params }) {
  const authorAddress = params.articleId[0];
  const articleId = params.articleId[1];
  const cid = params.articleId[2];
  const checksumAddress = toChecksumAddress(authorAddress);
  const content: Content = await fetch(
    `https://ipfs.io/ipfs/${cid}/pledgepost:${checksumAddress}`
  ).then((res) => res.json());
  const metadata: Metadata = {
    title: content.title,
    description: content.value,
    alternates: {
      canonical: `/explore/${authorAddress}/${articleId}/${cid}`,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.value,
      creator: "@PledgePost",
    },
  };
  return metadata;
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
