import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RainbowProviders } from "../providers/rainbowproviders";
import { AccountAbstractionProvider } from "@/providers/AccountAbstractionContext";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WagmiContextProvider } from "@/providers/WagmiContextProvider";

export const metadata: Metadata = {
  title: "PledgePost",
  description: "A Quadratic Funding Media Platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AccountAbstractionProvider>
          <RainbowProviders>
            <ToastContainer newestOnTop />
            <Header />
            {children}
          </RainbowProviders>
        </AccountAbstractionProvider>
      </body>
    </html>
  );
}
