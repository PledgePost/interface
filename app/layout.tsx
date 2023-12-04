import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RainbowProviders } from "../providers/rainbowproviders";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: "PledgePost",
    template: "%s | PledgePost",
  },
  description:
    "PledgePost is protocol built for writers to publish their articles, collect donations, and receive extra funds based on Quadratic Funding, a democratic funding model based on the amount of each donation.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RainbowProviders>
          <ToastContainer newestOnTop />
          <Header />
          {children}
        </RainbowProviders>
      </body>
    </html>
  );
}
